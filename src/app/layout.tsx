import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Leela Shankar Gurram — Product & Project Management",
    template: "%s — Leela Shankar Gurram",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Leela Shankar Gurram",
    title: "Leela Shankar Gurram — Product & Project Management",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Leela Shankar Gurram — Product & Project Management",
    description: siteConfig.description,
  },
};

/**
 * Person schema so search engines connect this site to the name.
 * Facts mirror profile/ and content/metrics.md — nothing invented.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leela Shankar Gurram",
  jobTitle: "iOS Developer",
  worksFor: {
    "@type": "Organization",
    name: "Contus Tech",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Alliance University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  email: "mailto:leelashankargurram@gmail.com",
  url: siteConfig.url,
  sameAs: [
    "https://linkedin.com/in/leela-shankar-gurram",
    "https://leelashankar.vercel.app/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-paper text-ink font-sans text-base antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
