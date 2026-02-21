import Link from "next/link";

import { Footer } from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-white text-(--ink)">
        <main className="mx-auto w-full max-w-4xl px-6 pb-16 md:px-10">
          <header className="flex items-center justify-between py-8">
            <Link
              className="text-sm font-semibold uppercase tracking-[0.16em] text-(--brand)"
              href="/"
            >
              Journalism Jobs
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-(--muted)">
              <Link className="hover:text-(--ink)" href="/job-boards">
                Job Boards
              </Link>
              <Link className="hover:text-(--ink)" href="/about">
                About
              </Link>
            </nav>
          </header>

          <section className="md:p-10">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              About
            </h1>

            <div className="mt-6 space-y-4 leading-7">
              <p>
                This site was built in response to the{" "}
                <a
                  className="text-(--brand) underline underline-offset-2"
                  href="https://www.nytimes.com/2026/02/04/business/media/washington-post-layoffs.html"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  recent layoffs at The Washington Post
                </a>
                , where more than 300 colleagues were let go. It happened so
                fast that I didn't even get to say goodbye to some of them.
              </p>
              <p>
                Building websites is what I do best, so I wanted to find a way
                to help and this is it: a focused jobs feed that aggregates
                journalism roles from various job boards, all in one place.
              </p>

              <p>
                Job listings are pulled from multiple sources once a day
                automatically, then aggregated and published here. Let me know
                if you would like additional sources to keep track.
              </p>

              <p>
                This site is open-source. If you're a software engineer and
                want to contribute, pull requests are welcome on{" "}
                <a
                  className="text-(--brand) underline underline-offset-2"
                  href="https://github.com/luciovilla/journo-jobs"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
                .
              </p>

              <p>
                Find me over at{" "}
                <a
                  className="text-(--brand) underline underline-offset-2"
                  href="https://luciovilla.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  luciovilla.com
                </a>{" "}
                or{" "}
                <a
                  className="text-(--brand) underline underline-offset-2"
                  href="mailto:me@luciovilla.com"
                >
                  send me a note
                </a>
                .
              </p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
