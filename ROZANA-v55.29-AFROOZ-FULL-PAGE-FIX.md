# Rozana v55.29 — Afrooz Open Landing Page full display fix

Scope: only the Afrooz mini website demo opened from the **Open Landing Page** button.

Fixed:
- Corrected the JavaScript syntax error in `public/afrouz-mini-website/js/main.js` that stopped the page script from running.
- Because the script failed before, `.reveal` sections stayed hidden and the Afrooz page appeared incomplete after opening.
- Added cache busting to the Afrooz demo script reference in `public/demo-afrooz-mini-website.html`:
  - `afrouz-mini-website/js/main.js?v=55.29`

Verification:
- `node --check public/afrouz-mini-website/js/main.js` passed.
- `npm run build` passed successfully with Next.js 15.5.19.

No unrelated Rozana pages, demo cards, pricing, sitemap logic, or CTA behavior were changed.
