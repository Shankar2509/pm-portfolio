import type { MetadataRoute } from "next";
import { getCaseStudySlugs } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getCaseStudySlugs().map((slug) => ({
      url: `${siteConfig.url}/work/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
