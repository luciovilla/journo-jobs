import { NextResponse } from "next/server";

import { MOCK_JOBS } from "./mock";

export async function GET() {
  const endpoint = process.env.N8N_JOBS_ENDPOINT;
  const authHeaderName = process.env.N8N_AUTH_HEADER_NAME;
  const authHeaderValue = process.env.N8N_AUTH_HEADER_VALUE;

  if (!endpoint || !authHeaderName || !authHeaderValue) {
    return NextResponse.json(MOCK_JOBS);
  }

  try {
    const upstream = await fetch(endpoint, {
      headers: {
        [authHeaderName]: authHeaderValue,
      },
      next: { revalidate: 300 },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Unable to load jobs feed." },
        { status: upstream.status },
      );
    }

    const payload: unknown = await upstream.json();

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach jobs feed." },
      { status: 502 },
    );
  }
}
