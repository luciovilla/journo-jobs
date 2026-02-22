import { type Job, getJobDateLabel } from "../lib/jobs";

export const JobCard = ({ job }: { job: Job }) => {
  const dateLabel = getJobDateLabel(job);

  return (
    <div
      className="grid gap-4 rounded-xl border border-(--line) bg-white p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8"
      key={job.id}
    >
      <div>
        <h2 className="text-xl font-semibold leading-tight">{job.title}</h2>
        <p className="mt-1 text-sm font-medium text-(--muted)">{job.company}</p>
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
};
