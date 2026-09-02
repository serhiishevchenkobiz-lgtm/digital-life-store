# Supabase setup status

The hosted Supabase project for Digital Life Store is already provisioned and
connected through the project integration.

## Current hosted project

- Project: `digital-life-store`
- Project ref: `jnaamvfecwoymzdhsnre`
- Plan: Free
- Region: `us-west-2`
- Status: `ACTIVE_HEALTHY`

## Migrations

The schema and storage migrations have been applied to the hosted database.
The hosted migration history currently contains:

- `init`
- `storage`
- `security_hardening`

The repository also contains the corresponding SQL migrations under
`supabase/migrations/`.

### Important

Do **not** put `SUPABASE_ACCESS_TOKEN`, database passwords, anon keys, or
service-role keys into chat, committed files, or documentation.

The project does not need a local `supabase db push` step to complete the
hosted setup. The connected Supabase integration can apply and verify hosted
DDL without exposing credentials to the chat.

## Security checks completed

- All application tables have Row Level Security enabled, including
  `categories`.
- Public catalog reads are limited to the intended published/active data.
- User-owned data is protected by `auth.uid()` checks.
- Staff authorization is based on `public.user_roles`, not user metadata.
- `is_staff()` and `handle_new_user()` use `SECURITY DEFINER` with an explicit
  `search_path`.
- The `paid-assets` Storage bucket exists and is private.
- The purchase reporting view is not readable by `anon` or `authenticated`.
  It is reserved for the server-side service role.

## Next.js environment

Create `apps/web/.env.local` locally and keep it out of Git. It should contain
only the credentials needed by the app runtime:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://jnaamvfecwoymzdhsnre.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase anon public key>
SUPABASE_SERVICE_ROLE_KEY=<Supabase service role key>
```

The service-role key must only be used in server-side code. Never expose it
to browser/client bundles.

## Next step

Proceed with the Next.js Supabase integration: create the browser/server
clients, wire the auth callback, and replace temporary/mock catalog data with
Supabase queries. Auth providers and admin authorization will be configured
after the base client integration is verified.
