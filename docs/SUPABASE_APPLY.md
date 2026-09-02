# Applying the Digital Life Press Supabase migrations

This is a **one-time, manual** step. The agent cannot do it for you because
applying migrations to a real Supabase project requires your personal
access token — and that token is a secret that must never be entered in
chat, the terminal transcript, or any file in this repository.

Everything else (the SQL, the config, the verification) is already on
disk. You only need to run a few CLI commands locally.

---

## Prerequisites

- Node.js ≥ 18 (you have 24).
- A free Supabase account at https://supabase.com.
- The Supabase CLI. Either:
  - `npm i -g supabase`, **or**
  - `winget install Supabase.CLI` (Windows), **or**
  - use `npx supabase ...` from this repo (no global install).

---

## Step 1 — Create the project

1. Open https://supabase.com/dashboard and click **New project**.
2. Pick the **free** tier, give it a name (e.g. `digital-life-press`),
   choose a strong database password (store it in a password manager),
   and pick the region closest to your readers.
3. Wait ~2 minutes for the project to provision.
4. From **Project Settings → General** copy the **Project Reference ID**
   (a 16-character ID, e.g. `abcdefghijklmnopqrst`).

## Step 2 — Generate an access token (secret — never share it)

1. Open https://supabase.com/dashboard/account/tokens
2. Click **Generate new token**, name it `local-cli`, set it to never expire
   for now (you can revoke later).
3. Copy the token. It will look like `sbp_...`.

## Step 3 — Set the token in YOUR LOCAL environment only

Open PowerShell **on your machine** (NOT inside this chat) and run:

```powershell
$env:SUPABASE_ACCESS_TOKEN = "sbp_xxxxxxxxxxxxxxxxxxxxxxxx"
```

Do **not** echo it back, do not paste it in chat, do not save it to a file
in this repository.

## Step 4 — Link the CLI to your project

From the repo root (`C:\Users\Bastion\Projects\digital-life-store`):

```powershell
supabase link --project-ref <paste-your-project-ref-here>
```

You should see: `Finished supabase link.`

## Step 5 — Push the migrations

```powershell
supabase db push
```

The CLI will show the two migration files and ask for confirmation:

```
Applying migration 0001_init.sql...
Applying migration 0002_storage.sql...
```

When it finishes you should see `Finished supabase db push.`

## Step 6 — Apply the seed

The seed file is a plain SQL `INSERT`, not a migration, so it goes through
the SQL editor rather than the CLI (the CLI's `db push` runs migrations
in version order).

1. Open the Supabase dashboard → **SQL Editor** → **New query**.
2. Open `supabase/seed/books.sql` from this repo, copy its contents,
   paste into the editor, click **Run**.

## Step 7 — Verify

Run these in the SQL editor, one at a time:

```sql
-- expect 6
select count(*) as books from public.books;

-- expect 'Lifestyle', 'Mind', 'Productivity', 'Home'
select slug, name_en from public.categories order by slug;

-- expect paid-assets, public = false
select id, public from storage.buckets where id = 'paid-assets';

-- expect helper functions to exist
select proname from pg_proc where pronamespace = 'public'::regnamespace
  and proname in ('is_staff', 'handle_new_user');
```

All four should return rows. If `is_staff` or `handle_new_user` is
missing, the migration did not run cleanly — re-run `supabase db push`
and inspect the logs.

## Step 8 — Connect the Next.js app

In `apps/web/.env.local` (create the file, do NOT commit it):

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from Project Settings → API → anon public>
SUPABASE_SERVICE_ROLE_KEY=<from Project Settings → API → service_role>
```

Then `npm run dev` and visit `/account/sign-in`.

## Step 9 — Grant yourself the owner role

After signing up once through the UI:

```sql
select id, email from auth.users;
-- copy your user id, then:
insert into public.user_roles (user_id, role) values ('<paste-id>', 'owner');
```

---

## What if a migration partially fails?

`supabase db push` is transactional per migration. If `0001_init.sql`
fails mid-way, the failed statement rolls back, but tables created before
the failure stay. Re-running will skip everything that already exists
(everything uses `if not exists` and `create or replace`), so it is
safe to just run `supabase db push` again.

If `0002_storage.sql` fails because the `paid-assets` bucket already
exists, that is normal — the migration uses `on conflict do nothing`.

## Rollback

There is no automatic rollback. If you need to undo:

```sql
drop schema public cascade;
create schema public;
-- then re-apply 0001 + 0002 + seed
```

This is destructive — only run it on a brand-new project.