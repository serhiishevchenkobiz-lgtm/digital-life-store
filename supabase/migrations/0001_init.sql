-- Digital Life Press — initial schema (Postgres / Supabase)
-- Apply via Supabase SQL editor or `supabase db push`.

create extension if not exists "pgcrypto";

-- ============================================================
-- USERS / PROFILES / ROLES
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'en-US',
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Authoritative roles table — never trust user metadata for authorization.
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'editor', 'customer')),
  granted_at timestamptz not null default now()
);

-- ============================================================
-- CATALOG
-- ============================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category_id uuid references public.categories(id) on delete set null,
  isbn text,
  pages int,
  reading_minutes int,
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  published_at timestamptz,
  -- base price in cents, USD
  price_cents int not null,
  audio_price_cents int,
  bundle_price_cents int,
  cover jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.book_translations (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books(id) on delete cascade,
  locale text not null,
  title text not null,
  subtitle text,
  short_description text,
  long_description text,
  unique (book_id, locale)
);

-- ============================================================
-- PRODUCTS / ASSETS
-- ============================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books(id) on delete cascade,
  format text not null check (format in ('ebook','audio','bundle','worksheet')),
  price_cents int not null,
  private_storage_path text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ORDERS / PURCHASES / DOWNLOADS
-- ============================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  status text not null default 'pending' check (status in ('pending','paid','refunded','failed')),
  subtotal_cents int not null,
  tax_cents int not null default 0,
  total_cents int not null,
  currency text not null default 'USD',
  provider text,
  provider_ref text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  unit_price_cents int not null,
  quantity int not null default 1
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id),
  order_id uuid references public.orders(id) on delete set null,
  granted_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table if not exists public.download_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id),
  signed_at timestamptz not null default now(),
  ip inet,
  user_agent text
);

-- ============================================================
-- ARTICLES / TAGS (for SMM / SEO blog)
-- ============================================================
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.article_translations (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  locale text not null,
  title text not null,
  excerpt text,
  body_markdown text,
  unique (article_id, locale)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.books enable row level security;
alter table public.book_translations enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.purchases enable row level security;
alter table public.download_log enable row level security;
alter table public.articles enable row level security;
alter table public.article_translations enable row level security;

-- Helper: is the current user an admin/owner?
create or replace function public.is_staff() returns boolean
language sql stable security definer as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid()
      and role in ('owner','admin','editor')
  );
$$;

-- Profiles: user can read+update own row.
create policy "profile self read" on public.profiles
  for select using (auth.uid() = id);
create policy "profile self update" on public.profiles
  for update using (auth.uid() = id);

-- Roles: only owner can manage; nobody can self-grant.
create policy "roles staff read" on public.user_roles
  for select using (public.is_staff());

-- Books / translations / products: public can read published; staff can write.
create policy "books public read" on public.books
  for select using (status = 'published' or public.is_staff());
create policy "books staff write" on public.books
  for all using (public.is_staff()) with check (public.is_staff());

create policy "book tr public read" on public.book_translations
  for select using (
    exists (select 1 from public.books b where b.id = book_id and (b.status = 'published' or public.is_staff()))
  );
create policy "book tr staff write" on public.book_translations
  for all using (public.is_staff()) with check (public.is_staff());

create policy "products public read" on public.products
  for select using (is_active = true or public.is_staff());
create policy "products staff write" on public.products
  for all using (public.is_staff()) with check (public.is_staff());

-- Orders: user sees own; staff sees all.
create policy "orders self read" on public.orders
  for select using (auth.uid() = user_id or public.is_staff());

create policy "order items self read" on public.order_items
  for select using (
    exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_staff()))
  );

-- Purchases: user sees own only.
create policy "purchases self read" on public.purchases
  for select using (auth.uid() = user_id or public.is_staff());

create policy "download log self insert" on public.download_log
  for insert with check (auth.uid() = user_id);

-- Articles: public read published; staff write.
create policy "articles public read" on public.articles
  for select using (status = 'published' or public.is_staff());
create policy "articles staff write" on public.articles
  for all using (public.is_staff()) with check (public.is_staff());

create policy "article tr public read" on public.article_translations
  for select using (
    exists (select 1 from public.articles a where a.id = article_id and (a.status = 'published' or public.is_staff()))
  );
create policy "article tr staff write" on public.article_translations
  for all using (public.is_staff()) with check (public.is_staff());

-- ============================================================
-- AUTO-PROFILE ON SIGNUP
-- ============================================================
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();