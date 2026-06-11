import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

export const runtime = 'nodejs';

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64url');
}

function getSecret() {
  const secret = process.env.CONTACT_CSRF_SECRET || process.env.NEXTAUTH_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') throw new Error('CONTACT_CSRF_SECRET is not configured.');
  return 'rozana-local-dev-secret-change-me';
}

export async function GET() {
  let secret: string;
  try {
    secret = getSecret();
  } catch (error) {
    console.error('Rozana CSRF configuration error:', error instanceof Error ? error.message : 'Unknown configuration error');
    return NextResponse.json(
      { ok: false, message: 'The contact form is not fully configured. Please email contact@rozanabi.com directly.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
  const ts = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${ts}.${nonce}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return NextResponse.json({ csrfToken: base64url(`${payload}.${sig}`) }, { headers: { 'Cache-Control': 'no-store' } });
}
