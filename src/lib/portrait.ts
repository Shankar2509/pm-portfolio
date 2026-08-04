import fs from "node:fs";
import path from "node:path";

const CANDIDATES = ["portrait.jpg", "portrait.jpeg", "portrait.png", "portrait.webp"];

/**
 * Server-only. Returns the public URL of the portrait if the candidate has
 * dropped one into /public, otherwise null (identity blocks render text-only).
 */
export function getPortraitSrc(): string | null {
  for (const file of CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", file))) {
      return `/${file}`;
    }
  }
  return null;
}
