"use client";

import { motion, type Transition, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { SectionType } from "./SectionContext";

export type RevealKind =
  | "heading-narrative"
  | "heading-insight"
  | "heading-outcome"
  | "prose-narrative"
  | "prose-insight"
  | "prose-outcome"
  | "metric"
  | "breakout";

const easeOutExpo: Transition["ease"] = [0.22, 1, 0.36, 1];

/**
 * Transform only — never opacity. Base state stays fully visible so content
 * remains readable without JS, during partial intersection, and when printing.
 */
const variants: Record<RevealKind, Variants> = {
  "heading-narrative": {
    hidden: { x: -18 },
    visible: { x: 0 },
  },
  "heading-insight": {
    hidden: { scale: 0.98 },
    visible: { scale: 1 },
  },
  "heading-outcome": {
    hidden: { y: 10 },
    visible: { y: 0 },
  },
  "prose-narrative": {
    hidden: { y: 12 },
    visible: { y: 0 },
  },
  "prose-insight": {
    hidden: { scale: 0.985 },
    visible: { scale: 1 },
  },
  "prose-outcome": {
    hidden: { y: 10 },
    visible: { y: 0 },
  },
  metric: {
    hidden: { y: 24 },
    visible: { y: 0 },
  },
  breakout: {
    hidden: { x: 16 },
    visible: { x: 0 },
  },
};

const transitions: Record<RevealKind, Transition> = {
  "heading-narrative": { duration: 0.7, ease: easeOutExpo },
  "heading-insight": { duration: 0.8, ease: easeOutExpo },
  "heading-outcome": { duration: 0.85, ease: easeOutExpo },
  "prose-narrative": { duration: 0.65, ease: easeOutExpo },
  "prose-insight": { duration: 0.75, ease: easeOutExpo },
  "prose-outcome": { duration: 0.85, ease: easeOutExpo },
  metric: { duration: 0.9, ease: easeOutExpo, delay: 0.08 },
  breakout: { duration: 0.75, ease: easeOutExpo },
};

export function headingRevealKind(type: SectionType): RevealKind {
  if (type === "insight") return "heading-insight";
  if (type === "outcome") return "heading-outcome";
  return "heading-narrative";
}

export function proseRevealKind(type: SectionType): RevealKind {
  if (type === "insight") return "prose-insight";
  if (type === "outcome") return "prose-outcome";
  return "prose-narrative";
}

type RevealTag = "div" | "section" | "figure" | "blockquote" | "p" | "h2";

type RevealProps = {
  kind: RevealKind;
  children: React.ReactNode;
  className?: string;
  as?: RevealTag;
  id?: string;
};

const motionTags = {
  div: motion.div,
  section: motion.section,
  figure: motion.figure,
  blockquote: motion.blockquote,
  p: motion.p,
  h2: motion.h2,
} as const;

export function Reveal({
  kind,
  children,
  className,
  as = "div",
  id,
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Defer motion until after mount so SSR / no-JS HTML has no transform styles.
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    setMotionReady(true);
  }, []);

  const Tag = as;

  if (prefersReducedMotion || !motionReady) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  const Component = motionTags[as];

  return (
    <Component
      id={id}
      className={className}
      variants={variants[kind]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.25 }}
      transition={transitions[kind]}
    >
      {children}
    </Component>
  );
}
