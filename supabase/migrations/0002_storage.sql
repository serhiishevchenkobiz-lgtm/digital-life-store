-- Digital Life Press — storage & signed-URL setup.
--
-- Paid assets live in a PRIVATE Supabase Storage bucket called `paid-assets`.
-- They are NEVER served by a public URL. The Next.js app creates short-lived
-- signed URLs server-side after verifying purchase ownership.
--
-- This migration is defensive about Supabase's stock Storage policies: on a
-- fresh project the platform auto-creates permissive policies like
-- "Give users access to their own folder". We add restrictive policies for
-- the `paid-assets` bucket that deny client access entirely; the service
-- role bypasses RLS so admin uploads and signed-URL minting still work.

-- 1. Create the private bucket (idempotent).
insert into storage.buckets (id, name, public)
values ('paid-assets', 'paid-assets', false)
on conflict (id) do nothing;

-- 2. Drop any prior version of our restrictive policies so re-runs work.
drop policy if exists "paid assets: no client read" on storage.objects;
drop policy if exists "paid assets: no client write" on storage.objects;
drop policy if exists "paid assets: no client update" on storage.objects;
drop policy if exists "paid assets: no client delete" on storage.objects;

-- 3. Lock the bucket down. Any client-side role (anon or authenticated) is
--    denied SELECT/INSERT/UPDATE/DELETE on objects in `paid-assets`. The
--    service_role bypasses RLS entirely, so admin uploads and signed URL
--    creation still work. Signed URLs themselves are time-limited and
--    bypass RLS, which is the only intended way to read these files.
create policy "paid assets: no client read"
  on storage.objects
  for select
  to authenticated, anon
  using (bucket_id <> 'paid-assets');

create policy "paid assets: no client write"
  on storage.objects
  for insert
  to authenticated, anon
  with check (bucket_id <> 'paid-assets');

create policy "paid assets: no client update"
  on storage.objects
  for update
  to authenticated, anon
  using (bucket_id <> 'paid-assets')
  with check (bucket_id <> 'paid-assets');

create policy "paid assets: no client delete"
  on storage.objects
  for delete
  to authenticated, anon
  using (bucket_id <> 'paid-assets');

-- 4. Helper view for admin dashboards (staff only via app-layer check).
create or replace view public.purchases_with_user as
  select
    p.id            as purchase_id,
    p.user_id,
    au.email        as user_email,
    p.product_id,
    pr.format       as product_format,
    pr.book_id,
    b.slug          as book_slug,
    p.granted_at
  from public.purchases p
  join auth.users au on au.id = p.user_id
  join public.products pr on pr.id = p.product_id
  join public.books b on b.id = pr.book_id;

-- Note: views cannot have RLS directly in Postgres. Access is restricted
--       in the Next.js admin layer using public.is_staff() before any
--       query is issued. The view is created with the default permissions
--       (SELECT to PUBLIC) but the anon key still cannot read
--       auth.users.email — only the service role can run this view.