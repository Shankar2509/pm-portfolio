"use client";

import { useEffect, useState } from "react";

export type GlobeGate = "pending" | "3d" | "fallback";

type NetworkInformation = {
  saveData?: boolean;
};

/**
 * 3D loads only after client measurement confirms all of:
 * no prefers-reduced-motion, viewport ≥ 768px, save-data off.
 * Defaults to pending → fallback UI, never flashes the WebGL bundle.
 */
export function useGlobeGate(): GlobeGate {
  const [gate, setGate] = useState<GlobeGate>("pending");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 767px)");

    const decide = () => {
      const connection = (navigator as Navigator & {
        connection?: NetworkInformation;
      }).connection;
      const saveData = connection?.saveData === true;

      if (motion.matches || narrow.matches || saveData) {
        setGate("fallback");
        return;
      }
      setGate("3d");
    };

    decide();
    motion.addEventListener("change", decide);
    narrow.addEventListener("change", decide);
    return () => {
      motion.removeEventListener("change", decide);
      narrow.removeEventListener("change", decide);
    };
  }, []);

  return gate;
}
