import Link from "next/link";

const navLink =
  "font-sans text-sm text-ink no-underline transition-colors duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:text-accent";

export function SiteNav() {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-6 pt-8 md:px-10 lg:px-12">
      <Link href="/" className={navLink}>
        Leela Shankar Gurram
      </Link>

      <nav
        aria-label="Site"
        className="flex flex-wrap items-baseline gap-x-5 gap-y-1"
      >
        <Link href="/about" className={navLink}>
          About
        </Link>
        <Link href="/resume" className={navLink}>
          Resume
        </Link>
        <a
          href="https://linkedin.com/in/leela-shankar-gurram"
          target="_blank"
          rel="noopener noreferrer"
          className={navLink}
        >
          LinkedIn
        </a>
        <a
          href="mailto:leelashankargurram@gmail.com"
          className="font-sans text-sm no-underline underline-offset-4 hover:underline"
        >
          leelashankargurram@gmail.com
        </a>
      </nav>
    </header>
  );
}
