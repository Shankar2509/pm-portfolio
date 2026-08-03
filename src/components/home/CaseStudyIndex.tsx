import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/content";

type CaseStudyIndexProps = {
  watchlists: CaseStudyMeta;
  patent: CaseStudyMeta;
};

export function CaseStudyIndex({ watchlists, patent }: CaseStudyIndexProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 text-left md:px-10 lg:px-12">
      <p className="mb-10 font-mono text-xs tracking-wide text-muted uppercase">
        Selected work
      </p>

      <Link
        href={`/work/${watchlists.slug}`}
        className="group block max-w-[40rem] no-underline"
      >
        <h2 className="font-display text-3xl text-ink transition-colors duration-200 group-hover:text-accent md:text-4xl"
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {watchlists.title}
        </h2>
        <p className="mt-4 max-w-[36rem] font-sans text-base text-muted">
          {watchlists.summary}
        </p>
        <p className="mt-3 font-mono text-xs text-muted">
          {watchlists.company} · {watchlists.timeframe}
        </p>
      </Link>

      <Link
        href={`/work/${patent.slug}`}
        className="group mt-16 block max-w-[28rem] no-underline md:mt-20 md:ml-[min(12rem,18%)]"
      >
        <h2 className="font-display text-xl text-ink transition-colors duration-200 group-hover:text-accent md:text-2xl"
          style={{
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {patent.title}
        </h2>
        <p className="mt-3 font-sans text-sm text-muted">{patent.summary}</p>
        <p className="mt-3 font-mono text-xs text-muted">
          {patent.company} · {patent.timeframe}
        </p>
      </Link>
    </section>
  );
}
