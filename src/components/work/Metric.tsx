"use client";

import { Reveal } from "./Reveal";

type MetricProps = {
  value: string;
  caveat: string;
};

export function Metric({ value, caveat }: MetricProps) {
  return (
    <Reveal
      kind="metric"
      as="figure"
      // At xl the metric floats into the otherwise-empty right margin of the
      // 65ch column (editorial sidenote pattern). The negative right margin
      // exceeds the width, so the float takes no space in the text flow.
      className="my-10 xl:float-right xl:clear-right xl:-mr-[15rem] xl:my-1 xl:w-[12rem] xl:border-l xl:border-rule-gold xl:pl-5"
    >
      <p
        className="font-display text-5xl leading-none md:text-6xl xl:text-4xl"
        style={{ color: "var(--color-accent)", opacity: 1 }}
      >
        {value}
      </p>
      {/*
        Caveat at text-sm (0.8rem ≈ 12.8px, nearest on-scale to 12px).
        --muted #A7A29A on --paper #121216 ≈ 6.8:1 — passes WCAG AA (4.5:1) at 12px.
      */}
      <p
        className="mt-3 font-mono text-sm xl:text-xs"
        style={{ color: "var(--color-muted)", opacity: 1 }}
      >
        {caveat}
      </p>
    </Reveal>
  );
}
