import { type Job, getJobDateLabel } from "../lib/jobs";

type JobListProps = {
  jobs: Job[];
  loading: boolean;
  error: string;
  hasMore?: boolean;
  remaining?: number;
  onLoadMore?: () => void;
};

export function JobList({
  jobs,
  loading,
  error,
  hasMore,
  remaining,
  onLoadMore,
}: JobListProps) {
  return (
    <section className="mt-8" id="jobs">
      <div className="mx-auto max-w-2xl space-y-10 py-10">
        {loading && (
          <article className="rounded-2xl border border-(--line) bg-white p-6 text-sm text-(--muted)">
            Loading jobs...
          </article>
        )}

        {!loading && error && (
          <article className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
            {error}
          </article>
        )}

        {!loading && !error && jobs.length === 0 && (
          <article className="rounded-2xl border border-(--line) bg-white p-6 text-sm text-(--muted)">
            No jobs matched your filters.
          </article>
        )}

        {!loading &&
          !error &&
          jobs.map((job) => {
            const dateLabel = getJobDateLabel(job);

            return (
              <article
                className="grid gap-4 rounded-xl border border-(--line) bg-white p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8"
                key={job.id}
              >
                <div>
                  <h2 className="text-xl font-semibold leading-tight">
                    {job.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-(--muted)">
                    {job.company}
                  </p>
                  <p className="mt-2 text-sm text-(--muted)">{job.location}</p>
                  {dateLabel && (
                    <p className="mt-1 text-xs text-(--muted)">{dateLabel}</p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 md:block md:text-right">
                  {job.url ? (
                    <a
                      className="mt-3 inline-flex h-10 items-center rounded-full bg-(--panel) px-4 text-sm font-semibold hover:text-white hover:bg-(--brand)/50"
                      href={job.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      View job
                    </a>
                  ) : (
                    <span className="mt-3 inline-flex h-10 items-center rounded-full border border-(--line) px-4 text-sm text-(--muted)">
                      Link unavailable
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        {hasMore && (
          <button
            className="w-full rounded-full border border-(--line) bg-white py-3 text-sm font-medium text-(--muted) hover:bg-(--panel) transition"
            onClick={onLoadMore}
            type="button"
          >
            Load 20 more ({remaining} remaining)
          </button>
        )}
      </div>
    </section>
  );
}
