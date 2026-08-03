import { CaseStudyIndex } from "@/components/home/CaseStudyIndex";
import { CurrentlyContact } from "@/components/home/CurrentlyContact";
import { Hero } from "@/components/home/Hero";
import { SiteNav } from "@/components/home/SiteNav";
import { getCaseStudyBySlug } from "@/lib/content";

export default function Home() {
  const watchlists = getCaseStudyBySlug("watchlists");
  const patent = getCaseStudyBySlug("vehicle-safety-patent");

  if (!watchlists || !patent) {
    throw new Error("Published case studies missing from allowlist.");
  }

  return (
    <main>
      <SiteNav />
      <Hero />
      <CaseStudyIndex
        watchlists={watchlists.meta}
        patent={patent.meta}
      />
      <CurrentlyContact />
    </main>
  );
}
