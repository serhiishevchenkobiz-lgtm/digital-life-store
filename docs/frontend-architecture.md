# Frontend architecture audit

## Repository structure inspected

```text
apps/web/                 Next.js 14 App Router application
  src/app/                pages, metadata routes, auth callback, server actions
  src/components/         shared layout and catalogue presentation components
  src/lib/                mock catalogue, utilities, Supabase clients and types
  src/middleware.ts       Supabase session refresh middleware
supabase/                 configuration, migrations, seed data, upload-function note
content/                  reserved content area; no tracked content files found
docs/                     environment and Supabase setup documentation
```

The root `package.json` delegates all development, build, lint, start, and typecheck scripts to `apps/web`. The declared runtime is Node 20+; the audited environment used Node 24.19.0.

## Current application routes

Implemented routes are `/`, `/about`, `/audio`, `/books`, `/books/[slug]`, `/free-library`, `/library`, `/account/sign-in`, and `/auth/callback`; framework metadata routes generate `/sitemap.xml` and `/robots.txt`. The root layout provides fonts, global header/footer, skip link, and base metadata.

Broken internal destinations are `/categories`, `/categories/[slug]`, `/checkout`, `/account`, `/journal`, `/contact`, `/legal/privacy`, and `/legal/terms`. `/categories` is linked from the header/footer and listed in the sitemap; `/checkout` is linked from every product page. The homepage also links category detail paths that do not exist. These routes currently resolve to the shared 404 page.

## Reusable frontend code

| Code | Reuse value |
| --- | --- |
| `src/app/layout.tsx` | application shell, font setup, metadata baseline, skip link |
| `src/components/site-header.tsx`, `site-footer.tsx`, `container.tsx` | responsive global layout primitives; navigation needs route completion and mobile treatment |
| `src/components/button.tsx` | consistent link/button visual primitive for simple use cases |
| `src/components/book-cover.tsx` | lightweight, accessible SVG cover renderer for prototype/catalogue fallback |
| `src/components/book-card.tsx` | reusable editorial catalogue card |
| `src/lib/utils.ts` | class composition, currency formatter, reading-time helper |
| `src/lib/catalog.ts` | useful temporary fixture and route-generation source, not a production data layer |
| `src/lib/supabase-*.ts` and `src/middleware.ts` | separated browser, cookie-aware server, server-only admin, and middleware session clients |
| `/library` and `library/actions.ts` | foundation for authenticated entitlement view and short-lived downloads |

## Styling and responsive implementation

Tailwind 3.4 defines a coherent paper/ink/accent palette, typography, spacing, editorial shadows, grid breakpoints, and reduced-motion override. Global CSS supplies focus styles, semantic typography helpers, and a skip link. Pages generally use responsive grid classes and semantic landmarks.

Strengths: responsive grids, container sizing, focus-visible styling, a skip link, `prefers-reduced-motion`, inline SVG cover labels, server-rendered catalogue pages, and Next image format configuration.

Gaps: the primary navigation disappears below `md` without an alternate menu; there is no responsive interaction QA evidence; controls do not yet implement filter/search state; visual cover SVGs use fixed literal text rather than product artwork; no image component or image-size strategy is exercised because no product images are present. The root metadata declares language alternatives for `/en`, `/uk`, `/de`, `/es`, and `/fr`, but those routes are absent, so these `hreflang` entries are inaccurate.

## Data and Supabase integration

Supabase configuration is deliberately isolated:

- `supabase-env.ts` exposes public URL and anonymous-key helpers.
- `supabase-browser.ts` provides a cached browser client.
- `supabase.ts` provides typed, cookie-aware server clients.
- `supabase-admin.ts` is marked `server-only` and uses the service-role key only server-side.
- `supabase-middleware.ts` refreshes sessions when public Supabase environment values exist.
- `/auth/callback` exchanges magic-link authorization codes; `/library` queries purchases and `getSignedDownloadUrl()` verifies ownership before the admin client creates a five-minute private-storage URL.

This separation is a reusable security foundation. However, public pages render from `src/lib/catalog.ts`, while the database seed does not include book translation content or product rows. The library UI assumes `products -> books` relations and cover data, but the current seed does not populate products; it cannot demonstrate an actual purchase/download experience without real rows and environment configuration. The library's promised reading progress/bookmarks are also not implemented.

## Incomplete or broken frontend code

1. **No real commerce:** "Add to cart" links to a nonexistent `/checkout`; there is no cart, payment integration, verified webhook, order creation, promotion logic, three-book 10% discount, gifts, subscriptions, or confirmation screen.
2. **No live catalogue:** all visible books, prices, categories, descriptions, related titles, and static product paths come from hard-coded mock data rather than Supabase.
3. **Incomplete discovery:** no `/categories` routes, search, filtering, pagination, campaign pages, series, or subscriptions.
4. **Placeholder content/actions:** Free Library download links use `href="#"`; audio "samples" only link back to a book rather than playing media; the book sample is explicitly placeholder text.
5. **Dead navigation and sitemap entries:** the missing routes above are user-visible dead ends; sitemap includes `/categories` despite no matching page.
6. **Localization not implemented:** English-only content, one `lang="en"`, USD display, and dead locale URLs. Locale-aware formatting helper exists but has no route/data integration.
7. **SEO is partial:** base metadata, robots, sitemap, and book JSON-LD exist, but product images/OG image, per-page canonical strategy, live structured data, breadcrumbs in UI, and accurate locale alternates are incomplete. Sitemap `lastModified` is generated at request/build time rather than from content data.
8. **Accessibility refinements:** the mobile nav is unavailable, audio controls/previews do not exist, user-visible error state for `?error=` on library/sign-in is not read, and `Button` does not forward disabled/name/aria/form props; the sign-in sending state does not disable repeated submission.
9. **Type/data debt:** `LibraryPage` uses a broad `unknown` cast for nested Supabase data and `as never` cover fields, hiding schema/UI mismatch. `database.types.ts` is hand-authored and omits the reporting view even though it exists in the database.
10. **Documentation drift:** `docs/ENVIRONMENT.md` says to run only migrations 0001 and 0002, although 0003 exists; its hosted-status language conflicts with older root status files that say provisioning is pending. `supabase/functions/upload-paid-asset/README.ts` is documentation named as TypeScript rather than an executable function.

## Recommended frontend boundaries

Keep the global shell and simple display primitives. Add feature modules by domain rather than expanding the page files: `catalog`, `search`, `cart`, `checkout`, `campaigns`, `library`, and `i18n`. Use server-rendered data loaders for public pages and client components only for needed interaction. Route pages should compose domain UI and metadata from one typed source of truth, instead of independently importing mock data.

