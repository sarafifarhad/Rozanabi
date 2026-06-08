# Rozana v54.81 — Vercel Build Fix

## What changed
- Reverted the Node engine range from `>=20.0.0 <25.0.0` to `>=20.0.0 <23.0.0`.
- This prevents Vercel from building the current Next.js project with Node 24.x.
- Added `vercel.json` with explicit Next.js framework, install command, and build command.
- Kept `next.config.mjs` so Vercel does not need TypeScript just to load `next.config.ts`.

## Required Vercel setting
Set Vercel Node.js Version to `22.x`:

Project → Settings → General → Node.js Version → 22.x

Then redeploy. If the previous failed deployment used Node 24.x, use Redeploy and choose not to reuse build cache.

## Notes
The earlier warning about Project Settings Node 24.x being ignored was safer than allowing Node 24.x for this project. The clean setup is to set the Vercel project itself to Node 22.x and keep the package engine below Node 23.
