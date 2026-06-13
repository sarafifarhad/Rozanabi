import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  if (req.headers.get('x-rozana-config-request') !== 'contact') {
    return NextResponse.json({ ok: false }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  return NextResponse.json(
    { turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '' },
    { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } }
  );
}
