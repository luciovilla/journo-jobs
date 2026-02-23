"use client";

import { useEffect, useMemo, useState } from "react";

import { COMPANY_ALIASES, COMPANY_SLUGS } from "@/lib/companies";
import { type Job, getCompanyStats } from "@/lib/jobs";

export function useJobFilters(jobs: Job[]) {
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

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        const titleMatch = job.title
          .toLowerCase()
          .includes(titleFilter.toLowerCase().trim());
        const companyMatch = companyFilter
          ? job.company === companyFilter
          : true;
        const locationMatch = locationFilter
          ? job.canonicalLocation === locationFilter
          : true;

        return titleMatch && companyMatch && locationMatch;
      }),
    [jobs, titleFilter, companyFilter, locationFilter],
  );

  const locationOptions = useMemo(
    () =>
      [
        ...new Set(
          jobs
            .filter((job) => !companyFilter || job.company === companyFilter)
            .map((job) => job.canonicalLocation),
        ),
      ]
        .filter(Boolean)
        .sort((a, b) => {
          const tail = new Set(["Remote", "Location not listed"]);
          const aLast = tail.has(a) || a.toLowerCase().includes("location");
          const bLast = tail.has(b) || b.toLowerCase().includes("location");
          if (aLast !== bLast) return aLast ? 1 : -1;
          return a.localeCompare(b);
        }),
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

  function clearFilters() {
    setTitleFilter("");
    setCompanyFilter("");
    setLocationFilter("");
    setVisibleCount(20);
    const url = window.location.pathname;
    window.history.replaceState(null, "", url);
  }

  return {
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
    clearFilters,
  };
}
