"use client";

import { useEffect, useRef } from "react";
import { shippedApps } from "@/data/apps";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The one scroll-driven sequence on the site (per the motion rules):
 * as the ledger scrolls in, each row's monetization column flickers through
 * the four models the apps actually use, then settles on the correct value.
 * Scroll-linked (scrub), deterministic — settles correctly on fast scroll.
 */
const MODELS = ["Subscriptions", "Ads", "Rewarded Ads", "Coins"];

export function AppsLedger() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    let killed = false;
    let cleanup: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (killed || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const cells = Array.from(
          sectionRef.current.querySelectorAll<HTMLElement>(
            "[data-monetization]",
          ),
        );
        const finals = cells.map(
          (cell) => cell.dataset.monetization ?? cell.textContent ?? "",
        );

        const render = (progress: number) => {
          cells.forEach((cell, i) => {
            // Rows settle one after another as the section scrolls through.
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
          end: "top 35%",
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
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-6 py-16 text-left md:px-10 md:py-20 lg:px-12"
    >
      <p className="mb-2 font-mono text-xs tracking-wide text-muted uppercase">
        Shipped and earning
      </p>
      <p className="mb-8 max-w-[42rem] font-sans text-sm text-muted">
        Every row is live on the App Store — same product category, different
        market, different revenue model.
      </p>

      <div className="w-full max-w-4xl" role="list" aria-label="Shipped apps">
        {shippedApps.map((app, index) => (
          <a
            key={app.href}
            href={app.href}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            className={`group grid grid-cols-1 items-baseline gap-1 py-5 no-underline sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,0.8fr)] sm:gap-4 ${
              index < shippedApps.length - 1 ? "border-b border-rule" : ""
            }`}
          >
            <span
              className="font-mono text-sm text-ink transition-colors duration-200 group-hover:text-accent"
              style={{
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {app.name}
            </span>
            <span className="font-mono text-sm text-muted">{app.region}</span>
            <span
              className="font-mono text-sm text-ink"
              data-monetization={app.monetization}
            >
              {app.monetization}
            </span>
            <span className="font-mono text-sm text-muted">
              {app.platform}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
