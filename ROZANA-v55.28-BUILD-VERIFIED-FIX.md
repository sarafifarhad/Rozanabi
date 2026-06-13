# Rozana v55.28 — Build verified fix

## Build status
- Ran `npm ci` successfully.
- Ran `npm run build` successfully after dependencies were installed.
- Sitemap generated successfully in prebuild and postbuild.

## Updated
- Version bumped to 55.28.0.
- Vercel install command changed to `npm ci` for deterministic dependency installation from package-lock.json.
- Build command remains `npm run build`.

## Note
If `npm run build` is run before installing dependencies, `next` will not be found. The correct sequence is:
1. `npm ci`
2. `npm run build`
