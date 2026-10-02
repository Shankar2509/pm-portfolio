export const siteConfig = {
  name: "Leela Shankar Gurram",
  title: "Leela Shankar Gurram — Product & Project Management",
  description:
    "An engineer who owns the commercial side of products — six streaming apps across five regions.",
  claim: "I own the part of the product that has to make money.",
  // The URL people are actually given. Do not fall back to
  // VERCEL_PROJECT_PRODUCTION_URL — it resolves to the project's internal
  // pm-site-sandy domain and leaks into og:image and sitemap URLs.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://leela-shankar.vercel.app",
};
