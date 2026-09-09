# Repository guidance

- Treat this repository as a Next.js storefront and Supabase backend project.
- Preserve `supabase/migrations/` and never edit environment or secret files unless a task explicitly authorizes it.
- Keep customer-facing work accessible (WCAG 2.2 AA), responsive, localization-ready, secure, and performance-conscious.
- Prefer server-rendered data and existing shared components before adding client-side code or dependencies.
- Run the relevant existing `npm run` validation commands after application changes.

## Storefront direction

- The customer-facing storefront should follow the information architecture and density of a mature digital bookstore: compact utility navigation, prominent search, category browsing, featured title rails, bestseller/new-title shelves, product metadata, add-to-cart actions, filters and practical reader help.
- The layout must use the full available viewport width with small responsive gutters; do not create permanent empty side columns. A narrow category sidebar is allowed when it carries real navigation value.
- Use original Digital Life Press branding, illustrations, covers, copy and icons. Never copy another retailer's logo, photographs, product text or distinctive branded assets.
- Avoid fabricated sales counts, review totals, certificates, awards, user statistics or publisher claims.

## Taxonomy and SEO

- Borrow only broad bookstore subject concepts as market research input. Category labels must be rewritten into original, human-readable, search-friendly names suitable for Digital Life Press.
- Keep category slugs stable and English-first for the canonical URL layer; display labels are translation data, not URL identity.
- Seed categories from the real needs of the catalogue first. Do not publish empty category pages merely to imitate another retailer's taxonomy.
- Each category needs a distinct SEO title, meta description and concise human introduction. Avoid keyword stuffing.

## Localization

- Treat Supabase as the source of truth for localization data.
- Keep book copy in `book_translations`, article copy in `article_translations`, and plan a database-backed translation layer for navigation, category labels and SEO metadata.
- Locale selection should default from the profile/browser, remain user-switchable, and preserve the selected locale across navigation.
- English (`en-US`) is the initial canonical locale; additional locales must use the same content model rather than duplicated pages.
- AI may draft translations and editorial copy, but published customer-facing text requires editorial QA and must sound natural rather than machine-translated.

## AI-created assets

- Use a dedicated image-generation workflow for original logo concepts, cover art, editorial imagery and social assets; do not use generated output as an excuse to copy a competitor's visual identity.
- Maintain reusable source assets and alt text metadata so the admin/editorial system can replace or localize visuals without changing page structure.
