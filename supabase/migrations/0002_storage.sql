-- Digital Life Press — storage & signed-URL setup.
--
-- Paid assets live in a PRIVATE Supabase Storage bucket called `paid-assets`.
-- They are NEVER served by a public URL. The Next.js app creates short-lived
-- signed URLs server-side after verifying purchase ownership.

-- 1. Create the private bucket (idempotent).
insert into storage.buckets (id, name, public)
values ('paid-assets', 'paid-assets', false)
on conflict (id) do nothing;

-- 2. RLS on storage.objects for this bucket.
--    No client (anon or authenticated) can SELECT objects directly — only
--    signed URLs (which bypass RLS) can be used.
--    Staff (service role) bypasses RLS, which is what /app/lib/supabase-admin.ts
--    relies on when minting the URL.

-- Drop any conflicting policies first so this migration is idempotent.
drop policy if exists "paid assets: no client read" on storage.objects;
drop policy if exists "paid assets: no client write" on storage.objects;
drop policy if exists "paid assets: staff write" on storage.objects;

-- Deny all client-side SELECT on objects in the paid-assets bucket.
create policy "paid assets: no client read"
  on storage.objects
  for select
  to authenticated, anon
  using (bucket_id <> 'paid-assets');

-- Deny direct client writes — uploads happen via the service role from CI/admin.
create policy "paid assets: no client write"
  on storage.objects
  for insert
  to authenticated, anon
  with check (bucket_id <> 'paid-assets');

-- 3. Helper view for admin dashboards (staff only).
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

-- 4. Grant-select on the view only to staff via RLS on the view itself.
--    (We can't define RLS on views directly; instead we restrict in the app
--    using public.is_staff() and never expose this view to the public client.)