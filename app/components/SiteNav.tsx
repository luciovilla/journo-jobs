import Link from "next/link";

export const SiteNav = () => {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="flex justify-end items-center px-6 py-8 md:px-10">
        <nav className="flex items-center gap-6 text-sm font-medium text-(--muted)">
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
      </header>
    </div>
  );
}
