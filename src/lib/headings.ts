export function stripHtmlComments(source: string): string {
  return source.replace(/<!--[\s\S]*?-->/g, "").replace(/\n{3,}/g, "\n\n");
}

/**
 * next-mdx-remote can mis-parse markdown that immediately follows a self-closing
 * JSX block (e.g. `<Metric />` then `## Heading`). Insert an inert MDX expression
 * so the heading stays an h2 and the component still renders with its props.
 *
 * Do not rewrite Metric props to JSX expressions — client components receive
 * empty values for those through the RSC MDX path.
 * In-memory only — never rewrite the source files.
 */
export function prepareMdxSource(source: string): string {
  return source.replace(
    /(<Metric\b[^>]*\/>)\s*\n+(##\s)/g,
    "$1\n\n{null}\n\n$2",
  );
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type CaseStudyHeading = {
  id: string;
  text: string;
};

export function getHeadings(body: string): CaseStudyHeading[] {
  const headings: CaseStudyHeading[] = [];
  const pattern = /^##\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(body)) !== null) {
    const text = match[1].trim();
    headings.push({ id: slugifyHeading(text), text });
  }

  return headings;
}
