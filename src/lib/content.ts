import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  getHeadings,
  prepareMdxSource,
  stripHtmlComments,
  type CaseStudyHeading,
} from "@/lib/headings";

export type { CaseStudyHeading };

/**
 * Explicit publish allowlist. Do not scan content/ — unfinished drafts
 * (WRITE THIS placeholders) must never enter routing or listings.
 */
export const PUBLISHED_CASE_STUDIES = {
  watchlists: "01-watchlists.mdx",
  "vehicle-safety-patent": "05-vehicle-safety-patent.mdx",
} as const;

export type PublishedSlug = keyof typeof PUBLISHED_CASE_STUDIES;

const contentDirectory = path.join(process.cwd(), "content");

export type CaseStudyMeta = {
  title: string;
  slug: string;
  order: number;
  role: string;
  timeframe: string;
  company: string;
  featured: boolean;
  summary: string;
  tags: string[];
};

export type CaseStudy = {
  meta: CaseStudyMeta;
  /** MDX body with frontmatter and HTML comments removed (in memory only). */
  body: string;
  headings: CaseStudyHeading[];
  fileName: string;
};

export function isPublishedSlug(slug: string): slug is PublishedSlug {
  return Object.prototype.hasOwnProperty.call(PUBLISHED_CASE_STUDIES, slug);
}

export function getCaseStudySlugs(): PublishedSlug[] {
  return Object.keys(PUBLISHED_CASE_STUDIES) as PublishedSlug[];
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  if (!isPublishedSlug(slug)) {
    return null;
  }

  const fileName = PUBLISHED_CASE_STUDIES[slug];
  const fullPath = path.join(contentDirectory, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const stripped = stripHtmlComments(content).trim();
  const body = prepareMdxSource(stripped);

  return {
    meta: data as CaseStudyMeta,
    body,
    headings: getHeadings(stripped),
    fileName,
  };
}

export function getCaseStudies(): CaseStudy[] {
  return getCaseStudySlugs()
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((study): study is CaseStudy => study !== null)
    .sort((a, b) => a.meta.order - b.meta.order);
}
