"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  type Job,
  canonicalizeLocation,
  getCompanyStats,
} from "@/app/lib/jobs";
import { HeroStats } from "./HeroStats";
import { JobFilters } from "./JobFilters";
import { JobList } from "./JobList";

const COMPANY_ALIASES: Record<string, string> = {
  bloomberg: "Bloomberg Industry Group",
  nyt: "The New York Times",
  banner: "The Banner",
};

const COMPANY_SLUGS: Record<string, string> = {
  "Bloomberg Industry Group": "bloomberg",
  "The New York Times": "nyt",
  "New York Times": "nyt",
  "The Banner": "banner",
};

export function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const jobs = initialJobs;

  const [titleFilter, setTitleFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [pendingCompany, setPendingCompany] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const company = params.get("company");
    if (company) setPendingCompany(company);
  }, []);

  const filteredJobs = useMemo(
    () =>
      jobs
        .filter((job) => {
          const titleMatch = job.title
            .toLowerCase()
            .includes(titleFilter.toLowerCase().trim());
          const companyMatch = companyFilter
            ? job.company === companyFilter
            : true;
          const locationMatch = locationFilter
            ? canonicalizeLocation(job.location) === locationFilter
            : true;

          return titleMatch && companyMatch && locationMatch;
        })
        .sort((a, b) => {
          const aTime = Date.parse(a.updatedAt || a.firstPublished || "");
          const bTime = Date.parse(b.updatedAt || b.firstPublished || "");

          const aValue = Number.isNaN(aTime) ? 0 : aTime;
          const bValue = Number.isNaN(bTime) ? 0 : bTime;

          return bValue - aValue;
        }),
    [jobs, titleFilter, companyFilter, locationFilter],
  );

  const companyOptions = useMemo(
    () =>
      [...new Set(jobs.map((job) => job.company))]
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [jobs],
  );

  useEffect(() => {
    if (!pendingCompany || companyOptions.length === 0) return;
    const resolved =
      COMPANY_ALIASES[pendingCompany.toLowerCase()] ?? pendingCompany;
    const match = companyOptions.find(
      (c) => c.toLowerCase() === resolved.toLowerCase(),
    );
    if (match) setCompanyFilter(match);
    setPendingCompany("");
  }, [pendingCompany, companyOptions]);

  function handleCompanyChange(value: string) {
    setCompanyFilter(value);
    setLocationFilter("");
    setVisibleCount(20);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("company", COMPANY_SLUGS[value] ?? value.toLowerCase());
    } else {
      params.delete("company");
    }
    const url = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, "", url);
  }

  const locationOptions = useMemo(
    () =>
      [
        ...new Set(
          jobs
            .filter((job) => !companyFilter || job.company === companyFilter)
            .map((job) => canonicalizeLocation(job.location)),
        ),
      ]
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [jobs, companyFilter],
  );

  const companyStats = useMemo(() => getCompanyStats(jobs), [jobs]);

  const lastFetched = useMemo(() => {
    const raw = jobs[0]?.lastFetched;
    if (!raw) return null;
    const t = Date.parse(raw);
    if (Number.isNaN(t)) return null;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
      timeZoneName: "short",
    }).format(new Date(t));
  }, [jobs]);

  const totalCompanies = useMemo(
    () => new Set(jobs.map((job) => job.company)).size,
    [jobs],
  );

  const filtersRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const el = filtersRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setShowScrollTop(
          !entry.isIntersecting && entry.boundingClientRect.top < 0,
        ),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleCompanyClick(company: string) {
    handleCompanyChange(company);
    setTimeout(
      () => filtersRef.current?.scrollIntoView({ behavior: "smooth" }),
      0,
    );
  }

  return (
    <>
      <main className="mx-auto w-full max-w-6xl pb-8">
        <HeroStats
          companyStats={companyStats}
          lastFetched={lastFetched}
          onCompanyClick={handleCompanyClick}
          totalCompanies={totalCompanies}
          totalJobs={jobs.length}
        />
      </main>

      <div className="bg-gray-50 py-4 px-6 md:px-10">
        <div ref={filtersRef}>
          <JobFilters
            companyFilter={companyFilter}
            companyOptions={companyOptions}
            filteredCount={filteredJobs.length}
            locationFilter={locationFilter}
            locationOptions={locationOptions}
            onCompanyChange={handleCompanyChange}
            onLocationChange={(v) => {
              setLocationFilter(v);
              setVisibleCount(20);
            }}
            onTitleChange={(v) => {
              setTitleFilter(v);
              setVisibleCount(20);
            }}
            titleFilter={titleFilter}
          />
        </div>

        <JobList
          error=""
          hasMore={visibleCount < filteredJobs.length}
          jobs={filteredJobs.slice(0, visibleCount)}
          loading={false}
          onLoadMore={() => setVisibleCount((n) => n + 20)}
          remaining={filteredJobs.length - visibleCount}
        />
      </div>

      {showScrollTop && (
        <button
          aria-label="Scroll to top"
          className="fixed bottom-6 cursor-pointer right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-(--ink) text-white shadow-lg transition hover:opacity-80"
          onClick={() =>
            filtersRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </>
  );
}
