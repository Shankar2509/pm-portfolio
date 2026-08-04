import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteNav } from "@/components/home/SiteNav";
import { getPortraitSrc } from "@/lib/portrait";

export const metadata: Metadata = {
  title: "About",
  description:
    "Leela Shankar Gurram — iOS developer at Contus Tech, moving from building features to deciding which features get built.",
};

const record: { label: string; detail: string }[] = [
  {
    label: "iOS Developer, Contus Tech",
    detail: "September 2024 - Present · Bengaluru",
  },
  {
    label: "B.Tech, Electronics and Communication Engineering",
    detail: "Alliance University · graduated 2024 · CGPA 3.1/4.0",
  },
  {
    label: "Indian Patent Application No. 202441049990",
    detail: "Published · lead inventor · vehicle safety system",
  },
  {
    label: "Conference paper, ICADIE-2024",
    detail: "IoT-based accident prediction and emergency alert",
  },
  {
    label: "Google Project Management Certificate",
    detail: "In progress",
  },
  {
    label: "6 apps · 5 regions",
    detail: "All live on the App Store, built and monetized end to end",
  },
];

export default function AboutPage() {
  const portraitSrc = getPortraitSrc();

  return (
    <>
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 pt-16 pb-24 text-left md:px-10 md:pt-20 lg:px-12">
        <p className="font-mono text-xs tracking-wide text-muted uppercase">
          About
        </p>

        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-[65ch]">
            <h1 className="font-display text-3xl text-ink md:text-4xl">
              An engineer who ended up owning the money layer.
            </h1>

            <p className="mt-8 text-base text-ink">
              I&apos;m Leela Shankar Gurram, an iOS developer at Contus Tech in
              Bengaluru. I build streaming apps — six of them live on the App
              Store across five regions — and I own the layer most engineers
              avoid: subscriptions, ad mediation, coins, and the attribution
              stack that says which of them is working.
            </p>

            <p className="mt-4 text-base text-ink">
              That layer interested me because it&apos;s where product
              decisions stop being abstract. Every ad placement trades revenue
              against the viewing experience; every paywall is a bet on what a
              viewer will tolerate; the same app needs a different revenue
              model in India than in Europe. Working there means arguing about
              what the product should do, not only how to build it.
            </p>

            <h2 className="mt-12 font-display text-2xl text-ink">
              Product work before I knew the name for it
            </h2>

            <p className="mt-5 text-base text-ink">
              At university I led a team of five engineers across three
              disciplines through a ten-month design programme. We surveyed
              500+ people, found three causes of road-accident fatalities —
              delayed emergency alerts, alcohol, late-night drowsiness — and
              built one device that addressed all three. It became a published
              Indian patent, No. 202441049990, with me as lead inventor. The
              lasting lesson wasn&apos;t the hardware; it was choosing which
              problem to solve, keeping five strangers pointed at it, and
              cutting the feature we couldn&apos;t afford to build.
            </p>

            <h2 className="mt-12 font-display text-2xl text-ink">
              What I&apos;m doing about it
            </h2>

            <p className="mt-5 text-base text-ink">
              I&apos;m deliberately moving from building features to deciding
              which features get built. At work that looks like turning
              ambiguous client requests into documented specifications, acting
              as the single point of contact with an external partner&apos;s
              engineering team, and reading the analytics behind every release.
              Alongside it I&apos;m completing the Google Project Management
              Certificate. What I want next is a seat where the trade-offs are
              mine to argue.
            </p>

            <h2 className="mt-12 font-display text-2xl text-ink">
              The record
            </h2>

            <ul className="m-0 mt-6 list-none p-0">
              {record.map((item) => (
                <li
                  key={item.label}
                  className="grid grid-cols-1 gap-1 border-b border-rule py-4 first:border-t sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="font-sans text-sm text-ink">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-sans text-sm">
              <a href="mailto:leelashankargurram@gmail.com">
                leelashankargurram@gmail.com
              </a>
              <span className="text-muted"> · </span>
              <a
                href="https://linkedin.com/in/leela-shankar-gurram"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <span className="text-muted"> · </span>
              <a href="/resume">Resume</a>
              <span className="text-muted"> · </span>
              <a
                href="https://leelashankar.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                iOS portfolio
              </a>
            </p>
          </div>

          {portraitSrc ? (
            <figure className="m-0 hidden w-[16rem] md:block lg:w-[18rem]">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-rule">
                <Image
                  src={portraitSrc}
                  alt="Portrait of Leela Shankar Gurram"
                  fill
                  sizes="18rem"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-muted">
                Bengaluru, India
              </figcaption>
            </figure>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
