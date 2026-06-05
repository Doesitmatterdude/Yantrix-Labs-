# Sanitization Report

## Scope

Sanitized the Yantrix Labs Next.js application for migration to a new GitHub repository:

`https://github.com/Doesitmatterdude/Yantrix-Labs-`

## Removed Or Excluded

- Removed `.kiro/` from source control because it contained local editor automation settings, an old `v0-yantrix-labs-landing-page` filesystem path, and a checked-in third-party API key.
- Added `.vercel/` to `.gitignore` so local deployment metadata is not migrated.
- Added `next-dev*.log` to `.gitignore` so local development server logs are not migrated.
- Confirmed generated TypeScript build cache files are ignored and excluded from the migration.
- Confirmed there is no checked-in `.vercel` directory, `vercel.json`, `vercel.app` preview domain, "Deploy with Vercel" badge, or v0 generator branding in product code.

## Preserved

- Next.js runtime and framework configuration.
- App routes, metadata, robots, sitemap, proxy security headers, and Spline integration.
- Brand assets, social links, system preview assets, and current UI behavior.
- Generic deployment-neutral documentation and production notes where they do not identify a specific hosting provider.

## Verification

- Searched repository contents for `vercel`, `v0`, `.vercel`, `vercel.json`, `vercel.app`, `Deploy with Vercel`, provider branding, API keys, tokens, and secret-like values.
- Verified no `.env` or `.env.*` files are tracked in this checkout.
- Rewrote `README.md` with neutral project setup and migration wording.
- Fixed the existing View Transition API TypeScript declaration issue in `lib/theme-transition.ts`.

## Remaining Notes

- Public environment variables may be set by any hosting platform at deploy time.
- The hero Spline bot currently falls back to the provided public Spline viewer URL unless `NEXT_PUBLIC_SPLINE_SCENE_URL` is set to an exported `.splinecode` URL.
