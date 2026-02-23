"use client";

import { useEffect, useRef, useState } from "react";

import { useJobFilters } from "@/hooks/useJobFilters";
import type { Job } from "@/lib/jobs";
import { JobFilters } from "./JobFilters";
import { JobList } from "./JobList";
import { ScrollToTop } from "./ScrollToTop";
import { Topper } from "./Topper";

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

  return (
    <>
      <Topper
        companyCount={companyStats.length}
        jobCount={initialJobs.length}
        lastFetched={lastFetched}
        onScrollToFilters={() =>
          filtersRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <div className="py-4 px-6 md:px-10 min-h-svh">
        <div ref={filtersRef} tabIndex={-1}>
          <JobFilters
            companyFilter={companyFilter}
            companyStats={companyStats}
            locationFilter={locationFilter}
            locationOptions={locationOptions}
            onCompanyStatClick={(c) => {
              handleCompanyChange(c === companyFilter ? "" : c);
              filtersRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
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
          filteredCount={filteredJobs.length}
          hasMore={visibleCount < filteredJobs.length}
          jobs={filteredJobs.slice(0, visibleCount)}
          onLoadMore={() => setVisibleCount((n) => n + 20)}
          remaining={filteredJobs.length - visibleCount}
        />
      </div>

      <ScrollToTop
        onClick={() => {
          filtersRef.current?.scrollIntoView();
        }}
        show={showScrollTop}
      />
    </>
  );
};
