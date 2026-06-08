# Rozana v54.88 — Landing Package Flow and Demo Preview Fix

## Fixed

1. Moved the **View Landing Page Service** link closer to the lower line/card content on mobile.
2. Updated the Landing Page Design header **Request Free Review** button to send users directly to the contact form with the **150 OMR Recommended — Professional Landing Page** package selected by default.
3. Updated all Pricing card **Request Review** links so each selected package is passed to the contact form.
4. Added hidden contact form fields for the selected package ID, package label, and package price.
5. Updated the contact form script to read the package from the URL and include it in the submitted form data.
6. Updated the contact API email output so the selected package appears in the email received by Rozana.
7. Regenerated the demo card preview images from the actual demo pages instead of generic/static graphics.
8. Added CSS overrides so demo card images show the actual executed demo page preview cleanly inside the browser frame.

## Package IDs

- `starter-120` → Starter — One-Link Page — 120 OMR
- `professional-150` → Recommended — Professional Landing Page — 150 OMR
- `local-growth-220` → Local Visibility — Local Growth — 220 OMR
- `ai-ready-280` → Search Structure — AI-Ready Local Page — 280 OMR

## Test checklist after deployment

- `/services` → mobile card button spacing for **View Landing Page Service**
- `/landing-page-oman` → header Request Free Review opens contact form with `package=professional-150`
- `/landing-page-oman#demo-pages` → demo card previews show actual demo layouts
- `/landing-page-oman#pricing` → every Request Review card carries its package to the contact form
- `/contact?...&package=...` → contact context note shows selected package
- Submit a test form and confirm the package appears in the received email
