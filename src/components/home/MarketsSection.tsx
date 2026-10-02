"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GlobeFallback } from "@/components/globe/GlobeFallback";
import { SectionLabel } from "@/components/home/SectionLabel";
import { shippedApps } from "@/data/apps";
import { globePins } from "@/data/globe-pins";
import { useGlobeGate } from "@/hooks/useGlobeGate";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const GlobeCanvas = dynamic(() => import("@/components/globe/GlobeCanvas"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

/** app href → globe pin id, so ledger rows and pins highlight each other. */
const PIN_BY_HREF = new Map<string, string>(
  globePins.flatMap((pin) => pin.apps.map((app) => [app.href, pin.id])),
);

/**
 * The one scroll-driven sequence on the site (per the motion rules):
 * each row's monetization column flickers through the four models the apps
 * actually use, then settles. Scroll-linked (scrub), deterministic.
 */
const MODELS = ["Subscriptions", "Ads", "Rewarded Ads", "Coins"];

export function MarketsSection() {
  const gate = useGlobeGate();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const visibleRef = useRef(false);
  const lastInteraction = useRef(0);
  const tourIndex = useRef(-1);

  /** User-driven highlight: stamps the time so the idle tour backs off. */
  const interact = (id: string | null) => {
    lastInteraction.current = Date.now();
    setActiveId(id);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Idle tour: while the section is visible and nobody has interacted for a
  // while, walk the highlight through the rows/pins so the row↔pin link is
  // visible without requiring a hover.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      if (!visibleRef.current) return;
      if (Date.now() - lastInteraction.current < 5000) return;
      tourIndex.current = (tourIndex.current + 1) % globePins.length;
      setActiveId(globePins[tourIndex.current]!.id);
    }, 2600);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    const rows = rowsRef.current;
    if (!section || !rows) return;

    let killed = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (killed || !rowsRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const cells = Array.from(
          rows.querySelectorAll<HTMLElement>("[data-monetization]"),
        );
        const finals = cells.map(
          (cell) => cell.dataset.monetization ?? cell.textContent ?? "",
        );

        const render = (progress: number) => {
          cells.forEach((cell, i) => {
            const settleAt = 0.45 + i * 0.09;
            if (progress >= settleAt) {
              if (cell.textContent !== finals[i]) {
                cell.textContent = finals[i];
                cell.classList.remove("text-muted");
                cell.classList.add("text-ink");
              }
              return;
            }
            const tick = Math.floor(progress * 30 + i);
            cell.textContent = MODELS[tick % MODELS.length];
            cell.classList.remove("text-ink");
            cell.classList.add("text-muted");
          });
        };

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          end: "top 25%",
          scrub: true,
          onUpdate: (self) => render(self.progress),
        });
        render(trigger.progress);

        cleanup = () => {
          trigger.kill();
          render(1);
        };
      },
    );

    return () => {
      killed = true;
      cleanup?.();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="ledger"
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-6 py-12 text-left md:px-10 lg:px-12"
      aria-label="Markets where the six apps shipped"
    >
      <SectionLabel
        title="Markets"
        note="Six apps live on the App Store — same product category, different market, different revenue model. Hover a row or a pin."
      />

      <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          {gate === "3d" && inView ? (
            <GlobeCanvas activeId={activeId} onActiveIdChange={interact} />
          ) : (
            <GlobeFallback />
          )}
        </div>

        <div ref={rowsRef} role="list" aria-label="Shipped apps">
          {shippedApps.map((app, index) => {
            const pinId = PIN_BY_HREF.get(app.href) ?? null;
            const highlighted = pinId !== null && pinId === activeId;

            return (
              <a
                key={app.href}
                href={app.href}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                onMouseEnter={() => interact(pinId)}
                onMouseLeave={() => interact(null)}
                className={`group flex items-center gap-4 border px-4 py-4 no-underline transition-colors duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-rule-gold hover:bg-surface-2 ${
                  index > 0 ? "mt-2" : ""
                } ${
                  highlighted
                    ? "border-rule-gold bg-surface-2"
                    : "border-rule bg-surface"
                }`}
              >
                <Image
                  src={app.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-[22%] border border-rule object-cover"
                />
                <span className="grid min-w-0 flex-1 grid-cols-1 items-baseline gap-1 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1.5fr)_minmax(0,0.7fr)] sm:gap-4">
                  <span className="min-w-0">
                    <span
                      className={`block truncate font-mono text-sm transition-colors duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:text-accent ${
                        highlighted ? "text-accent" : "text-ink"
                      }`}
                    >
                      {app.name}
                    </span>
                    <span className="block truncate font-mono text-xs text-muted">
                      {app.category}
                    </span>
                  </span>
                  <span className="font-mono text-sm text-muted">
                    {app.region}
                  </span>
                  <span
                    className="font-mono text-sm text-ink"
                    data-monetization={app.monetization}
                  >
                    {app.monetization}
                  </span>
                  <span className="font-mono text-sm text-muted">
                    {app.platform}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
