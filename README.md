# Digital Life Press

Premium multilingual digital publishing storefront.

## Stack
- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Supabase** for auth, database, storage and edge functions
- **Cloudflare** in front of the deployed app for caching and DDoS protection
- **Fraunces** (display) + **Inter** (body) via `next/font/google`

## Layout
```
apps/web/                Next.js application
  src/app/               App Router routes (home, books, audio, library, ...)
  src/components/        Site header/footer, BookCard, BookCover, primitives
  src/lib/               Catalog (mock), Supabase clients, utilities
supabase/
  migrations/            SQL schema migrations
  seed/                  Initial data
content/                 Book manuscripts, audio scripts, articles (markdown)
```

## Local development

```bash
# from repo root
npm install
npm run dev
```

Visit http://localhost:3000

## Environment

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in Supabase values when ready.
The site runs without them (using the local mock catalogue) so you can preview the design first.

Full setup checklist (project creation, migrations, seed, staff role grant) lives in [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md).

## Supabase wiring

| File | Purpose |
|---|---|
| `src/lib/supabase-env.ts` | URL + anon-key constants, safe to import from both client and server |
| `src/lib/supabase-browser.ts` | Browser client (persists session in localStorage) |
| `src/lib/supabase.ts` | Server / RSC / Route-Handler client (cookie-aware, via `@supabase/ssr`) |
| `src/lib/supabase-admin.ts` | Service-role client — **server-only**, never bundled to the client |
| `src/lib/supabase-middleware.ts` | Refreshes the auth cookie on every request |
| `src/lib/database.types.ts` | Hand-authored types mirroring the SQL schema |
| `src/middleware.ts` | Next.js middleware that wires `supabase-middleware` |
| `src/app/auth/callback/route.ts` | Magic-link completion → `/library` |
| `src/app/account/sign-in/page.tsx` | Email-magic-link sign-in form (client component) |
| `src/app/account/actions.ts` | `signOut()` server action |
| `src/app/library/actions.ts` | `getSignedDownloadUrl()` — verifies ownership, mints a 5-minute signed URL, writes to `download_log` |
| `src/app/library/page.tsx` | Signed-in library: lists `purchases` joined with `products` and `books`, offers downloads |

## Supabase SQL migrations

- `supabase/migrations/0001_init.sql` — schema + RLS + auto-profile trigger
- `supabase/migrations/0002_storage.sql` — private `paid-assets` bucket + storage RLS
- `supabase/seed/books.sql` — catalogue seed

## Brand

See `DECISIONS.md` for the locked brand identity (Digital Life Press), design tokens and architecture decisions.