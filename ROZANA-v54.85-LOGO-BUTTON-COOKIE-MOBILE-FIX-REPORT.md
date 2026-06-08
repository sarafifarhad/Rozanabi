# Rozana v54.85 — Logo, Button, Cookie and Mobile Header Fixes

## Version
- Updated project version to `54.85.0`.

## Fixes applied

1. **Logo readability**
   - Increased the overall logo size in header and footer.
   - Increased `ROZANA` weight and size.
   - Increased spacing between `ROZANA` and `BUSINESS INTELLIGENCE`.
   - Improved subtitle legibility with larger size, stronger weight and reduced letter spacing.

2. **Button typography consistency**
   - Normalized typography for `.btn-p`, `.btn-g`, real `<button>` elements using those classes, `Send Message`, navigation CTA, price CTA and service links.
   - `Send Message` now uses the same Inter label system, size, weight, letter spacing and uppercase styling as the rest of the site.
   - Mobile page-hero buttons now follow one consistent stacked/full-width structure across Contact, FAQ, Landing Page Design, legal pages and other page headers.

3. **Cookie banner size and behavior**
   - Reduced cookie card width, padding, text length and mobile height.
   - Reduced the preference panel size on mobile and hid long preference descriptions on small screens.
   - Removed underline from `Cookie Settings`, including the late style injected by the cookie script.
   - Replaced version-specific cookie storage keys with stable key `rz-cookie-consent`.
   - Added migration from previous keys (`rz-cookie-consent-v54-84`, `v54-83`, `v54-80`, `v54-77`, `v54-76`) so users who already accepted are not prompted again.
   - `/api/google-tools-config` now returns stable `rz-cookie-consent` regardless of env overrides.

4. **Home mission note mobile text**
   - Updated the mobile wording to the requested two-line structure:
     - `At Rozana, you're not a project,`
     - `you're a partner.`

5. **Footer cookie links**
   - Cookie links remain without underline on both desktop and mobile.

## Validation
- `npm install --include=dev --prefer-offline --no-audit`: passed
- `npm run build`: passed
- `npx tsc --noEmit`: passed
- `npm audit --omit=dev`: 0 vulnerabilities
- Internal asset reference check: 0 missing

## Deployment note
If Vercel currently has `NEXT_PUBLIC_COOKIE_CONSENT_STORAGE_KEY` set to a version-specific value, update it to `rz-cookie-consent` or remove that variable. In this version, the API route already forces the stable key, but keeping Vercel env clean avoids confusion.
