import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CaseStudyShell } from "@/components/work/CaseStudyShell";
import { caseStudyComponents } from "@/components/work/mdx";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
  type PublishedSlug,
} from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: PublishedSlug }[] {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {};
  }

  return {
    title: study.meta.title,
    description: study.meta.summary,
    openGraph: {
      title: study.meta.title,
      description: study.meta.summary,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: study.meta.title,
      description: study.meta.summary,
    },
  };
}

/** The patent is the one work with an official registry entry — mark it up. */
const patentJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Vehicle safety system",
  identifier: "Indian Patent Application No. 202441049990",
  creativeWorkStatus: "Published",
  author: {
    "@type": "Person",
    name: "Leela Shankar Gurram",
  },
};

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const ordered = getCaseStudies();
  const index = ordered.findIndex((s) => s.meta.slug === study.meta.slug);
  const toAdjacent = (s: (typeof ordered)[number] | undefined) =>
    s ? { slug: s.meta.slug, title: s.meta.title } : null;

  return (
    <>
      {slug === "vehicle-safety-patent" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(patentJsonLd) }}
        />
      ) : null}
      <CaseStudyShell
        meta={study.meta}
        headings={study.headings}
        previous={toAdjacent(ordered[index - 1])}
        next={toAdjacent(ordered[index + 1])}
      >
        <MDXRemote source={study.body} components={caseStudyComponents} />
      </CaseStudyShell>
    </>
  );
}
