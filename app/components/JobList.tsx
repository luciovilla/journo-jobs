import type { Job } from "../lib/jobs";
import { JobCard } from "./JobCard";
import { LoadMoreButton } from "./LoadMoreButton";

type JobListProps = {
  jobs: Job[];
  filteredCount: number;
  hasMore?: boolean;
  remaining?: number;
  onLoadMore?: () => void;
};

export const JobList = ({
  jobs,
  filteredCount,
  hasMore,
  remaining,
  onLoadMore,
}: JobListProps) => {
  return (
    <section id="jobs">
      <div className="mx-auto max-w-2xl space-y-10 pt-10 pb-20">
        <p className="text-sm w-full text-center text-(--muted)">
          {filteredCount} jobs
        </p>
        {jobs.length === 0 && (
          <div className="rounded-2xl border border-(--line) bg-white p-6 text-sm text-(--muted)">
            No jobs matched your filters.
          </div>
        )}

        {jobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}

        {hasMore && (
          <LoadMoreButton onLoadMore={onLoadMore} remaining={remaining} />
        )}
      </div>
    </section>
  );
};
