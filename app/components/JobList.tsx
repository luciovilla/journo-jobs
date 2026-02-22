import { type Job, getJobDateLabel } from "../lib/jobs";
import { LoadMoreButton } from "./LoadMoreButton";

type JobListProps = {
  jobs: Job[];
  hasMore?: boolean;
  remaining?: number;
  onLoadMore?: () => void;
};

export const JobList = ({
  jobs,
  hasMore,
  remaining,
  onLoadMore,
}: JobListProps) => {
  return (
    <section className="mt-8" id="jobs">
      <div className="mx-auto max-w-2xl space-y-10 py-10">
        {jobs.length === 0 && (
          <div className="rounded-2xl border border-(--line) bg-white p-6 text-sm text-(--muted)">
            No jobs matched your filters.
          </div>
        )}

        {jobs.map((job) => {
          const dateLabel = getJobDateLabel(job);

          return (
            <div
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
            </div>
          );
        })}
        {hasMore && (
          <LoadMoreButton onLoadMore={onLoadMore} remaining={remaining} />
        )}
      </div>
    </section>
  );
}
