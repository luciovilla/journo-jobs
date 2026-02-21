type CompanyStat = {
  company: string;
  count: number;
};

type HeroStatsProps = {
  totalJobs: number;
  totalCompanies: number;
  companyStats: CompanyStat[];
  lastFetched: string | null;
  onCompanyClick: (company: string) => void;
};

export function HeroStats({
  totalJobs,
  totalCompanies,
  companyStats,
  lastFetched,
  onCompanyClick,
}: HeroStatsProps) {
  return (
    <section className="px-6 py-10 md:px-10 md:py-14 min-h-svh">
      <p className="text-sm font-medium uppercase text-(--brand)">
        Updated daily
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
        Journalism Jobs
      </h1>
      <p
        className={`mt-2 text-sm text-(--muted) ${lastFetched ? "" : "invisible"}`}
      >
        Last updated {lastFetched ?? "—"}
      </p>
      <p className="mt-5 max-w-2xl text-base leading-7 text-(--muted) md:text-lg">
        Search current roles from multiple sources in one place, with extra
        focus on Washington, DC, Maryland, Virginia and New York.
      </p>

      <div
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        id="companies"
      >
        <article className="rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wide text-(--muted)">
            Total jobs
          </p>
          <p className="text-3xl font-bold">{totalJobs}</p>
        </article>
        <article className="rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wide text-(--muted)">
            Companies
          </p>
          <p className="text-3xl font-bold">{totalCompanies}</p>
        </article>
        <article className="rounded-2xl p-4 sm:col-span-2">
          <p className="text-xs uppercase tracking-wide text-(--muted)">
            Company counts
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {companyStats.map(({ company, count }) => (
              <button
                className="cursor-pointer rounded-full bg-gray-50 px-3 py-1.5 text-xs font-semibold transition hover:bg-(--brand) hover:text-white"
                key={company}
                onClick={() => onCompanyClick(company)}
                type="button"
              >
                {company} ({count})
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
