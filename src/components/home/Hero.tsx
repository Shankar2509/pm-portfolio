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
      className="font-mono text-xs tracking-wide text-muted uppercase"
    >
      iOS Developer at Contus Tech · Bengaluru, India
    </p>,
    <h1
      key="name"
      className="mt-4 font-display text-5xl text-ink md:text-6xl lg:text-7xl md:leading-[1.05]"
    >
      Leela Shankar Gurram
    </h1>,
    <p
      key="claim"
      className="mt-6 max-w-[24ch] font-display text-xl text-ink italic md:text-2xl"
    >
      I own the part of the product that has to make money.
    </p>,
    <p
      key="support"
      className="mt-6 max-w-[42rem] font-sans text-sm text-muted md:text-base"
    >
      Six streaming apps, five regions, four ways of charging for them —
      subscriptions, ads, rewarded ads and coins. I&apos;m moving from building
      features to deciding which ones get built.
    </p>,
    <p key="links" className="mt-8 font-sans text-sm">
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
    <figure className="m-0 w-full max-w-[17rem] justify-self-end lg:max-w-[20rem]">
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-rule">
        <Image
          src={src}
          alt="Portrait of Leela Shankar Gurram"
          fill
          sizes="(max-width: 1024px) 17rem, 20rem"
          priority
          className="object-cover"
        />
      </div>
      <figcaption className="mt-3 font-mono text-xs text-muted">
        Leela Shankar Gurram — Bengaluru
      </figcaption>
    </figure>
  );

  if (!animated) return frame;

  return (
    <motion.div
      className="justify-self-end"
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
    <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-14 text-left md:px-10 md:pt-24 lg:px-12">
      {portraitSrc ? (
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14">
          <IdentityBlock animated={animated} />
          <div className="hidden md:block">
            <Portrait src={portraitSrc} animated={animated} />
          </div>
        </div>
      ) : (
        <IdentityBlock animated={animated} />
      )}
    </section>
  );
}
