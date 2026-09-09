# Implementation roadmap

## Audit conclusion

The foundation is suitable for a small secure digital bookstore, but it is not ready for a purchase flow. This roadmap sequences work without changing the present schema or migrations. Any future database proposal requires a separate review and explicit approval.

## Phase 1 — Stabilize the existing storefront

1. Implement the currently linked missing routes or remove/defer their links in a separately authorized frontend task: categories, checkout, account, journal, contact, legal pages, and category detail pages.
2. Add a keyboard- and touch-accessible mobile primary navigation and verify desktop, tablet portrait/landscape, small mobile, and large mobile layouts.
3. Replace visible placeholders only when real free assets, book excerpts, and accessible audio preview files are available.
4. Reconcile documentation status (hosted project, migrations, and environment setup) and correct inaccurate `hreflang`/sitemap entries when localization routes are actually planned.

**Exit criteria:** no shared navigation or sitemap link reaches a 404; the catalogue works well at all target viewport sizes; no customer-facing placeholder action masquerades as delivery.

## Phase 2 — Connect real catalogue data

1. Define one typed server-side catalog read model that joins published books, translations, categories, formats/products, and SEO fields.
2. Replace mock reads incrementally for homepage, catalogue, category, product, and audio pages, retaining fixtures only for development/test fallback if intentionally needed.
3. Complete content data needed for a real product page: localized title/description, author/publisher fields, cover/OG media, samples, accessible format information, and availability.
4. Implement search, filters, sort, pagination, and category navigation with canonical crawl-safe URLs.
5. Regenerate database types from the provisioned project as a separately approved maintenance task.

**Exit criteria:** production pages use published Supabase data and typed queries; fixture data is no longer the customer source of truth; search and category pages have coherent SEO metadata.

## Phase 3 — Commerce and secure fulfilment

1. Select a payment provider that supports the target countries and zero/low-cost MVP constraints; document fee, tax, currency, refund, webhook, and privacy implications before implementation.
2. Design cart, checkout session, idempotent webhook, order status, and entitlement flows. Do not trust the browser for paid status or pricing.
3. Specify the 10% discount: three distinct eligible books in one payment, clearly define whether formats/bundles/gifts/coupons combine, calculate on the server, and show the applied amount before payment.
4. Add checkout, success/cancel pages, order receipts, account order history, and end-to-end secure download verification.
5. Test authorization failures, refund/revocation behavior, repeat webhook delivery, expired signed URLs, and unauthenticated access.

**Exit criteria:** a test payment grants exactly the correct purchases once; library downloads are secure and regenerable; the three-book rule is tested end to end.

## Phase 4 — International, conversion, and marketing platform

1. Adopt a locale routing and translation workflow with EN-US canonical source, only publishing alternates that truly exist. Localize metadata, currency presentation, legal/campaign copy, and email content.
2. Create a reusable campaign-page shell with one primary CTA, UTM capture, privacy-aware attribution, social preview metadata, and responsive mobile-first layouts.
3. Build the free-book funnel as an explicit-consent flow separate from ungated Free Library resources; include delivery, source attribution, preference center, unsubscribe, and double-opt-in policy where required.
4. Add share-ready Instagram and Pinterest asset specifications, branded templates, campaign-specific landing URLs, and measurement dashboards/UTM naming conventions.
5. Complete technical SEO: truthful canonical/hreflang, metadata, XML sitemap dates from content, Product/Book/Breadcrumb/Article JSON-LD, internal-link modules, and social image generation.

**Exit criteria:** one localized campaign can acquire a consented lead, deliver a free asset, attribute its source, and send the reader to an accessible, fast product path.

## Phase 5 — Series, gifts, and subscriptions

1. Design series ordering, purchase options, and entitlement behavior.
2. Design gifts: recipient identity/delivery timing, redemption, cancellation/refund, and fraud/privacy handling.
3. Define subscriptions only after billing and entitlement rules are approved: plan terms, renewal, grace/failure states, cancellation, and catalog access scope.
4. Add account controls and transactional communication before launching recurring billing.

**Exit criteria:** no recurring or gift entitlement depends on an ambiguous manual process; customer messaging and support paths are present.

## Ongoing quality gates

- Run `npm run build`, `npm run lint`, and `npm run typecheck` after frontend changes.
- Test keyboard navigation, screen reader announcements, 200% zoom, reduced motion, touch targets, and target viewport sizes.
- Track Core Web Vitals and avoid introducing blocking third-party marketing scripts.
- Review all payment, authentication, storage, role, and migration changes separately for security.
- Validate SEO, social previews, canonical URLs, and localized paths before each campaign release.

## Exact next recommended task

Implement the missing `/categories` and `/categories/[slug]` routes using the existing mock catalogue and shared `BookCard`/`Container` components, then update the header/footer/homepage category links and sitemap so no category link returns 404. This is a contained frontend task, requires no schema or migration change, and should include responsive and accessibility verification.

