"use client";

type TopperProps = {
  lastFetched: string | null;
  onScrollToFilters: () => void;
  jobCount: number;
  companyCount: number;
};

export const Topper = ({
  lastFetched,
  onScrollToFilters,
  jobCount,
  companyCount,
}: TopperProps) => {
  return (
    <section className="px-6 py-10 md:py-20 md:pb-40 md:text-center">
      <h1 className="text-lg md:text-2xl md:max-w-2xl font-medium mx-auto">
        Journalism jobs from multiple sources in one place, with extra focus on
        DC, Maryland, Virginia and New York. Updated daily.
      </h1>
      {lastFetched && (
        <p className="text-sm text-(--muted) mt-2">
          Last updated: {lastFetched}
        </p>
      )}
      <button
        className="mt-6 px-3 md:px-6 py-2 md:py-3 bg-gray-500 text-white text-xs md:text-sm font-medium rounded-full cursor-pointer hover:opacity-90 transition-opacity"
        onClick={onScrollToFilters}
        type="button"
      >
        Find your next job
      </button>
      <p className="mt-4 text-xs text-(--muted)">
        <span className="font-bold">{jobCount.toLocaleString()}</span> jobs from{" "}
        <span className="font-bold">{companyCount}</span> companies
      </p>
    </section>
  );
};
