/**
 * Shipped apps — IDs and framing from content/metrics.md.
 * URL pattern: https://apps.apple.com/us/app/<slug>/id<ID>
 */
export type ShippedApp = {
  name: string;
  region: string;
  monetization: string;
  platform: string;
  href: string;
};

export const shippedApps: ShippedApp[] = [
  {
    name: "That's the Spirit",
    region: "Europe",
    monetization: "Subscriptions",
    platform: "iOS + tvOS",
    href: "https://apps.apple.com/us/app/thats-the-spirit/id6444552389",
  },
  {
    name: "Reelies",
    region: "India",
    monetization: "Subscriptions + Ads",
    platform: "iOS",
    href: "https://apps.apple.com/us/app/reelies/id6737117072",
  },
  {
    name: "Karya Reels",
    region: "Malaysia",
    monetization: "Coins",
    platform: "iOS",
    href: "https://apps.apple.com/us/app/karya-reels/id6739861669",
  },
  {
    name: "muVpix",
    region: "Global (US)",
    monetization: "Subscriptions + Rewarded Ads",
    platform: "iOS",
    href: "https://apps.apple.com/us/app/muvpix/id6754364194",
  },
  {
    name: "YOW.tv",
    region: "USA",
    monetization: "Ads",
    platform: "iOS",
    href: "https://apps.apple.com/us/app/yow-tv/id6502940351",
  },
  {
    name: "Seera",
    region: "MENA (UAE)",
    monetization: "Subscriptions + Coins + Ads",
    platform: "iOS",
    href: "https://apps.apple.com/us/app/seera-%D8%B3%D9%8A%D8%B1%D8%A9/id6747977001",
  },
];
