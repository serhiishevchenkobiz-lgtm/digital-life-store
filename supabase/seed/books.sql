-- Seed: the initial Digital Life Press catalogue.

insert into public.categories (slug, name_en) values
  ('lifestyle', 'Lifestyle'),
  ('mind', 'Mind'),
  ('productivity', 'Productivity'),
  ('home', 'Home')
on conflict (slug) do nothing;

insert into public.books (slug, isbn, pages, reading_minutes, status, published_at,
                          price_cents, audio_price_cents, bundle_price_cents, cover)
values
  ('the-quiet-architecture', '978-1-9999999-0-1', 184, 195, 'published', '2026-08-12',
   1400, 1800, 2600, '{"palette":"ember","spineLabel":"01","motif":"lamp"}'::jsonb),
  ('letters-on-attention',   '978-1-9999999-0-2',  96,  95, 'published', '2026-06-02',
   1200, 1500, null, '{"palette":"moss","spineLabel":"02","motif":"leaf"}'::jsonb),
  ('a-small-book-of-routines','978-1-9999999-0-3', 112, 130, 'published', '2026-04-18',
   1500, null,  2200, '{"palette":"sand","spineLabel":"03","motif":"sun"}'::jsonb),
  ('the-house-you-live-in',  '978-1-9999999-0-4', 156, 170, 'published', '2026-02-09',
   1600, 2000, 2900, '{"palette":"inkwell","spineLabel":"04","motif":"arch"}'::jsonb),
  ('the-compass-and-the-cup','978-1-9999999-0-5',  90,  85, 'published', '2025-11-22',
   1100, null,  null, '{"palette":"ink","spineLabel":"05","motif":"compass"}'::jsonb),
  ('tides-and-small-tasks',  '978-1-9999999-0-6', 104, 110, 'published', '2025-09-30',
   1300, 1700, null, '{"palette":"rose","spineLabel":"06","motif":"wave"}'::jsonb)
on conflict (slug) do nothing;