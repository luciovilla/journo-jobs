import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-(--line) px-6 py-8 md:px-10">
      <div className="mx-auto max-w-6xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-(--muted)">
        <p>
          Built by{" "}
          <a
            className="font-medium text-(--ink) hover:underline"
            href="https://www.luciovilla.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Lucio Villa
          </a>
        </p>
        <nav className="flex gap-5">
          <Link className="hover:text-(--ink)" href="/">
            Jobs
          </Link>
          <Link className="hover:text-(--ink)" href="/job-boards">
            More Sources
          </Link>
          <Link className="hover:text-(--ink)" href="/about">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
