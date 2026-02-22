import { MOCK_JOBS } from "@/api/jobs/mock";

export async function fetchRawJobs(): Promise<unknown> {
  const endpoint = process.env.N8N_JOBS_ENDPOINT;
  const authHeaderName = process.env.N8N_AUTH_HEADER_NAME;
  const authHeaderValue = process.env.N8N_AUTH_HEADER_VALUE;

  if (!endpoint || !authHeaderName || !authHeaderValue) {
    return MOCK_JOBS;
  }

  const upstream = await fetch(endpoint, {
    headers: { [authHeaderName]: authHeaderValue },
    signal: AbortSignal.timeout(10_000),
  });

  if (!upstream.ok) {
    throw new Error(`Jobs feed returned ${upstream.status}`);
  }

  return upstream.json();
}

export type RawJob = {
  id?: number | string | null;
  url?: string | null;
  company?: string | null;
  location?: string | null;
  updated_at?: string | null;
  first_published?: string | null;
  title?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  [key: string]: unknown;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  canonicalLocation: string;
  url: string;
  updatedAt?: string | null;
  firstPublished?: string;
  lastFetched?: string | null;
};

function pickString(source: RawJob, keys: string[], fallback = ""): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return fallback;
}

function pickId(source: RawJob, keys: string[], fallback: string): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }
  return fallback;
}

function toArray(payload: unknown): RawJob[] {
  if (Array.isArray(payload)) {
    return payload.filter((item): item is RawJob =>
      Boolean(item && typeof item === "object"),
    );
  }

  if (!payload || typeof payload !== "object") {
    return [];
  }

  const obj = payload as Record<string, unknown>;
  const candidates = [
    "jobs",
    "data",
    "results",
    "items",
    "listings",
    "records",
  ];

  for (const key of candidates) {
    const value = obj[key];
    if (Array.isArray(value)) {
      return value.filter((item): item is RawJob =>
        Boolean(item && typeof item === "object"),
      );
    }
  }

  return [];
}

function normalizeJob(raw: RawJob, index: number): Job {
  const id = pickId(raw, ["id", "jobId", "uuid", "slug"], `job-${index}`);
  const title = pickString(
    raw,
    ["title", "jobTitle", "position", "role", "name"],
    "Untitled role",
  );
  const company = pickString(
    raw,
    ["company", "companyName", "employer", "organization"],
    "Unknown company",
  );
  const city = pickString(raw, ["city"]);
  const state = pickString(raw, ["state", "region"]);
  const country = pickString(raw, ["country"]);

  const fallbackLocation = [city, state, country].filter(Boolean).join(", ");
  const location = pickString(
    raw,
    ["location", "jobLocation", "place"],
    fallbackLocation || "Location not listed",
  );

  const url = pickString(raw, [
    "url",
    "jobUrl",
    "link",
    "applyUrl",
    "apply_link",
  ]);

  const updatedAt = raw.updated_at;
  const firstPublished = pickString(raw, ["first_published", "firstPublished"]);
  const lastFetched = typeof raw.updatedAt === "string" ? raw.updatedAt : null;

  return {
    id,
    title,
    company,
    location,
    canonicalLocation: canonicalizeLocation(location),
    url,
    updatedAt,
    firstPublished,
    lastFetched,
  };
}

function formatTimestamp(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function getJobDateLabel(job: Job): string {
  if (job.updatedAt) {
    return `Updated ${formatTimestamp(job.updatedAt)}`;
  }

  if (job.firstPublished) {
    return `Posted ${formatTimestamp(job.firstPublished)}`;
  }

  return "";
}

export function canonicalizeLocation(location: string): string {
  const normalized = location
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/,\s*/g, ", ")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (normalized.includes("remote")) {
    return "Remote";
  }

  if (
    normalized.includes("district of columbia") ||
    (normalized.includes("washington") && normalized.includes("dc"))
  ) {
    return "Washington, DC";
  }

  if (
    normalized.includes("baltimore") &&
    (normalized.includes(" md") ||
      normalized.includes(", md") ||
      normalized.includes("maryland"))
  ) {
    return "Baltimore, MD";
  }

  if (normalized.includes("maryland")) {
    return "Maryland";
  }

  if (normalized.includes("london")) {
    return "London, UK";
  }

  if (normalized.includes("philadelphia")) {
    return "Philadelphia, PA";
  }

  if (normalized.includes("arlington")) {
    return "Arlington, VA";
  }

  if (normalized.includes("virginia")) {
    return "Virginia";
  }

  if (normalized.includes("new york")) {
    return "New York";
  }

  if (normalized.includes("atlanta")) {
    return "Atlanta, GA";
  }

  return location.trim() || "Location not listed";
}

export function parseJobs(payload: unknown): Job[] {
  return toArray(payload)
    .map(normalizeJob)
    .sort((a, b) => {
      const aTime = Date.parse(a.updatedAt || a.firstPublished || "");
      const bTime = Date.parse(b.updatedAt || b.firstPublished || "");
      const aValue = Number.isNaN(aTime) ? 0 : aTime;
      const bValue = Number.isNaN(bTime) ? 0 : bTime;
      return bValue - aValue;
    });
}

export function getCompanyStats(
  jobs: Job[],
): Array<{ company: string; count: number }> {
  const counts = new Map<string, number>();

  for (const job of jobs) {
    const current = counts.get(job.company) ?? 0;
    counts.set(job.company, current + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([company, count]) => ({ company, count }));
}
