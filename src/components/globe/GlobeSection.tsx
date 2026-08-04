"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGlobeGate } from "@/hooks/useGlobeGate";
import { GlobeFallback } from "@/components/globe/GlobeFallback";

const GlobeCanvas = dynamic(() => import("@/components/globe/GlobeCanvas"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

/**
 * Signature home element. The 3D chunk is requested only once the section
 * has scrolled into view AND the gate confirms motion OK + no save-data —
 * so the pin/arc intro plays when the visitor actually sees it.
 */
export function GlobeSection() {
  const gate = useGlobeGate();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10 md:py-14 lg:px-12"
      aria-label="Markets where the six apps shipped"
    >
      {gate === "3d" && inView ? <GlobeCanvas /> : <GlobeFallback />}
    </section>
  );
}
