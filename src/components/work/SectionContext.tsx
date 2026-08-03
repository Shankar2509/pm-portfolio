"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

export type SectionType = "narrative" | "insight" | "outcome";

type SectionApi = {
  getType: () => SectionType;
  setType: (type: SectionType) => void;
};

const SectionContext = createContext<SectionApi | null>(null);

export function classifyHeading(text: string): SectionType {
  const t = text.toLowerCase();

  if (t.includes("insight") || t.includes("pivot")) {
    return "insight";
  }

  if (t.includes("outcome") || t.includes("differently")) {
    return "outcome";
  }

  return "narrative";
}

export function SectionProvider({ children }: { children: ReactNode }) {
  const typeRef = useRef<SectionType>("narrative");

  const api = useMemo<SectionApi>(
    () => ({
      getType: () => typeRef.current,
      setType: (type) => {
        typeRef.current = type;
      },
    }),
    [],
  );

  return (
    <SectionContext.Provider value={api}>{children}</SectionContext.Provider>
  );
}

export function useSectionApi(): SectionApi {
  const ctx = useContext(SectionContext);
  if (!ctx) {
    throw new Error("useSectionApi must be used within SectionProvider");
  }
  return ctx;
}
