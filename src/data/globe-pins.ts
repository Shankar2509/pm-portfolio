import { shippedApps, type ShippedApp } from "@/data/apps";

export type GlobePin = {
  id: string;
  region: string;
  lat: number;
  lng: number;
  apps: ShippedApp[];
};

function appsByName(...names: string[]): ShippedApp[] {
  return names.map((name) => {
    const app = shippedApps.find((entry) => entry.name === name);
    if (!app) {
      throw new Error(`Globe pin references unknown app: ${name}`);
    }
    return app;
  });
}

/**
 * Six pins · six apps. US gets two pins with a small geographic gap
 * so muVpix and YOW.tv read as separate markers.
 */
export const globePins: GlobePin[] = [
  {
    id: "europe",
    region: "Europe",
    lat: 52.5,
    lng: 13.4,
    apps: appsByName("That's the Spirit"),
  },
  {
    id: "india",
    region: "India",
    lat: 20.6,
    lng: 78.9,
    apps: appsByName("Reelies"),
  },
  {
    id: "malaysia",
    region: "Malaysia",
    lat: 4.2,
    lng: 101.9,
    apps: appsByName("Karya Reels"),
  },
  {
    id: "us-muvpix",
    region: "US",
    lat: 44.0,
    lng: -110.0,
    apps: appsByName("muVpix"),
  },
  {
    id: "us-yow",
    region: "US",
    lat: 33.5,
    lng: -86.0,
    apps: appsByName("YOW.tv"),
  },
  {
    id: "mena",
    region: "MENA (UAE)",
    lat: 24.5,
    lng: 54.4,
    apps: appsByName("Seera"),
  },
];
