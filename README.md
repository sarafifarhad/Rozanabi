# Rozana Website - Next.js Static Bridge v54.77.0

This build keeps the approved Rozana static pages in `public/` and adds Next.js API routes for the contact form. It also includes the v54.77 production-readiness fixes: real App Router 404 handling, root `/` rewrite without redirect, permanent clean-route redirects, `www` to apex-domain redirect, security headers, production fail-closed CSRF and Turnstile checks, cookie preference updates, demo-page Cookie Settings controls, typography cleanup, and homepage hero image priority cleanup.

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
NEXT_PUBLIC_COOKIE_CONSENT_STORAGE_KEY=rz-cookie-consent-v54-77
NEXT_PUBLIC_PRIMARY_DOMAIN=https://rozanabi.com
NEXT_PUBLIC_WWW_DOMAIN=https://www.rozanabi.com
```

After adding or editing environment variables in Vercel, redeploy the project.

## Production Notes

- Keep `CONTACT_CSRF_SECRET` and `TURNSTILE_SECRET_KEY` configured in production. The form intentionally fails closed if either is missing.
- Keep the `package-lock.json` file committed so Vercel installs reproducible dependencies.
- The project targets Node.js `20.x`; set the same runtime in Vercel.
- Security headers are enabled in `next.config.ts`. CSP is currently `Report-Only` so it can be monitored before switching to enforcing mode.
- For stronger form abuse protection, keep Cloudflare Turnstile enabled and add Cloudflare WAF/rate-limit rules at the domain level.


## v54.77 production polish

- Contact form now posts directly to `/api/contact` and fetches CSRF from `/api/csrf`.
- Remote Google Fonts links were removed from HTML; `assets/css/fonts-local.css` now uses local font detection and system fallbacks.
- The embedded SEO dashboard snapshot was regenerated from the current static pages.
- Remaining non-English copy on the English landing page service was corrected.
