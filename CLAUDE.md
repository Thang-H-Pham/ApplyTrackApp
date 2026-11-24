# ApplyTrack — CLAUDE.md

AI-powered internship & co-op tracker: paste a job posting, AI auto-fills the details, track it on a Kanban board.
Owner: Thang Pham (CS student, Wentworth Institute of Technology). Portfolio / resume project.

## Most important rule: work split

This is a learning + resume project. I must be able to explain every line in an interview.
Don't commit anything unless I approved. Always ask before commiting.

**I (Thang) write these myself. Do NOT write them for me. Explain, give hints, or review only:**

- Database schema (`supabase/schema.sql`): tables, columns, constraints, enums
- Row Level Security (RLS) policies
- API route logic (`src/routes/api/**`): inputs, outputs, error handling
- `/api/extract` logic: the prompt, JSON schema, Zod validation, handling bad AI output
- Kanban status-change logic + status history
- Dashboard calculations (response rate, counts)
- Deployment + environment variables / secrets
- README content

**Claude Code can do these:**

- Project scaffolding + config (Tailwind, ESLint, Prettier, tsconfig)
- UI components from my descriptions (cards, forms, modals, layout)
- Repetitive Tailwind styling + responsive layout
- Drag-and-drop wiring (explain how it works)
- Draft unit tests (I review the edge cases)
- GitHub Actions CI file
- Debugging help + code review of my code

**Always:**

- Add short comments explaining any non-obvious code you write
- When I ask about something on "my" list, teach me first (concept → hint → example only if I ask)
- Keep changes small; tell me which files you changed and why
- Never commit secrets; `.env` stays in `.gitignore`

## Stack

- Frontend --> SvelteKit + TypeScript + Tailwind CSS + `@tailwindcss/forms` (enabled via `@plugin` in `src/routes/layout.css`)
- Backend --> SvelteKit server routes + `+page.server.ts` load/actions
- DB + Auth --> Supabase (Postgres + Auth + RLS), `@supabase/supabase-js` + `@supabase/ssr`
- AI --> Claude API, structured JSON output, validated with Zod
- Deploy --> Vercel; CI --> GitHub Actions (lint, check, test)

## Commands

- `npm run dev` --> dev server (localhost:5173)
- `npm run build` / `npm run preview`
- `npm run check` --> svelte-kit sync + svelte-check / TypeScript
- `npm run lint` --> `prettier --check .` then `eslint .`
- `npm run format` --> prettier --write
- No test runner yet (Vitest planned for Week 5)

## Scaffold conventions

- Svelte 5 with **runes forced on** (`vite.config.ts`): use `$state`, `$derived`, `$props`, `$effect` — not `export let` / `$:`
- SvelteKit config lives in `vite.config.ts` (`sveltekit({...})` options) — there is no `svelte.config.js`
- Adapter is still `@sveltejs/adapter-auto`; switch to `@sveltejs/adapter-vercel` when deploying
- Tailwind v4 via `@tailwindcss/vite`: CSS-first config, no `tailwind.config.js`; `prettier-plugin-tailwindcss` sorts classes
- Import aliases in `package.json` `imports`: `#lib` → `src/lib/index`, `#lib/*` → `src/lib/*` (SvelteKit's `$lib` also works)
- TypeScript `strict`; `.npmrc` has `engine-strict=true`

## Env vars (`.env.local`, never committed)

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Supabase's newer name for the anon/public key)
- `ANTHROPIC_API_KEY` (server only, from Week 3)

## Features

**MVP**

- Sign up / log in / log out
- Paste job posting --> AI extracts company, role, location, deadline, skills, pay
- User reviews/edits AI result before saving
- Kanban: Saved → Applied → OA → Interview → Offer / Rejected (drag & drop)
- Notes + status history per application
- Dashboard: total applied, response rate, upcoming deadlines

**v2 (after MVP)**

- Upload resume --> skills match % + missing skills per job
- AI draft of tailored cover letter / "Why this company?" (user edits before sending)
- Per-application checklist (resume tailored, cover letter, referral)
- Deadline reminder emails (cron)
- Chrome extension to save postings in one click

**Not in scope:** auto-applying to jobs (ToS issues, CAPTCHAs, quality). The app helps the human; it doesn't replace them.

## Architecture

- Flow --> paste posting → `/api/extract` → Claude API → Zod validate → user confirms → save to Supabase
- Auth flow --> session cookie → `hooks.server.ts` → `event.locals` → protected routes redirect to `/login`
- Planned tables (I design the exact SQL):
  - `applications` --> id, user_id, company, role, url, location, pay, deadline, skills[], status, created_at
  - `status_history` --> application_id, from_status, to_status, changed_at
  - `notes` --> application_id, body, created_at

## Timeline (~6 weeks, part-time)

- Wk 1 --> scaffold, Supabase project, schema, RLS, auth, protected `/applications` page, deploy
- Wk 2 --> CRUD API + simple list view
- Wk 3 --> AI extract endpoint + validation
- Wk 4 --> Kanban + status history
- Wk 5 --> dashboard + tests + CI
- Wk 6 --> deploy polish, README, demo GIF, add to portfolio

## Current status

- Week 1: SvelteKit scaffolded (minimal, TypeScript, Prettier, ESLint, Tailwind + forms). Supabase project created, keys in `.env.local`, `@supabase/supabase-js` installed. Next: schema (`supabase/schema.sql`) + RLS. `@supabase/ssr` still to install for auth.
