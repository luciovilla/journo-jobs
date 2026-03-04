"use client";

import { NEW_JOB_DAYS } from "@/lib/jobs";

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
  newOnlyFilter: boolean;
  onTitleChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onCompanyStatClick: (company: string) => void;
  onNewOnlyChange: (value: boolean) => void;
};

export const JobFilters = ({
  titleFilter,
  companyFilter,
  locationFilter,
  locationOptions,
  companyStats,
  newOnlyFilter,
  onTitleChange,
  onLocationChange,
  onCompanyStatClick,
  onNewOnlyChange,
}: JobFiltersProps) => {
  return (
    <section className="mx-auto max-w-4xl rounded-3xl border border-(--line) bg-white p-5 md:p-6">
      <div className="grid gap-3 md:grid-cols-3">
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
            Company
          </span>
          <select
            className="h-11 rounded-xl border border-(--line) px-3 text-sm outline-none transition focus:border-(--brand)"
            onChange={(event) => onCompanyStatClick(event.target.value)}
            value={companyFilter}
          >
            <option value="">All companies</option>
            {companyStats.map(({ company, count }) => (
              <option key={company} value={company}>
                {company} ({count})
              </option>
            ))}
          </select>
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

      <div className="mt-3">
        <button
          className={`rounded-full cursor-pointer px-3 py-2 text-xs font-semibold transition-colors ${newOnlyFilter ? "bg-(--brand) text-white" : "border border-(--line) text-(--muted) hover:border-(--brand) hover:text-(--brand)"}`}
          onClick={() => onNewOnlyChange(!newOnlyFilter)}
          type="button"
        >
          New only (last {NEW_JOB_DAYS} days)
        </button>
      </div>
    </section>
  );
};
