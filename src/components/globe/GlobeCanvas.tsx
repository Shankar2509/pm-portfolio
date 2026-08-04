"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BackSide,
  BufferGeometry,
  CubicBezierCurve3,
  InstancedMesh,
  Line as ThreeLine,
  LineDashedMaterial,
  MathUtils,
  Object3D,
  Vector3,
  type Group,
  type Mesh,
} from "three";
import { globePins, type GlobePin } from "@/data/globe-pins";
import { latLngToVector3 } from "@/lib/geo";
import {
  GLOBE_RADIUS_UNITS,
  loadLandPositions,
} from "@/components/globe/sampleLandMask";

const PAPER = "#FAF9F6";
const MUTED = "#6B6560";
const RULE = "#E3DFD8";
const INK = "#14110F";
const ACCENT = "#C2410C";
const ROTATION_SPEED = 0.045;
/** Radians of yaw per pixel of horizontal drag. */
const DRAG_SENSITIVITY = 0.005;
/** Start facing India — the arcs' origin — instead of the Atlantic. */
const INITIAL_YAW = Math.PI - 1.55;
const INITIAL_PITCH = 0.12;

/** Bengaluru — where the apps are built. Arc origin and home marker. */
const HOME = { lat: 12.97, lng: 77.59 };

const ARC_POINTS = 72;
const PIN_INTRO_DELAY = 0.35;
const PIN_INTRO_STAGGER = 0.12;
const ARC_INTRO_DELAY = 0.8;
const ARC_INTRO_STAGGER = 0.16;
const ARC_DRAW_SECONDS = 0.9;

const scratch = new Object3D();

function LandDots() {
  const meshRef = useRef<InstancedMesh>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    loadLandPositions().then((positions) => {
      if (cancelled) return;
      const mesh = meshRef.current;
      const instanceCount = positions.length / 3;
      if (!mesh || instanceCount === 0) return;

      for (let i = 0; i < instanceCount; i++) {
        const i3 = i * 3;
        scratch.position.set(
          positions[i3]!,
          positions[i3 + 1]!,
          positions[i3 + 2]!,
        );
        scratch.updateMatrix();
        mesh.setMatrixAt(i, scratch.matrix);
      }
      mesh.count = instanceCount;
      mesh.instanceMatrix.needsUpdate = true;
      setCount(instanceCount);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, 14000]}
      frustumCulled={false}
      visible={count > 0}
    >
      <sphereGeometry args={[0.0065, 5, 5]} />
      <meshBasicMaterial color={MUTED} toneMapped={false} />
    </instancedMesh>
  );
}

/**
 * Solid paper body so far-side dots are occluded and the globe reads as an
 * object, plus a hairline-toned rim behind it for depth. Palette only.
 */
function GlobeBody() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS_UNITS * 0.992, 48, 48]} />
        <meshBasicMaterial color={PAPER} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS_UNITS * 1.045, 48, 48]} />
        <meshBasicMaterial
          color={RULE}
          side={BackSide}
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function HomeMarker() {
  const position = useMemo(
    () => latLngToVector3(HOME.lat, HOME.lng, GLOBE_RADIUS_UNITS * 1.015),
    [],
  );

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.02, 10, 10]} />
      <meshBasicMaterial color={INK} toneMapped={false} />
    </mesh>
  );
}

type Arc = {
  line: ThreeLine;
  material: LineDashedMaterial;
  geometry: BufferGeometry;
  /** Pristine copy of lineDistance values; offsetting them animates the dash flow. */
  baseDistances: Float32Array;
  delay: number;
};

/**
 * One arc per market, Bengaluru → pin. Each draws in (drawRange) on a
 * stagger, then a slow dash-offset drift keeps the routes visibly "live".
 */
