import Link from "next/link";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteNav } from "@/components/home/SiteNav";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-6 pt-20 pb-28 text-left md:px-10 md:pt-28 lg:px-12">
        <p className="font-mono text-xs tracking-wide text-accent uppercase">
          404 — page not found
        </p>
        <h1 className="mt-4 max-w-[22ch] font-display text-4xl text-ink md:text-5xl">
          This page isn&apos;t in the ledger.
        </h1>
        <p className="mt-6 max-w-[42rem] font-sans text-base text-muted">
          The address may have changed, or it never existed. Everything that
          does exist is reachable from the pages below.
        </p>
        <ul className="m-0 mt-10 max-w-[28rem] list-none p-0">
          <li className="border-t border-rule">
            <Link
              href="/"
              className="block py-3 font-mono text-sm text-ink no-underline hover:text-accent"
            >
              Home — the six apps and selected work
            </Link>
          </li>
          <li className="border-t border-rule">
            <Link
              href="/about"
              className="block py-3 font-mono text-sm text-ink no-underline hover:text-accent"
            >
              About — the record
            </Link>
          </li>
          <li className="border-y border-rule">
            <Link
              href="/resume"
              className="block py-3 font-mono text-sm text-ink no-underline hover:text-accent"
            >
              Resume — the one-page version
            </Link>
          </li>
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
