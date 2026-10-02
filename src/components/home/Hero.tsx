"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

type HeroProps = {
  portraitSrc: string | null;
};

function IdentityBlock({ animated }: { animated: boolean }) {
  const items = [
    <p
      key="kicker"
      className="font-mono text-xs tracking-[0.18em] text-muted uppercase"
    >
      iOS Developer at Contus Tech · Bengaluru, India
    </p>,
    <h1
      key="name"
      className="mt-6 font-display text-6xl text-ink md:text-7xl lg:text-8xl"
    >
      Leela Shankar
      <br />
      Gurram
    </h1>,
    <p
      key="claim"
      className="mt-8 max-w-[26ch] font-display text-2xl text-ink md:text-3xl"
    >
      I own the part of the product that has to{" "}
      <em className="text-accent">make money</em>.
    </p>,
    <p
      key="support"
      className="mt-6 max-w-[42rem] font-sans text-sm text-muted md:text-base"
    >
      Six streaming apps, five regions, four ways of charging for them —
      subscriptions, ads, rewarded ads and coins. I&apos;m moving from building
      features to deciding which ones get built.
    </p>,
    <p key="links" className="mt-10 font-sans text-sm">
      <a href="mailto:leelashankargurram@gmail.com">
        leelashankargurram@gmail.com
      </a>
      <span className="text-muted"> · </span>
      <a
        href="https://linkedin.com/in/leela-shankar-gurram"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <span className="text-muted"> · </span>
      <a href="/resume">Resume</a>
    </p>,
  ];

  if (!animated) {
    return <div>{items}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09 } },
      }}
    >
      {items.map((item) => (
        <motion.div
          key={item.key}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease },
            },
          }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}

function Portrait({ src, animated }: { src: string; animated: boolean }) {
  const frame = (
    <figure className="m-0 w-full max-w-[16rem] justify-self-start md:max-w-[20rem] md:justify-self-end lg:max-w-[22rem]">
      {/* Dark frame with a gold hairline — the only ornament the portrait gets. */}
      <div className="border border-rule-gold bg-surface p-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-rule">
          <Image
            src={src}
            alt="Portrait of Leela Shankar Gurram"
            fill
            sizes="(max-width: 1024px) 20rem, 22rem"
            priority
            className="object-cover"
          />
        </div>
      </div>
      <figcaption className="mt-4 border-t border-rule pt-3">
        <span className="block font-mono text-xs tracking-wide text-accent uppercase">
          Currently
        </span>
        <span className="mt-1 block font-mono text-xs text-ink">
          iOS Developer · Contus Tech
        </span>
        <span className="block font-mono text-xs text-ink">
          Bengaluru, India
        </span>
        <span className="block font-mono text-xs text-muted">
          Google Project Management Certificate · in progress
        </span>
      </figcaption>
    </figure>
  );

  if (!animated) return frame;

  return (
    <motion.div
      className="justify-self-start md:justify-self-end"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.35 }}
    >
      {frame}
    </motion.div>
  );
}

export function Hero({ portraitSrc }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animated = !prefersReducedMotion;

  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-visible px-6 pt-16 pb-16 text-left md:px-10 md:pt-24 md:pb-24 lg:px-12">
      {/* Single ambient glow behind the name — the page's one gradient. */}
      <div
        aria-hidden
        className="glow-gold -top-32 -left-24 h-[30rem] w-[30rem] md:h-[40rem] md:w-[40rem]"
      />
      {portraitSrc ? (
        <div className="relative grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14">
          <IdentityBlock animated={animated} />
          <Portrait src={portraitSrc} animated={animated} />
        </div>
      ) : (
        <div className="relative">
          <IdentityBlock animated={animated} />
        </div>
      )}
    </section>
  );
}
