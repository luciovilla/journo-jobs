import Link from "next/link";

import { Footer } from "../components/Footer";

const JOB_BOARDS = [
  {
    name: "Axios",
    url: "https://job-boards.greenhouse.io/axios",
  },
  {
    name: "The Baltimore Banner",
    url: "https://job-boards.greenhouse.io/thebaltimorebanner",
  },
  {
    name: "Bloomberg Industry Group",
    url: "https://bloomberg.wd1.myworkdayjobs.com/en-US/Bloombergindustrygroup_External_Career_Site",
  },
  {
    name: "City Cast",
    url: "https://apply.workable.com/city-cast/",
  },
  {
    name: "Committee to Protect Journalists",
    url: "https://cpjorg.bamboohr.com/careers",
  },
  {
    name: "Commonwealth Beacon",
    url: "https://commonwealthbeacon.org/job-board/",
  },
  {
    name: "Condé Nast",
    url: "https://condenast.wd5.myworkdayjobs.com/CondeCareers?locationCountry=bc33aa3152ec42d4995f4791a106ed09",
  },
  {
    name: "The Guardian",
    url: "https://workwithus.theguardian.com/job-search",
  },
  {
    name: "The Marshall Project",
    url: "https://www.themarshallproject.org/jobs",
  },
  {
    name: "MediaNews Group",
    url: "https://myworkdaycenter.wd5.myworkdayjobs.com/MNG",
  },
  {
    name: "More Perfect Union",
    url: "https://more-perfect-union-action.rippling-ats.com/",
  },
  {
    name: "The New York Times",
    url: "https://www.nytco.com/careers/job-listings/?department=journalism",
  },
  {
    name: "Philadelphia Inquirer",
    url: "https://inquirer.rec.pro.ukg.net/PHI1500PHILI/JobBoard/7dc63c3a-f663-4d44-893e-7372f75ba534/?q=&o=postedDateDesc",
  },
  {
    name: "Politico",
    url: "https://politico.wd108.myworkdayjobs.com/en-US/politico/",
  },
  {
    name: "ProPublica",
    url: "https://job-boards.greenhouse.io/propublica",
  },
  {
    name: "Semafor",
    url: "https://job-boards.greenhouse.io/semafor/",
  },
  {
    name: "Warner Bros. Discovery (CNN, Bleacher Report)",
    url: "https://careers.wbd.com/global/en/search-results",
  },
  {
    name: "Wall Street Journal",
    url: "https://wsj.jobs/job-category/editorialjournalism/jobs/",
  },
];

export default function JobBoardsPage() {
  return (
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
            <Link className="text-(--ink)" href="/job-boards">
              Job Boards
            </Link>
            <Link className="hover:text-(--ink)" href="/about">
              About
            </Link>
          </nav>
        </header>

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
      <Footer />
    </div>
  );
}
