# Rozana v54.77 — npm install / Vercel install fix report

## Fixed

1. `package-lock.json` no longer points to the private/internal OpenAI package proxy. All `resolved` tarball URLs now use `https://registry.npmjs.org/` so Vercel can install dependencies from the public npm registry.
2. Added `.npmrc` with the public npm registry and `engine-strict=false` to avoid install failure if the deployment environment uses Node 22 while the project is still compatible with Node 20+.
3. Broadened the Node engine from `20.x` to `>=20.0.0 <23.0.0`. This removes `EBADENGINE` hard-failure risk on platforms configured with strict engine enforcement.
4. Added `packageManager: npm@10.9.2` for deterministic npm behavior.
5. Updated project version to `54.77.0`.

## Why npm install failed

The previous lockfile was generated in a controlled environment and contained `resolved` URLs under an internal package registry host. Vercel cannot access that internal host, so dependency installation can exit with code 1. The dependency versions themselves were not the main issue.

## Deployment note

Use the default Vercel install command:

```bash
npm install
```

No custom install command should be required.
