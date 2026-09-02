# DIGITAL LIFE STORE — DECISIONS

## Purpose
Record important project decisions so they are not accidentally reversed later.

## Decision 001 — Project Type
Personal digital publishing and e-commerce ecosystem.

## Decision 002 — Product
Primary products:
- Digital eBooks
- Audio versions
- Bundles
- Supporting educational/lifestyle content

## Decision 003 — Canonical Language
EN-US is the canonical source language.

## Decision 004 — Design
Premium studio/editorial visual quality with a distinctive 2.5D language.

## Decision 005 — Responsive
Mobile-first responsive design across phones, tablets, laptops and desktops.

## Decision 006 — Accessibility
Target WCAG 2.2 AA.

## Decision 007 — Performance
Performance is a core architectural requirement from the beginning.

## Decision 008 — SEO
SEO is integrated into content architecture, information architecture and frontend implementation from day one.

## Decision 009 — SMM
Content is designed for multi-platform repurposing while preserving native platform formats.

## Decision 010 — Budget
Initial target is  recurring cost.

## Decision 011 — Cloud First
Prefer free cloud services when they reduce local complexity or resource usage.

## Decision 012 — Local Machine
Do not depend on heavy local AI workloads.

## Decision 013 — Frontend Direction
Next.js + TypeScript + Tailwind CSS.

## Decision 014 — Backend Direction
Supabase + PostgreSQL.

## Decision 015 — Hosting Direction
Cloudflare where technically appropriate.

## Decision 016 — Source Control
Git + GitHub.

## Decision 017 — Authentication
Google authentication plus TOTP MFA.
No phone-number dependency.

## Decision 018 — Paid Digital Assets
Paid files must use private storage and controlled access.

## Decision 019 — AI Workflow
AI agents assist with research, writing, editing, translation, design, development, SEO, SMM, QA and security.

## Decision 020 — Change Control
Important changes follow:
PLAN -> CHANGE -> TEST -> REVIEW -> COMMIT -> DEPLOY

## Decision 021 — User Assistance
All complex technical procedures are explained in Russian step-by-step.
One major action at a time.
CLI is preferred when it is simpler and safer.

## Decision 022 — Human Oversight
Production, authentication, database, payment and security changes require human review.

## Decision 023 — Quality
Professional visual and technical quality is required even for the free MVP.

## Decision 024 — Scaling
Build the smallest professional version first, then scale.

## Decision 025 — Brand Name
Public-facing brand: **Digital Life Press**.
Editorial publishing house positioning, not a generic "store". Legal/operational entity may remain separate.

## Decision 026 — Brand Personality
Calm, thoughtful, well-read, useful. Editorial authority without being preachy. Speaks like a trusted editor, not a salesperson.

## Decision 027 — Color System
- `--paper` (background base, warm off-white)
- `--ink` (primary text, near-black)
- `--accent` (deep editorial red — used sparingly for emphasis)
- `--muted` (secondary surfaces, borders)
- Dark mode variant inverts paper/ink with proper contrast.

## Decision 028 — Typography
- Display: a transitional/modern serif (Fraunces via Google Fonts).
- Body: a humanist sans (Inter via Google Fonts).
- Numerals: tabular for prices, dates, counts.

## Decision 029 — Layout Grid
12-column responsive grid with generous gutters on desktop, single-column on mobile. Editorial vertical rhythm based on 8px baseline.

## Decision 030 — Motion
Restrained: short ease-out transitions (150–300ms). No autoplay. `prefers-reduced-motion` respected everywhere.

## Decision 031 — 2.5D Direction
Subtle layered objects with soft shadows and gentle parallax on hero only. No 3D WebGL. Implemented with CSS transforms and a few well-crafted SVG/CSS illustrations.

## Decision 032 — Repository Layout
Monorepo style for future extensibility, but only one app initially:
- `apps/web` — Next.js storefront + admin
- `packages/design-tokens` — exported design tokens (Tailwind preset)
- `content/` — book manuscripts, audio scripts, articles (markdown)
- `supabase/` — SQL migrations + seed
- `docs/` — memory files already at root

## Decision 033 — Framework Version
Next.js 14 (App Router), React 18, TypeScript 5, Tailwind 3.4.

## Decision 034 — Auth MVP
Phase 1 storefront uses Supabase Auth email magic link. Google OAuth + TOTP MFA is the target for admin/owner role; deferred to Phase 2 admin build so the public site can launch first.

## Decision 035 — Supabase Client Strategy
- `supabase-env.ts` exposes URL + anon key constants; safe in any bundle.
- `supabase-browser.ts` builds a persistent-session browser client (anon key).
- `supabase.ts` uses `@supabase/ssr` for Server Components / Route Handlers / Server Actions; reads cookies, refreshes via middleware.
- `supabase-admin.ts` is `server-only` and holds the service-role key; it may only be imported from Server Actions, Route Handlers, or build scripts.
- `supabase-middleware.ts` runs on every request to refresh expiring tokens.

## Decision 036 — Storage & Download Flow
Paid assets live in the private `paid-assets` Storage bucket. The Next.js app never exposes a public URL. To download:
1. The user is authenticated (magic link) and has a row in `purchases`.
2. A Server Action verifies the ownership via RLS-respecting client.
3. The Server Action uses the admin client to read the private path and mint a 5-minute signed URL.
4. Each issuance is logged to `download_log` for audit.

## Decision 037 — Magic-Link Only for MVP
Phase 1 customer auth is email magic link only. Google OAuth + TOTP MFA are reserved for the owner/admin role in a later admin build. No passwords, no phone numbers.

## Decision 038 — Hand-authored Database Types
Database types live in `apps/web/src/lib/database.types.ts`, kept in sync with the SQL schema by hand until a Supabase project exists. Once provisioned, regenerate via `supabase gen types typescript`.

## Change Log
2026-09-02 — Initial decision record created.
2026-09-02 — Brand name, design tokens, repo layout, framework versions locked.
2026-09-02 — Supabase client strategy, storage/download flow, MVP auth, DB types approach locked.
