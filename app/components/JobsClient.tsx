"use client";

import { useEffect, useRef, useState } from "react";

import { useJobFilters } from "@/hooks/useJobFilters";
import type { Job } from "@/lib/jobs";
import { HeroStats } from "./HeroStats";
import { JobFilters } from "./JobFilters";
import { JobList } from "./JobList";
import { ScrollToTop } from "./ScrollToTop";

export const JobsClient = ({ initialJobs }: { initialJobs: Job[] }) => {
  const {
    titleFilter,
    setTitleFilter,
    companyFilter,
    locationFilter,
    setLocationFilter,
    visibleCount,
    setVisibleCount,
    filteredJobs,
    companyOptions,
    locationOptions,
    companyStats,
    lastFetched,
    handleCompanyChange,
  } = useJobFilters(initialJobs);

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

  const handleCompanyClick = (company: string) => {
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
          totalJobs={initialJobs.length}
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
          hasMore={visibleCount < filteredJobs.length}
          jobs={filteredJobs.slice(0, visibleCount)}
          onLoadMore={() => setVisibleCount((n) => n + 20)}
          remaining={filteredJobs.length - visibleCount}
        />
      </div>

      <ScrollToTop
        onClick={() =>
          filtersRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        show={showScrollTop}
      />
    </>
  );
}
