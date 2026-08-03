import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.claim;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadInstrumentSerif() {
  const response = await fetch(
    "https://github.com/google/fonts/raw/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf",
  );

  if (!response.ok) {
    throw new Error(`Failed to load Instrument Serif: ${response.status}`);
  }

  return response.arrayBuffer();
}

export default async function OpenGraphImage() {
  const fontData = await loadInstrumentSerif();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#FAF9F6",
          color: "#14110F",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            fontFamily: "Instrument Serif",
            fontSize: 72,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: 920,
          }}
        >
          {siteConfig.claim}
        </div>
        <div
          style={{
            marginTop: 36,
            fontFamily: "Instrument Serif",
            fontSize: 28,
            color: "#6B6560",
          }}
        >
          Leela Shankar Gurram
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
