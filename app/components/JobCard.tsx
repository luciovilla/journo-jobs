"use client";

import { useState } from "react";

import { type Job, getJobDateLabel } from "../lib/jobs";

export const JobCard = ({ job }: { job: Job }) => {
  const dateLabel = getJobDateLabel(job);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = job.url ?? window.location.href;
    const shareData = {
      title: job.title,
      text: `${job.title} at ${job.company}`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid gap-4 rounded-xl border border-(--line) bg-white p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
      <div>
        <h2 className="text-xl font-semibold leading-tight">{job.title}</h2>
        <p className="mt-1 text-sm font-medium text-(--muted)">{job.company}</p>
        <p className="mt-2 text-sm text-(--muted)">{job.location}</p>
        {dateLabel && (
          <p className="mt-1 text-xs text-(--muted)">{dateLabel}</p>
        )}
      </div>

      <div className="flex items-center gap-2 md:flex-col md:items-end">
        {job.url ? (
          <a
            className="inline-flex h-10 items-center rounded-full bg-(--panel) px-4 text-sm font-semibold hover:text-white hover:bg-(--brand)/50"
            href={job.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            View job
          </a>
        ) : (
          <span className="inline-flex h-10 items-center rounded-full border border-(--line) px-4 text-sm text-(--muted)">
            Link unavailable
          </span>
        )}
        <button
          className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm text-(--muted) hover:bg-(--panel) transition-colors cursor-pointer"
          onClick={handleShare}
          title="Share job"
          type="button"
        >
          {copied ? (
            <>
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
              >
                <title>Copied</title>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
              >
                <title>Share</title>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
              Share
            </>
          )}
        </button>
      </div>
    </div>
  );
};
