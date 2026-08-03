import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/content";
import type { CaseStudyHeading } from "@/lib/headings";
import { CaseStudyNav } from "./CaseStudyNav";
import { ScrollProgress } from "./ScrollProgress";
import { SectionProvider } from "./SectionContext";

type CaseStudyShellProps = {
  meta: CaseStudyMeta;
  headings: CaseStudyHeading[];
  children: React.ReactNode;
};

export function CaseStudyShell({
  meta,
  headings,
  children,
}: CaseStudyShellProps) {
  return (
    <>
      <ScrollProgress />

      <div className="mx-auto w-full max-w-6xl px-6 pt-10 pb-24 md:px-10 lg:px-12">
        <Link
          href="/"
          className="inline-block font-sans text-sm text-accent underline-offset-4 hover:underline"
        >
          ← Back
        </Link>

        <header className="mt-10 mb-14 max-w-[65ch] text-left">
          <h1 className="font-display text-4xl text-ink md:text-5xl">
            {meta.title}
          </h1>
          <div className="mt-6 space-y-1 font-sans text-sm text-muted">
            <p>{meta.role}</p>
            <p>{meta.timeframe}</p>
            <p>{meta.company}</p>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,65ch)] lg:gap-16 xl:grid-cols-[15rem_minmax(0,65ch)]">
          <aside className="top-28 hidden self-start lg:sticky lg:block">
            <CaseStudyNav headings={headings} />
          </aside>

          <article className="max-w-[65ch] text-left text-base text-ink">
            <SectionProvider>{children}</SectionProvider>
          </article>
        </div>
      </div>
    </>
  );
}
