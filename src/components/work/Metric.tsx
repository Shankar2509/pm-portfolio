"use client";

import { Reveal } from "./Reveal";

type MetricProps = {
  value: string;
  caveat: string;
};

export function Metric({ value, caveat }: MetricProps) {
  return (
    <Reveal kind="metric" as="figure" className="my-10">
      <p
        className="font-display text-5xl leading-none md:text-6xl"
        style={{ color: "var(--color-ink)", opacity: 1 }}
      >
        {value}
      </p>
      {/*
        Caveat at text-sm (0.8rem ≈ 12.8px, nearest on-scale to 12px).
        --muted #6B6560 on --paper #FAF9F6 ≈ 5.46:1 — passes WCAG AA (4.5:1) at 12px.
      */}
      <p
        className="mt-3 font-mono text-sm"
        style={{ color: "var(--color-muted)", opacity: 1 }}
      >
        {caveat}
      </p>
    </Reveal>
  );
}
