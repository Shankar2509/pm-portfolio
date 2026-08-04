import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/content";
import type { CaseStudyHeading } from "@/lib/headings";
import { CaseStudyNav } from "./CaseStudyNav";
import { ScrollProgress } from "./ScrollProgress";
import { SectionProvider } from "./SectionContext";

type AdjacentStudy = {
  slug: string;
  title: string;
} | null;

type CaseStudyShellProps = {
  meta: CaseStudyMeta;
  headings: CaseStudyHeading[];
  previous?: AdjacentStudy;
  next?: AdjacentStudy;
  children: React.ReactNode;
};

export function CaseStudyShell({
  meta,
  headings,
  previous = null,
  next = null,
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

            {previous || next ? (
              <nav
                aria-label="More case studies"
                className="mt-16 flex flex-wrap justify-between gap-6 border-t border-rule pt-8"
              >
                {previous ? (
                  <Link
                    href={`/work/${previous.slug}`}
                    className="max-w-[45%] no-underline"
                  >
                    <span className="block font-mono text-xs text-muted">
                      ← Previous
                    </span>
                    <span className="mt-1 block font-display text-lg text-ink hover:text-accent">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span aria-hidden />
                )}
                {next ? (
                  <Link
                    href={`/work/${next.slug}`}
                    className="max-w-[45%] text-right no-underline"
                  >
                    <span className="block font-mono text-xs text-muted">
                      Next →
                    </span>
                    <span className="mt-1 block font-display text-lg text-ink hover:text-accent">
                      {next.title}
                    </span>
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </article>
        </div>
      </div>
    </>
  );
}
