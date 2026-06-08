# Rozana Website - Next.js Static Bridge v54.91.0

This build keeps the approved Rozana static pages in `public/` and adds Next.js API routes for the contact form. It includes production security, SEO, cookie consent, mobile UX polish, demo-page previews, footer refinements, and Vercel build-warning cleanup.

## Required Vercel Environment Variables

```env
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=465
ZOHO_SMTP_USER=contact@rozanabi.com
ZOHO_SMTP_PASS=your-zoho-app-password
CONTACT_TO_EMAIL=contact@rozanabi.com
CONTACT_FROM_EMAIL=Rozana Website <contact@rozanabi.com>
CONTACT_CSRF_SECRET=use-a-long-random-secret
CONTACT_RATE_LIMIT_MAX=8
TURNSTILE_SECRET_KEY=your-cloudflare-turnstile-secret-key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-cloudflare-turnstile-site-key
NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_TOOLS_LOAD_MODE=gtm_preferred
NEXT_PUBLIC_GOOGLE_TOOLS_DEBUG=false
NEXT_PUBLIC_REQUIRE_COOKIE_CONSENT=true
NEXT_PUBLIC_COOKIE_CONSENT_STORAGE_KEY=rz-cookie-consent
NEXT_PUBLIC_PRIMARY_DOMAIN=https://rozanabi.com
NEXT_PUBLIC_WWW_DOMAIN=https://www.rozanabi.com
```

After adding or editing environment variables in Vercel, redeploy the project.

## Production Notes

- Keep `CONTACT_CSRF_SECRET` and `TURNSTILE_SECRET_KEY` configured in production. The form intentionally fails closed if either is missing.
- Keep the `package-lock.json` file committed so Vercel installs reproducible dependencies.
- The package allows Node.js `>=20 <25`. The current Vercel project setting can use Node.js `24.x`; local testing also passed on the available Node runtime.
- Security headers are enabled in `next.config.mjs`. CSP is enforced, not Report-Only.
- For stronger form abuse protection, keep Cloudflare Turnstile enabled and add Cloudflare WAF/rate-limit rules at the domain level.


## v54.77 production polish

- Contact form now posts directly to `/api/contact` and fetches CSRF from `/api/csrf`.
- Remote Google Fonts links were removed from HTML; `assets/css/fonts-local.css` now uses local font detection and system fallbacks.
- The embedded SEO dashboard snapshot was regenerated from the current static pages.
- Remaining non-English copy on the English landing page service was corrected.

## v54.78 update
- Mobile UX polish added via `public/assets/css/mobile-polish.css`.
- Demo page cards now use local static preview images instead of iframe previews.
- All demo pages now include a fixed return button back to `/landing-page-oman#demo-pages`.


## v54.80 update
- ROZANA wordmark text is bolder across header/footer SVG logos.
- Mobile menu no longer shows the default blue focus box; menu items now reveal with a stepped glow/cascade effect.
- Contact page “Start a Conversation” scrolls to the form without adding `#contact` to the address bar.
- `next.config.ts` was converted to `next.config.mjs` to avoid Vercel installing TypeScript only to load the config file.
- Node engine range now allows Vercel Node 24.x project settings.
- Home mobile hero alignment and layout jumping were tightened.
- Footer legal/copyright alignment was restored for desktop and improved for mobile.
- Cookie modal hover styling keeps “Save Choices” readable.
- Demo card preview images remain local and represent each demo layout.

## v54.90 update
- Updated project/package version references to `54.90.0`.
- Tightened landing-page mobile hero CTA spacing.
- Standardized the header Get in Touch CTA size.
- Reduced the visual gap inside the Rozana logo lockup and aligned the Brand Element wordmark typography with the main logo.


## v54.91 update
- Re-checked the mobile Landing Page Design hero against the Services-page mobile header rhythm.
- Removed the landing hero mobile min-height/min-content behavior that created a large blank gap between copy and CTAs.
- Locked landing mobile hero copy and CTA stack to normal document flow with explicit `min-height:0`, `height:auto`, and close `gap` values.
- Standardized `Get in Touch` CTA sizing for the home CTA panel and desktop header CTA sizing.
- Added CSS cache-busting query strings to public HTML links for the v54.91 stylesheet pass.