function Arcs() {
  const arcs = useMemo<Arc[]>(() => {
    const start = new Vector3(
      ...latLngToVector3(HOME.lat, HOME.lng, GLOBE_RADIUS_UNITS * 1.005),
    );

    return globePins.map((pin, index) => {
      const end = new Vector3(
        ...latLngToVector3(pin.lat, pin.lng, GLOBE_RADIUS_UNITS * 1.01),
      );
      const angle = start.angleTo(end);
      const lift = 1 + 0.16 + 0.3 * (angle / Math.PI);
      const c1 = start
        .clone()
        .multiplyScalar(2)
        .add(end)
        .normalize()
        .multiplyScalar(GLOBE_RADIUS_UNITS * lift);
      const c2 = start
        .clone()
        .add(end.clone().multiplyScalar(2))
        .normalize()
        .multiplyScalar(GLOBE_RADIUS_UNITS * lift);

      const curve = new CubicBezierCurve3(start, c1, c2, end);
      const geometry = new BufferGeometry().setFromPoints(
        curve.getPoints(ARC_POINTS),
      );
      const material = new LineDashedMaterial({
        color: ACCENT,
        dashSize: 0.045,
        gapSize: 0.028,
        transparent: true,
        opacity: 0.55,
        toneMapped: false,
      });
      const line = new ThreeLine(geometry, material);
      line.computeLineDistances();
      geometry.setDrawRange(0, 0);

      const distances = geometry.getAttribute("lineDistance");
      const baseDistances = new Float32Array(
        distances.array as Float32Array,
      );

      return {
        line,
        material,
        geometry,
        baseDistances,
        delay: ARC_INTRO_DELAY + index * ARC_INTRO_STAGGER,
      };
    });
  }, []);

  useEffect(() => {
    return () => {
      arcs.forEach((arc) => {
        arc.geometry.dispose();
        arc.material.dispose();
      });
    };
  }, [arcs]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    arcs.forEach((arc) => {
      const appear = MathUtils.clamp(
        (t - arc.delay) / ARC_DRAW_SECONDS,
        0,
        1,
      );
      arc.geometry.setDrawRange(0, Math.floor(appear * (ARC_POINTS + 1)));
      if (appear === 1) {
        // Shift lineDistance values to make the dash pattern drift along the arc.
        const attribute = arc.geometry.getAttribute("lineDistance");
        const values = attribute.array as Float32Array;
        const offset = (t * 0.045) % 1;
        for (let i = 0; i < values.length; i++) {
          values[i] = arc.baseDistances[i]! + offset;
        }
        attribute.needsUpdate = true;
      }
    });
  });

  return (
    <>
      {arcs.map((arc, index) => (
        <primitive key={index} object={arc.line} />
      ))}
    </>
  );
}

function PinMarker({
  pin,
  index,
  active,
  onHover,
}: {
  pin: GlobePin;
  index: number;
  active: boolean;
  onHover: (pin: GlobePin | null, clientX: number, clientY: number) => void;
}) {
  const ref = useRef<Mesh>(null);
  const position = useMemo(
    () => latLngToVector3(pin.lat, pin.lng, GLOBE_RADIUS_UNITS * 1.02),
    [pin.lat, pin.lng],
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const delay = PIN_INTRO_DELAY + index * PIN_INTRO_STAGGER;
    const appear = MathUtils.clamp(
      (clock.getElapsedTime() - delay) / 0.45,
      0,
      1,
    );
    // easeOutBack-ish overshoot so pins "land" rather than fade.
    const eased = 1 + 1.6 * Math.pow(appear - 1, 3) + 0.6 * Math.pow(appear - 1, 2);
    const target = (appear >= 1 ? 1 : Math.max(0, eased)) * (active ? 1.35 : 1);
    const s = MathUtils.lerp(ref.current.scale.x, target, 0.2);
    ref.current.scale.setScalar(Math.max(0.0001, s));
  });

  return (
    <mesh
      ref={ref}
      position={position}
      scale={0.0001}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(pin, event.clientX, event.clientY);
      }}
      onPointerMove={(event) => {
        event.stopPropagation();
        onHover(pin, event.clientX, event.clientY);
      }}
    >
      <sphereGeometry args={[0.028, 12, 12]} />
      <meshBasicMaterial color={ACCENT} toneMapped={false} />
    </mesh>
  );
}

type SpinState = {
  /** Auto-spin paused while pointer is over the globe. */
  hovered: boolean;
  dragging: boolean;
  yaw: number;
};

