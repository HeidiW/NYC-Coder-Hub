---
name: Vercel deployment setup
description: How the personal-site monorepo deploys to Vercel, including the contact form serverless function
---

## Root cause history
- Vercel "No Output Directory named 'public' found" was caused by Vercel using an old pnpm that couldn't parse `catalog:` syntax in pnpm-workspace.yaml (pnpm v9+ feature). Fix: `"packageManager": "pnpm@10.26.1"` in root package.json so corepack picks the right version.

## Deployment config (single source of truth = root vercel.json)
- Vercel Root Directory MUST be the repo root (blank), NOT artifacts/personal-site — otherwise the `api/` serverless functions aren't detected.
- Build: `pnpm --filter @workspace/personal-site run build`; output `artifacts/personal-site/dist/public`; install `pnpm install`; BASE_PATH=/ via build.env.
- SPA fallback rewrite excludes `/api/` so functions still route.

## Contact form on Vercel
- Frontend posts to relative `/api/contact` expecting `{ success: true }` (200) or `{ error }` (non-2xx).
- On Vercel this is served by `api/contact.ts` (Vercel serverless function, @vercel/node signature) — NOT the Express api-server (that only runs in Replit dev).
- Function sends email via Resend to heidiwilliamsfoy@gmail.com. Email-only, no DB.
- Requires `RESEND_API_KEY` env var set in Vercel dashboard.
- `resend` + `@vercel/node` are deps of the ROOT package.json (the `api/` dir is not a pnpm workspace package, so it resolves deps from root node_modules).

**Why:** merged tasks turned the static site into a full-stack app; Vercel needs the backend re-expressed as a serverless function since it can't run the long-lived Express server.
