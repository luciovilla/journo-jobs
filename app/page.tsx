import { JobsClient } from "./components/JobsClient";
import { fetchRawJobs, parseJobs } from "./lib/jobs";

export default async function Home() {
  const data = await fetchRawJobs();
  const jobs = parseJobs(data);

  return <JobsClient initialJobs={jobs} />;
}