function GlobeGroup({
  spinRef,
  onPinHover,
  activeId,
}: {
  spinRef: MutableRefObject<SpinState>;
  onPinHover: (pin: GlobePin | null, clientX: number, clientY: number) => void;
  activeId: string | null;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const spin = spinRef.current;
    if (!spin.hovered && !spin.dragging) {
      spin.yaw += delta * ROTATION_SPEED;
    }
    group.rotation.x = INITIAL_PITCH;
    group.rotation.y = spin.yaw;
  });

  return (
    <group ref={groupRef} rotation={[INITIAL_PITCH, INITIAL_YAW, 0]}>
      <GlobeBody />
      <LandDots />
      <HomeMarker />
      <Arcs />
      {globePins.map((pin, index) => (
        <PinMarker
          key={pin.id}
          pin={pin}
          index={index}
          active={activeId === pin.id}
          onHover={onPinHover}
        />
      ))}
    </group>
  );
}

function PinCard({
  pin,
  x,
  y,
}: {
  pin: GlobePin;
  x: number;
  y: number;
}) {
  const style: CSSProperties = {
    left: Math.min(
      x + 16,
      typeof window !== "undefined" ? window.innerWidth - 280 : x,
    ),
    top: Math.min(
      y + 16,
      typeof window !== "undefined" ? window.innerHeight - 200 : y,
    ),
  };

  return (
    <div
      className="pointer-events-auto absolute z-10 w-[16rem] border border-rule bg-paper p-3 shadow-none"
      style={style}
      role="dialog"
      aria-label={`${pin.region} apps`}
    >
      <p className="font-mono text-xs tracking-wide text-muted uppercase">
        {pin.region}
      </p>
      <ul className="mt-2 m-0 list-none p-0">
        {pin.apps.map((app) => (
          <li key={app.href} className="border-t border-rule first:border-t-0">
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 no-underline"
            >
              <span className="block font-mono text-sm text-ink hover:text-accent">
                {app.name}
              </span>
              <span className="mt-0.5 block font-mono text-xs text-muted">
                {app.monetization}
              </span>
              <span className="block font-mono text-xs text-muted">
                {app.platform}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Client-only R3F scene. Dynamically imported — keep drei out of this module
 * so the chunk stays under the 250KB gzip budget.
 */
export default function GlobeCanvas() {
  const [active, setActive] = useState<GlobePin | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const lastDragX = useRef(0);
  const spinRef = useRef<SpinState>({
    hovered: false,
    dragging: false,
    yaw: INITIAL_YAW,
  });

  const onPinHover = (
    pin: GlobePin | null,
    clientX: number,
    clientY: number,
  ) => {
    if (spinRef.current.dragging) return;
    const bounds = wrapRef.current?.getBoundingClientRect();
    setActive(pin);
    if (bounds) {
      setPointer({ x: clientX - bounds.left, y: clientY - bounds.top });
    }
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!spinRef.current.dragging) return;
    spinRef.current.dragging = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  return (
    <div className="mx-auto w-full max-w-[min(36rem,92vw)]">
      <div
        ref={wrapRef}
        className="relative aspect-square w-full cursor-grab [touch-action:pan-y] active:cursor-grabbing"
        onPointerEnter={() => {
          spinRef.current.hovered = true;
        }}
        onPointerLeave={(event) => {
          spinRef.current.hovered = false;
          endDrag(event);
          setActive(null);
        }}
        onPointerDown={(event) => {
          if (event.button !== 0 && event.pointerType === "mouse") return;
          spinRef.current.dragging = true;
          spinRef.current.hovered = true;
          lastDragX.current = event.clientX;
          setActive(null);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!spinRef.current.dragging) return;
          const dx = event.clientX - lastDragX.current;
          lastDragX.current = event.clientX;
          // Drag right → globe turns left (natural “grab the surface” feel).
          spinRef.current.yaw += dx * DRAG_SENSITIVITY;
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 30, near: 0.1, far: 40 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
          onPointerMissed={() => setActive(null)}
        >
          <GlobeGroup
            spinRef={spinRef}
            onPinHover={onPinHover}
            activeId={active?.id ?? null}
          />
        </Canvas>

        {active ? <PinCard pin={active} x={pointer.x} y={pointer.y} /> : null}
      </div>

      <p className="mt-4 font-mono text-xs text-muted">
        Built from Bengaluru · earning in five regions — hover a pin · drag to
        turn
      </p>
    </div>
  );
}
