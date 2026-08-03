export function stripHtmlComments(source: string): string {
  return source.replace(/<!--[\s\S]*?-->/g, "").replace(/\n{3,}/g, "\n\n");
}

/**
 * next-mdx-remote / MDX can mis-parse markdown that immediately follows a
 * self-closing JSX component (e.g. `<Metric />` then `## Heading`), turning
 * the heading into a broken setext fragment ("- -") or dropping it.
 *
 * In-memory only — never rewrite the source files.
 * 1. Re-express Metric props as JSX expressions (avoids attribute edge cases)
 * 2. Insert `{null}` between block JSX and a following ATX heading to force
 *    the markdown parser to resume cleanly.
 */
export function prepareMdxSource(source: string): string {
  let out = source.replace(
    /<Metric\s+([^>]*?)\s*\/>/g,
    (_full, attrs: string) => {
      const value = /value="([^"]*)"/.exec(attrs)?.[1] ?? "";
      const caveat = /caveat="([^"]*)"/.exec(attrs)?.[1] ?? "";
      return `<Metric value={${JSON.stringify(value)}} caveat={${JSON.stringify(caveat)}} />`;
    },
  );

  // Block-level JSX (self-closing PascalCase) followed by an ATX heading
  out = out.replace(
    /(<\/?[A-Z][A-Za-z0-9]*\b[^>]*\/?>)\s*\n+(##\s)/g,
    "$1\n\n{null}\n\n$2",
  );

  return out;
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
