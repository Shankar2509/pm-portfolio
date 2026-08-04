import Link from "next/link";

/**
 * Evidence row, ledger-styled: every item is checkable, none is a bare
 * stat counter. Sits between the hero and the globe.
 */
export function ProofStrip() {
  return (
    <section
      aria-label="Verifiable record"
      className="mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12"
    >
      <ul className="m-0 flex list-none flex-wrap items-baseline gap-x-8 gap-y-2 border-y border-rule py-4 pl-0">
        <li className="font-mono text-xs text-muted">
          <a href="#ledger" className="text-ink no-underline hover:text-accent">
            6 apps live on the App Store
          </a>
        </li>
        <li className="font-mono text-xs text-muted">5 regions</li>
        <li className="font-mono text-xs text-muted">
          <Link
            href="/work/vehicle-safety-patent"
            className="text-ink no-underline hover:text-accent"
          >
            1 published patent · 202441049990
          </Link>
        </li>
        <li className="font-mono text-xs text-muted">
          Google Project Management Certificate · in progress
        </li>
      </ul>
    </section>
  );
}
