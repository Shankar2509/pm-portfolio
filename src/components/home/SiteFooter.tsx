import Link from "next/link";

/** Evaluated at build time — every deploy refreshes the stamp. */
const LAST_UPDATED = new Date().toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
});

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl border-t border-rule-gold px-6 py-16 text-left md:px-10 lg:px-12">
      <p className="font-display text-2xl text-ink md:text-3xl">
        Leela Shankar <em className="text-accent">Gurram</em>
      </p>
      <p className="mt-2 max-w-[40rem] font-sans text-sm text-muted">
        iOS Developer at Contus Tech, Bengaluru. B.Tech Electronics and
        Communication Engineering, Alliance University, 2024. Google Project
        Management Certificate in progress.
      </p>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-sans text-sm">
        <a href="mailto:leelashankargurram@gmail.com">
          leelashankargurram@gmail.com
        </a>
        <a
          href="https://linkedin.com/in/leela-shankar-gurram"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <Link href="/about">About</Link>
        <Link href="/resume">Resume</Link>
      </div>

      <p className="mt-8 font-mono text-xs text-muted">
        Engineering depth lives on the iOS portfolio —{" "}
        <a
          href="https://leelashankar.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          leelashankar.vercel.app
        </a>
      </p>
      <p className="mt-2 font-mono text-xs text-muted">
        Last updated {LAST_UPDATED}
      </p>
    </footer>
  );
}
