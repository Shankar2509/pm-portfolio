export const siteConfig = {
  name: "Leela Shankar Gurram",
  title: "Leela Shankar Gurram — Product & Project Management",
  description:
    "An engineer who owns the commercial side of products — six streaming apps across five regions.",
  claim: "I own the part of the product that has to make money.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://pm-portfolio-azure.vercel.app"),
};
