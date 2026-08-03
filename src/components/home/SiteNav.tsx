import Link from "next/link";

export function SiteNav() {
  return (
    <header className="mx-auto w-full max-w-6xl px-6 pt-8 md:px-10 lg:px-12">
      <Link
        href="/"
        className="font-sans text-sm text-ink no-underline hover:text-accent"
        style={{
          transitionProperty: "color",
          transitionDuration: "200ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        Leela Shankar Gurram
      </Link>
    </header>
  );
}
