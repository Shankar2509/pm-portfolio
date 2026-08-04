import type { Metadata } from "next";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteNav } from "@/components/home/SiteNav";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Leela Shankar Gurram — iOS Developer at Contus Tech, Bengaluru.",
};

export default function ResumePage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 pt-16 pb-24 text-left md:px-10 md:pt-20 lg:px-12">
        <p className="font-mono text-xs tracking-wide text-muted uppercase">
          Resume
        </p>
        <h1 className="mt-4 font-display text-3xl text-ink md:text-4xl">
          The one-page version.
        </h1>
        <p className="mt-4 max-w-[42rem] font-sans text-sm text-muted">
          View it below or{" "}
          <a href="/resume.pdf" download>
            download the PDF
          </a>
          . For the reasoning behind the work, the case studies say more than
          any bullet point.
        </p>

        <object
          data="/resume.pdf"
          type="application/pdf"
          aria-label="Resume PDF of Leela Shankar Gurram"
          className="mt-10 h-[75vh] w-full max-w-4xl border border-rule"
        >
          <p className="p-6 font-sans text-sm text-muted">
            Your browser can&apos;t display the PDF inline —{" "}
            <a href="/resume.pdf" download>
              download it instead
            </a>
            .
          </p>
        </object>
      </main>
      <SiteFooter />
    </>
  );
}
