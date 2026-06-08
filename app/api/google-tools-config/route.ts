import { NextRequest, NextResponse } from 'next/server';

function value(name: string): string {
  return (process.env[name] || '').trim();
}

function boolValue(name: string, fallback: boolean): boolean {
  const raw = value(name).toLowerCase();
  if (!raw) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(raw);
}

export async function GET(req: NextRequest) {
  if (req.headers.get('x-rozana-config-request') !== 'google-tools') {
    return NextResponse.json({ ok: false }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  return NextResponse.json(
    {
      primaryDomain: value('NEXT_PUBLIC_PRIMARY_DOMAIN') || 'https://rozanabi.com',
      wwwDomain: value('NEXT_PUBLIC_WWW_DOMAIN') || 'https://www.rozanabi.com',
      gtmContainerId: value('NEXT_PUBLIC_GTM_CONTAINER_ID'),
      ga4MeasurementId: value('NEXT_PUBLIC_GA4_MEASUREMENT_ID'),
      googleAdsConversionId: value('NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID'),
      consentStorageKey: value('NEXT_PUBLIC_COOKIE_CONSENT_STORAGE_KEY') || 'rz-cookie-consent-v54-83',
      requireCookieConsent: boolValue('NEXT_PUBLIC_REQUIRE_COOKIE_CONSENT', true),
      loadMode: value('NEXT_PUBLIC_GOOGLE_TOOLS_LOAD_MODE') || 'gtm_preferred',
      debug: boolValue('NEXT_PUBLIC_GOOGLE_TOOLS_DEBUG', false),
    },
    { headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' } }
  );
}
