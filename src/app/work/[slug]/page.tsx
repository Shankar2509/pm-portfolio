import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CaseStudyShell } from "@/components/work/CaseStudyShell";
import { caseStudyComponents } from "@/components/work/mdx";
import {
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

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <CaseStudyShell meta={study.meta} headings={study.headings}>
      <MDXRemote source={study.body} components={caseStudyComponents} />
    </CaseStudyShell>
  );
}
