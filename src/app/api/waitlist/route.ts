import { NextResponse } from 'next/server';
import { z } from 'zod';

const waitlistPayloadSchema = z.object({
  email: z.string().trim().email(),
  host: z.string().trim().min(1),
});

type WaitlistSubmissionResponse = {
  success: boolean;
  message?: string;
};

const jsonResponse = (body: WaitlistSubmissionResponse, status = 200) =>
  NextResponse.json(body, { status });

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ success: false, message: 'Invalid JSON body' }, 400);
  }

  const parsed = waitlistPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ success: false, message: 'Invalid email or host' }, 400);
  }

  const upstreamUrl = process.env.WAITLIST_UPSTREAM_URL;
  if (upstreamUrl) {
    try {
      const upstreamResponse = await fetch(upstreamUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const upstreamData = (await upstreamResponse.json()) as WaitlistSubmissionResponse;
      return jsonResponse(upstreamData, upstreamResponse.status);
    } catch {
      return jsonResponse(
        { success: false, message: 'Waitlist submission failed' },
        502,
      );
    }
  }

  return jsonResponse({ success: true });
}
