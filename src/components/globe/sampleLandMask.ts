import {
  latLngToEquirectUv,
  latLngToVector3,
  vector3ToLatLng,
} from "@/lib/geo";

const LAND_MASK_URL = "/globe/land-mask.png";

/** Land is dark (0) on the mask; ocean is light (255). */
const LAND_THRESHOLD = 128;
/**
 * Fibonacci candidate count. ~30% land → ~8–9k kept dots with uniform surface density.
 * Cap kept instances so the InstancedMesh args stay honest.
 */
const FIBONACCI_SAMPLES = 36000;
const MAX_LAND_DOTS = 14000;
const GLOBE_RADIUS = 1;

/** Golden angle (radians) for fibonacci sphere spiral. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

let cached: Float32Array | null = null;
let inflight: Promise<Float32Array> | null = null;

function sampleLuminance(
  data: Uint8ClampedArray,
  width: number,
  px: number,
  py: number,
): number {
  return data[(py * width + px) * 4]!;
}

/**
 * Uniform surface candidates via fibonacci sphere, then keep only land
 * by xyz → lat/lng → equirectangular UV → mask sample.
 */
function sampleFibonacciLand(imageData: ImageData): Float32Array {
  const { width, height, data } = imageData;
  const positions: number[] = [];
  let landHits = 0;
  let oceanHits = 0;

  for (let i = 0; i < FIBONACCI_SAMPLES; i++) {
    // Standard fibonacci unit sphere (Y-up)
    const y = 1 - (i / (FIBONACCI_SAMPLES - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    const { lat, lng } = vector3ToLatLng(x, y, z);
    const { px, py } = latLngToEquirectUv(lat, lng, width, height);
    const luminance = sampleLuminance(data, width, px, py);

    if (luminance >= LAND_THRESHOLD) {
      oceanHits++;
      continue;
    }

    landHits++;
    // Re-project through our geographic convention so dots match pin math.
    const [px3, py3, pz3] = latLngToVector3(lat, lng, GLOBE_RADIUS);
    positions.push(px3, py3, pz3);

    if (positions.length / 3 >= MAX_LAND_DOTS) break;
  }

  if (process.env.NODE_ENV === "development") {
    console.info(
      `[globe] land-mask ${width}×${height}, fibonacci ${FIBONACCI_SAMPLES}, land ${landHits}, ocean ${oceanHits}, kept ${positions.length / 3}`,
    );
  }

  if (typeof window !== "undefined") {
    (
      window as Window & {
        __globeMask?: {
          width: number;
          height: number;
          landHits: number;
          oceanHits: number;
          kept: number;
        };
      }
    ).__globeMask = {
      width,
      height,
      landHits,
      oceanHits,
      kept: positions.length / 3,
    };
  }

  if (landHits === 0) {
    throw new Error(
      `[globe] land-mask sampled zero land pixels (${width}×${height}) — refusing placeholder/noise`,
    );
  }

  return new Float32Array(positions);
}

/**
 * Load the equirectangular land-mask and return packed xyz positions
 * for a single InstancedMesh (x,y,z,x,y,z,…).
 */
export async function loadLandPositions(): Promise<Float32Array> {
  if (cached) return cached;
  if (inflight) return inflight;

  inflight = (async () => {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.decoding = "async";
      el.onload = () => resolve(el);
      el.onerror = () =>
        reject(new Error(`Failed to load land-mask at ${LAND_MASK_URL}`));
      el.src = LAND_MASK_URL;
    });

    const width = img.naturalWidth;
    const height = img.naturalHeight;

    if (width < 64 || height < 32) {
      throw new Error(
        `[globe] land-mask dimensions look wrong: ${width}×${height}`,
      );
    }

    if (process.env.NODE_ENV === "development") {
      console.info(
        `[globe] loaded land-mask ${LAND_MASK_URL} → ${width}×${height}`,
      );
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("2D canvas unavailable for land-mask sampling");
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, width, height);
    cached = sampleFibonacciLand(imageData);
    return cached;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

export const GLOBE_RADIUS_UNITS = GLOBE_RADIUS;
