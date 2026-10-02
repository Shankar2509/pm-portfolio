import Image from "next/image";
import Link from "next/link";
import { shippedApps } from "@/data/apps";

/**
 * Evidence row, ledger-styled: every item is checkable, none is a bare
 * stat counter. Sits between the hero and the globe.
 */
export function ProofStrip() {
  return (
    <section
      aria-label="Verifiable record"
      className="w-full border-y border-rule-gold bg-surface"
    >
      <ul className="mx-auto flex w-full max-w-6xl list-none flex-wrap items-center gap-x-8 gap-y-2 px-6 py-5 md:px-10 lg:px-12">
        <li className="font-mono text-xs text-muted">
          <a
            href="#ledger"
            className="group flex items-center gap-3 text-ink no-underline hover:text-accent"
          >
            {/* The actual App Store artwork — evidence, not decoration. */}
            <span className="flex shrink-0">
              {shippedApps.map((app, index) => (
                <Image
                  key={app.href}
                  src={app.icon}
                  alt=""
                  width={20}
                  height={20}
                  className={`h-5 w-5 rounded-[22%] border border-rule object-cover ${
                    index > 0 ? "-ml-1.5" : ""
                  }`}
                />
              ))}
            </span>
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
