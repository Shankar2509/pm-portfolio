"use client";

import { motion } from "motion/react";
import { shippedApps } from "@/data/apps";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

function LedgerRows({
  animated,
}: {
  animated: boolean;
}) {
  if (!animated) {
    return (
      <div className="mt-14 w-full max-w-4xl" role="list" aria-label="Shipped apps">
        {shippedApps.map((app, index) => (
          <LedgerRow key={app.href} app={app} index={index} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="mt-14 w-full max-w-4xl"
      role="list"
      aria-label="Shipped apps"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.04, delayChildren: 0.55 },
        },
      }}
    >
      {shippedApps.map((app, index) => (
        <motion.div
          key={app.href}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.35, ease },
            },
          }}
        >
          <LedgerRow app={app} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function LedgerRow({
  app,
  index,
}: {
  app: (typeof shippedApps)[number];
  index: number;
}) {
  return (
    <a
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
      <span className="font-mono text-sm text-muted">{app.monetization}</span>
      <span className="font-mono text-sm text-muted">{app.platform}</span>
    </a>
  );
}

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 text-left md:px-10 md:pt-24 lg:px-12">
      {prefersReducedMotion ? (
        <h1 className="max-w-[18ch] font-display text-5xl text-ink md:text-6xl md:leading-[1.1]">
          I own the part of the product that has to make money.
        </h1>
      ) : (
        <motion.h1
          className="max-w-[18ch] font-display text-5xl text-ink md:text-6xl md:leading-[1.1]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          I own the part of the product that has to make money.
        </motion.h1>
      )}

      <p className="mt-6 max-w-[42rem] font-sans text-sm text-muted md:text-base">
        Six streaming apps, five regions, four ways of charging for them. I&apos;m
        moving from building features to deciding which ones get built.
      </p>

      <LedgerRows animated={!prefersReducedMotion} />
    </section>
  );
}
