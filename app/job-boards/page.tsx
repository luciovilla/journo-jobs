import type { Metadata } from "next";

import { JOB_BOARDS } from "@/lib/job-boards";

export const metadata: Metadata = {
  title: "Job Boards — Journalism Jobs",
  description: "Journalism job boards worth bookmarking.",
};

export default function JobBoardsPage() {
  return (
    <div className="text-(--ink)">
      <main className="mx-auto w-full max-w-4xl px-6 pb-16 md:px-10">
        <section className="md:p-10">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Job Boards
          </h1>
          <p className="mt-4 text-base leading-7 text-(--muted)">
            List of journalism job boards worth bookmarking.
          </p>

          <ul className="mt-10 divide-y divide-(--line)">
            {JOB_BOARDS.map(({ name, url }) => (
              <li key={name}>
                <a
                  className="flex items-center justify-between py-4 group"
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="font-medium group-hover:text-(--brand) transition-colors">
                    {name}
                  </span>
                  <svg
                    aria-hidden="true"
                    className="text-(--muted) group-hover:text-(--brand) transition-colors"
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
