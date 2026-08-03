"use client";

import dynamic from "next/dynamic";
import { useGlobeGate } from "@/hooks/useGlobeGate";
import { GlobeFallback } from "@/components/globe/GlobeFallback";

const GlobeCanvas = dynamic(() => import("@/components/globe/GlobeCanvas"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

/**
 * Signature home element. The 3D chunk is only requested after the gate
 * confirms desktop + motion OK + no save-data.
 */
export function GlobeSection() {
  const gate = useGlobeGate();

  return (
    <section
      className="mx-auto w-full max-w-6xl px-6 py-6 md:px-10 md:py-8 lg:px-12"
      aria-label="Markets where the six apps shipped"
    >
      {gate === "3d" ? <GlobeCanvas /> : <GlobeFallback />}
    </section>
  );
}
