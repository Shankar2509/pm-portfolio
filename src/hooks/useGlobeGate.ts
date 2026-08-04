"use client";

import { useEffect, useState } from "react";

export type GlobeGate = "pending" | "3d" | "fallback";

type NetworkInformation = {
  saveData?: boolean;
};

/**
 * 3D loads only after client measurement confirms:
 * no prefers-reduced-motion and save-data off. Mobile gets the 3D globe too
 * (dpr-capped, touch drag) — only motion/data preferences gate it.
 * Defaults to pending → fallback UI, never flashes the WebGL bundle.
 */
export function useGlobeGate(): GlobeGate {
  const [gate, setGate] = useState<GlobeGate>("pending");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => {
      const connection = (navigator as Navigator & {
        connection?: NetworkInformation;
      }).connection;
      const saveData = connection?.saveData === true;

      if (motion.matches || saveData) {
        setGate("fallback");
        return;
      }
      setGate("3d");
    };

    decide();
    motion.addEventListener("change", decide);
    return () => {
      motion.removeEventListener("change", decide);
    };
  }, []);

  return gate;
}
