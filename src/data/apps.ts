/**
 * Shipped apps — IDs and framing from content/metrics.md.
 * URL pattern: https://apps.apple.com/us/app/<slug>/id<ID>
 */
export type ShippedApp = {
  name: string;
  region: string;
  monetization: string;
  platform: string;
  /** Content category, from the public App Store positioning. */
  category: string;
  href: string;
  /** Real App Store artwork in public/icons/. */
  icon: string;
};

export const shippedApps: ShippedApp[] = [
  {
    name: "That's the Spirit",
    region: "Europe",
    monetization: "Subscriptions",
    platform: "iOS + tvOS",
    category: "Premium streaming · Lifestyle",
    href: "https://apps.apple.com/us/app/thats-the-spirit/id6444552389",
    icon: "/icons/thats-the-spirit.webp",
  },
  {
    name: "Reelies",
    region: "India",
    monetization: "Subscriptions + Ads",
    platform: "iOS",
    category: "Micro-drama · Short series",
    href: "https://apps.apple.com/us/app/reelies/id6737117072",
    icon: "/icons/reelies.webp",
  },
  {
    name: "Karya Reels",
    region: "Malaysia",
    monetization: "Coins",
    platform: "iOS",
    category: "Films · Series · Micro-drama",
    href: "https://apps.apple.com/us/app/karya-reels/id6739861669",
    icon: "/icons/karya-reels.webp",
  },
  {
    name: "muVpix",
    region: "Global (US)",
    monetization: "Subscriptions + Rewarded Ads",
    platform: "iOS",
    category: "Vertical drama · Short series",
    href: "https://apps.apple.com/us/app/muvpix/id6754364194",
    icon: "/icons/muvpix.webp",
  },
  {
    name: "YOW.tv",
    region: "USA",
    monetization: "Ads",
    platform: "iOS",
    category: "Indie film streaming · OTT",
    href: "https://apps.apple.com/us/app/yow-tv/id6502940351",
    icon: "/icons/yow-tv.webp",
  },
  {
    name: "Seera",
    region: "MENA (UAE)",
    monetization: "Subscriptions + Coins + Ads",
    platform: "iOS",
    category: "Arabic micro-drama",
    href: "https://apps.apple.com/us/app/seera-%D8%B3%D9%8A%D8%B1%D8%A9/id6747977001",
    icon: "/icons/seera.webp",
  },
];
