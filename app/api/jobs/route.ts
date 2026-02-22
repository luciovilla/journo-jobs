import { NextResponse } from "next/server";

import { fetchRawJobs } from "@/lib/jobs";

export async function GET() {
  try {
    const payload = await fetchRawJobs();
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: "Unable to reach jobs feed." },
      { status: 502 },
    );
  }
}
