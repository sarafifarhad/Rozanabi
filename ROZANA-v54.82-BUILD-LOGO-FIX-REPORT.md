# Rozana v54.82 — Build and Logo Readability Fix

## Fixed

1. Moved TypeScript and React/Node type packages from `devDependencies` to `dependencies` so Vercel can build even when `NODE_ENV=production` causes npm to omit dev dependencies.
2. Updated `vercel.json` install command to `npm install --include=dev` for additional build safety.
3. Kept Node engine at `>=20.0.0 <23.0.0` so Vercel uses Node 22.x instead of Node 24.x.
4. Improved the readability of the `BUSINESS INTELLIGENCE` text in the header and footer logo: larger size, heavier weight, reduced tracking, gold color.
5. Version updated to `54.82.0`.

## Vercel note

Do not manually set `NODE_ENV=production` as a Vercel Environment Variable unless needed. Vercel/Next.js handles production mode during build and runtime. This package is now protected against that issue, but removing the manual variable is still cleaner.
