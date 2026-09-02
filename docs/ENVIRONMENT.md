# Environment variables

Copy `apps/web/.env.example` to `apps/web/.env.local` for local development.
Copy to your hosting provider's environment settings for production.

## Public (NEXT_PUBLIC_* — exposed to the browser)

| Variable | Purpose | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin used in metadata, OAuth redirects and email links | Your domain, e.g. `https://digitallifepress.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon JWT — safe to ship to the client | Supabase dashboard → Project Settings → API |

## Server-only (never shipped to the client)

| Variable | Purpose |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Bypasses RLS. Used only in Server Actions / Route Handlers / Edge Functions for signed download URLs and admin operations. Never import `lib/supabase-admin.ts` from a Client Component. |

## One-time Supabase setup

1. Create a free-tier Supabase project.
2. Run `supabase/migrations/0001_init.sql` then `supabase/migrations/0002_storage.sql` in the SQL editor.
3. Run `supabase/seed/books.sql` to seed the catalogue.
4. Authentication → Providers → enable Email (magic link). Optionally enable Google for admin.
5. Authentication → URL Configuration → set `Site URL` to `https://your-domain` and add `https://your-domain/auth/callback` as a redirect URL.
6. Copy the project URL and anon key into `.env.local` / hosting env.
7. To issue your own staff account: sign up normally, then in the SQL editor run:
   ```sql
   insert into public.user_roles (user_id, role) values ('<auth.users.id>', 'owner');
   ```
8. Upload paid assets to the `paid-assets` bucket using the Supabase dashboard or the documented Edge Function.