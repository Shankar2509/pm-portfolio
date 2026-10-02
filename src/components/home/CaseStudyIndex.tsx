import Link from "next/link";
import { SectionLabel } from "@/components/home/SectionLabel";
import type { CaseStudyMeta } from "@/lib/content";

type CaseStudyIndexProps = {
  watchlists: CaseStudyMeta;
  patent: CaseStudyMeta;
};

const hoverEase =
  "transition-colors duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:text-accent";

type EntryProps = {
  meta: CaseStudyMeta;
  facts: string[];
  index: string;
  last?: boolean;
};

/**
 * Gold index numeral + oversized serif title on the left, a mono box of
 * checkable facts on the right. Outcome framings follow content/metrics.md
 * exactly — the 12% is release-level and must carry its caveat.
 */
function Entry({ meta, facts, index, last = false }: EntryProps) {
  return (
    <Link
      href={`/work/${meta.slug}`}
      className={`group grid grid-cols-1 gap-x-14 gap-y-6 py-12 no-underline md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] ${
        last ? "" : "border-b border-rule"
      }`}
    >
      <div className="max-w-[42rem]">
        <span
          aria-hidden
          className="block font-display text-4xl text-accent md:text-5xl"
        >
          {index}
        </span>
        <h2
          className={`mt-3 font-display text-4xl text-ink md:text-5xl ${hoverEase}`}
        >
          {meta.title}
        </h2>
        <p className="mt-5 max-w-[36rem] font-sans text-base text-muted">
          {meta.summary}
        </p>
      </div>

      <ul className="m-0 list-none self-start border border-rule-gold bg-surface p-5 pl-5">
        <li className="py-1 font-mono text-xs text-ink">
          {meta.company} · {meta.timeframe}
        </li>
        {facts.map((fact) => (
          <li key={fact} className="py-1 font-mono text-xs text-muted">
            {fact}
          </li>
        ))}
        <li className={`py-1 font-mono text-xs text-accent ${hoverEase}`}>
          Read the case study →
        </li>
      </ul>
    </Link>
  );
}

export function CaseStudyIndex({ watchlists, patent }: CaseStudyIndexProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 text-left md:px-10 lg:px-12">
      <SectionLabel title="Selected work" />

      <div className="mt-2">
        <Entry
          meta={watchlists}
          index="01"
          facts={[
            "Role: iOS developer → feature owner",
            "12% retention lift — release-level result, shipped alongside EPG and HLS work",
            "Measured via AppsFlyer, GTM, Google Analytics",
          ]}
        />
        <Entry
          meta={patent}
          index="02"
          facts={[
            "Role: team lead, problem validation",
            "500+ survey participants",
            "5 engineers · 3 disciplines (CSE, EEE, ECE)",
            "Published patent · 202441049990",
          ]}
          last
        />
      </div>
    </section>
  );
}
