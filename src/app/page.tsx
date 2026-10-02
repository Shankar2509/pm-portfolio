import { CaseStudyIndex } from "@/components/home/CaseStudyIndex";
import { MarketsSection } from "@/components/home/MarketsSection";
import { Hero } from "@/components/home/Hero";
import { ProofStrip } from "@/components/home/ProofStrip";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteNav } from "@/components/home/SiteNav";
import { getCaseStudyBySlug } from "@/lib/content";
import { getPortraitSrc } from "@/lib/portrait";

export default function Home() {
  const watchlists = getCaseStudyBySlug("watchlists");
  const patent = getCaseStudyBySlug("vehicle-safety-patent");
  const portraitSrc = getPortraitSrc();

  if (!watchlists || !patent) {
    throw new Error("Published case studies missing from allowlist.");
  }

  return (
    <main>
      <SiteNav />
      <Hero portraitSrc={portraitSrc} />
      <ProofStrip />
      <MarketsSection />
      <CaseStudyIndex
        watchlists={watchlists.meta}
        patent={patent.meta}
      />
      <SiteFooter />
    </main>
  );
}
