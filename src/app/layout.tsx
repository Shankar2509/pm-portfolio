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
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
