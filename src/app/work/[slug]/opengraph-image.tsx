import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

export const alt = "Case study — Leela Shankar Gurram";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Static copy of the frontmatter this card needs. The MDX files aren't
 * traced into this serverless function's bundle, so reading them via fs
 * fails at runtime (ENOENT in production). Fact framings follow
 * content/metrics.md.
 */
const CARD_BY_SLUG: Record<
  string,
  { title: string; company: string; timeframe: string; fact: string }
> = {
  watchlists: {
    title: "The catalogue was good. Nobody could find the good part.",
    company: "Contus Tech · VPlayed OTT platform",
    timeframe: "2025",
    fact: "12% retention lift — release-level result, shipped with EPG and HLS work",
  },
  "vehicle-safety-patent": {
    title: "Five strangers, ten months, one patent",
    company: "Alliance University",
    timeframe: "Aug 2022 – May 2024",
    fact: "500+ surveyed · 5 engineers, 3 disciplines · published patent 202441049990",
  },
};

async function loadInstrumentSerif() {
  const response = await fetch(
    "https://github.com/google/fonts/raw/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf",
  );

  if (!response.ok) {
    throw new Error(`Failed to load Instrument Serif: ${response.status}`);
  }

  return response.arrayBuffer();
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = CARD_BY_SLUG[slug];

  if (!card) {
    notFound();
  }

  const fontData = await loadInstrumentSerif();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#121216",
          color: "#F5F2EA",
          padding: "64px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #453A20",
            paddingBottom: 20,
            fontSize: 24,
            color: "#A7A29A",
          }}
        >
          <span>{card.company}</span>
          <span>{card.timeframe}</span>
        </div>

        <div
          style={{
            fontFamily: "Instrument Serif",
            fontSize: 68,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {card.title}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid #453A20",
            paddingTop: 20,
            gap: 10,
          }}
        >
          <div style={{ fontSize: 24, color: "#A7A29A" }}>{card.fact}</div>
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 28,
              color: "#DABA5F",
            }}
          >
            Leela Shankar Gurram
          </div>
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
