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

Copy `apps/web/.env.example` to `apps/web/.env` and fill in Supabase values when ready.
The site runs without them (using the local mock catalog) so you can preview the design first.

## Brand

See `DECISIONS.md` for the locked brand identity (Digital Life Press), design tokens and architecture decisions.