type JobFiltersProps = {
  titleFilter: string;
  companyFilter: string;
  locationFilter: string;
  companyOptions: string[];
  locationOptions: string[];
  filteredCount: number;
  onTitleChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onLocationChange: (value: string) => void;
};

export function JobFilters({
  titleFilter,
  companyFilter,
  locationFilter,
  companyOptions,
  locationOptions,
  filteredCount,
  onTitleChange,
  onCompanyChange,
  onLocationChange,
}: JobFiltersProps) {
  return (
    <section className="mx-auto -mt-20 max-w-4xl rounded-3xl border border-(--line) bg-white p-5 md:p-6">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-(--muted)">
            Job title
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
            onChange={(event) => onCompanyChange(event.target.value)}
            value={companyFilter}
          >
            <option value="">All companies</option>
            {companyOptions.map((company) => (
              <option key={company} value={company}>
                {company}
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
      <p className="mt-3 text-sm text-(--muted)">
        Showing {filteredCount} jobs
      </p>
    </section>
  );
}
