"use client";

import { useState } from "react";

type CompanyStat = {
  company: string;
  count: number;
};

type JobFiltersProps = {
  titleFilter: string;
  companyFilter: string;
  locationFilter: string;
  locationOptions: string[];
  companyStats: CompanyStat[];
  onTitleChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onCompanyStatClick: (company: string) => void;
  onClearFilters: () => void;
};

export const JobFilters = ({
  titleFilter,
  companyFilter,
  locationFilter,
  locationOptions,
  companyStats,
  onTitleChange,
  onLocationChange,
  onCompanyStatClick,
  onClearFilters,
}: JobFiltersProps) => {
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const hasFilters =
    titleFilter !== "" || companyFilter !== "" || locationFilter !== "";

  const visibleStats = showAllCompanies ? companyStats : companyStats.slice(0, 10);
  const hasMore = companyStats.length > 10;

  return (
    <section className="mx-auto max-w-4xl rounded-3xl border border-(--line) bg-white p-5 md:p-6">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-(--muted)">
            Title
          </span>
          <input
            className="h-11 rounded-xl border border-(--line) px-3 text-sm outline-none transition focus:border-(--brand)"
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Reporter, Editor, Producer..."
            value={titleFilter}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-(--muted)">
            Location
          </span>
          <select
            className="h-11 rounded-xl border border-(--line) px-3 text-sm outline-none transition focus:border-(--brand)"
            onChange={(event) => onLocationChange(event.target.value)}
            value={locationFilter}
          >
            <option value="">All locations</option>
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 items-center">
        {visibleStats.map(({ company, count }) => {
          const isActive = companyFilter === company;
          return (
            <button
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-(--brand) ${
                isActive
                  ? "bg-(--brand) text-white"
                  : "hover:bg-(--brand) hover:text-white"
              }`}
              key={company}
              onClick={() => onCompanyStatClick(company)}
              type="button"
            >
              {company} ({count})
            </button>
          );
        })}
        {hasMore && (
          <button
            className="text-xs text-(--muted) hover:text-(--brand) hover:underline cursor-pointer transition"
            onClick={() => setShowAllCompanies((v) => !v)}
            type="button"
          >
            {showAllCompanies ? "Show less" : `+${companyStats.length - 10} more`}
          </button>
        )}
      </div>

      {hasFilters && (
        <div className="mt-3 flex justify-center">
          <button
            className="text-sm text-(--brand) hover:underline cursor-pointer"
            onClick={onClearFilters}
            type="button"
          >
            × Clear filters
          </button>
        </div>
      )}
    </section>
  );
};
