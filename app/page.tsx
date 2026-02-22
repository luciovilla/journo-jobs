import { JobsClient } from "./components/JobsClient";
import { fetchRawJobs, parseJobs } from "./lib/jobs";

export default async function Home() {
  try {
    const data = await fetchRawJobs();
    const jobs = parseJobs(data);
    return <JobsClient initialJobs={jobs} />;
  } catch {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
        <p className="text-lg font-medium text-(--muted)">
          Unable to load jobs right now. Please try again later.
        </p>
      </main>
    );
  }
}
