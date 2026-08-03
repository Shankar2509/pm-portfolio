"use client";

import { useEffect, useState } from "react";
import type { CaseStudyHeading } from "@/lib/headings";

type CaseStudyNavProps = {
  headings: CaseStudyHeading[];
};

export function CaseStudyNav({ headings }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <p className="mb-4 font-mono text-xs tracking-wide text-muted uppercase">
        On this page
      </p>
      <ul className="flex flex-col gap-3 border-l border-rule">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block border-l pl-4 -ml-px text-sm transition-colors duration-200 ${
                  isActive
                    ? "border-accent text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
