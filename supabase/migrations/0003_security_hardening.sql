-- Digital Life Press — security hardening applied after the initial schema.
--
-- Keep paid assets private and prevent the admin-only reporting view from
-- being queried with anon/authenticated credentials.

-- Categories are public catalog metadata, but must still be protected by RLS
-- so writes remain staff-only.
alter table public.categories enable row level security;

drop policy if exists "categories public read" on public.categories;
drop policy if exists "categories staff write" on public.categories;

create policy "categories public read" on public.categories
  for select using (true);

create policy "categories staff write" on public.categories
  for all using (public.is_staff()) with check (public.is_staff());

-- Do not expose the purchase reporting view to browser roles. The Next.js
-- server/admin layer uses the service role for this view.
revoke all on public.purchases_with_user from public, anon, authenticated;
grant select on public.purchases_with_user to service_role;
