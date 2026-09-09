# Product architecture audit

## Scope and current state

Digital Life Press is positioned as an international digital bookstore and publishing ecosystem. The repository currently contains a polished static storefront prototype, a six-book in-memory catalogue, Supabase schema and client wiring, magic-link authentication, and a protected-download flow. It is not yet a transacting store: there is no cart, checkout, payment provider, or live catalogue query.

eBooks.com is an architectural reference for a broad bookstore model (discoverability, catalogue, product formats, account library, and fulfilment). Leadpages ebook pages are a reference for focused, single-goal campaign pages. Neither is a source of design, copy, code, or assets.

## Target customer ecosystem

### Storefront and discovery

- **Homepage:** editorial brand proposition, seasonal merchandising, featured titles, category entry points, social proof, promotional modules, and email acquisition.
- **Catalogue and search:** browse all product types; full-text search; filters for category, format, language, series, price, availability, and promotion; sort by relevance, newest, and price.
- **Categories:** landing pages for editorial categories, curated reading paths, and internal links to titles and related articles.
- **Product pages:** localized book detail, samples or previews, formats, pricing, related titles, format comparison, accessibility/download information, reviews when available, and Product/Book structured data.
- **Campaign landing pages:** route-scoped, conversion-focused pages for a book, bundle, seasonal offer, or social campaign. Each has one primary CTA, a minimal navigation policy, its own attribution, and no copy/design reuse from reference sites.
- **Free-book email funnel:** a dedicated lead-magnet page captures explicit marketing consent, delivers the free book or sample, tags the source/campaign, sends a transactional delivery email, then runs an opt-in nurture sequence. The present Free Library is intentionally ungated and is therefore separate from this proposed funnel.

### Commerce and fulfilment

- **Cart and promotion engine:** one cart per visitor/account, format-aware line items, tax/currency calculation, coupon and gift-code support, and an explicit "10% off when three eligible books are bought in one payment" rule. Eligibility, discount amount, and exclusions must be calculated server-side and displayed before payment.
- **Secure checkout:** a payment provider creates and confirms the payment; a verified server-side webhook creates paid orders, order items, and purchases idempotently. Checkout must never grant purchases from client state or redirect state alone.
- **Digital delivery:** paid files remain private. The account library authorizes each asset, issues a short-lived signed URL, and logs issuance. Download entitlements must support eBook, audio, bundles, and companion assets.
- **Gifts and promotions:** gift purchases use a recipient email and delayed or immediate delivery, without exposing the buyer's library. Promotions need effective dates, eligible products, redemption limits, and clear localized terms.

### Retention, content, and marketing

- **Account and library:** passwordless sign-in initially, purchase history, downloads, receipts, profile locale, consent preferences, and later reading/listening progress. Customer accounts should remain distinct from protected staff roles.
- **Series and subscriptions:** series pages group books in order with individual and complete-series purchase options. A subscription is an entitlement/billing domain, not merely a UI label; define cadence, renewal, cancellation, failed-payment handling, and access rules before implementation.
- **Editorial content:** articles and free resources form SEO topic clusters and give product pages meaningful internal links.
- **Instagram and Pinterest:** campaign pages and product pages need stable, shareable social preview images, UTM-preserving links, content-specific landing routes, and source/campaign attribution. Pinterest should use tall creative assets and rich product/article metadata where supported; Instagram traffic should use concise, mobile-first landing pages. Marketing measurement must respect consent requirements.

## Information architecture and route map

| Area | Current route/status | Intended production capability |
| --- | --- | --- |
| Home | `/` implemented from mock data | international storefront, featured campaigns, email entry points |
| Catalogue | `/books` implemented; no search/filtering | search, filters, sorting, pagination, locales |
| Product | `/books/[slug]` implemented from mock data | live localized product/format/preview/cart data |
| Audio | `/audio` implemented from mock data | audio catalogue and playable accessible previews |
| Categories | linked and in sitemap, but `/categories` and `/categories/[slug]` absent | category hub and category detail pages |
| Free library | `/free-library` implemented; links are placeholders | public resources plus distinct opt-in funnel |
| Account | `/account/sign-in`, `/auth/callback`, `/library` implemented | profile, preferences, orders, receipts, consent |
| Cart/checkout | `/checkout` is linked but absent | cart, promotion calculation, secure payment, confirmation |
| Campaigns | absent | `/campaigns/[slug]` or a dedicated route group |
| Series/subscriptions | absent | series detail and subscription management |
| Gifts/promotions | absent | gift purchase/redeem and promotion pages |
| Journal/legal/contact | linked in footer but absent | editorial, trust, support, privacy, terms |
| Admin | not implemented; excluded in robots | protected staff interface, only after authorization design |

## Domain boundaries

The current schema supports profiles, staff roles, categories, books and translations, products, orders, purchases, downloads, articles, and translations. Keep the following responsibilities distinct as the product grows:

1. **Catalog/content:** titles, translations, categories, product formats, previews, editorial articles, and SEO metadata.
2. **Commerce:** cart state, promotion eligibility, checkout sessions, orders, payment-event verification, refunds, gifts, and tax/currency policy.
3. **Entitlements:** purchases, bundle expansion, subscription access, revocation/refund policy, and signed asset delivery.
4. **Identity and consent:** authentication, profile locale, marketing consent, customer preferences, and staff roles.
5. **Campaign and analytics:** campaign definitions, landing content, UTM/source attribution, lead source, and privacy-respecting measurement.

New capabilities should be designed and reviewed in these boundaries before any database migration is proposed. This audit makes no schema recommendation that should be applied now.

## Internationalization, SEO, accessibility, and performance requirements

- EN-US remains canonical. Localized routes or locale negotiation must have one canonical URL per language, `hreflang` alternatives only for real translated pages, localized metadata/currency/formatting, and no placeholder locale paths.
- Search and category URLs should be crawl-safe and canonicalized. Product, breadcrumb, article, organization, and offer structured data must be truthful and tied to live data.
- Each conversion path must work with keyboard, screen reader, touch, zoom, and reduced-motion settings. Form errors must be announced and checkout should avoid time-based or color-only instructions.
- Favor server components, cache catalog queries deliberately, use optimized responsive images, reserve media dimensions, limit third-party scripts, and measure Core Web Vitals across desktop, tablet, and mobile.

## Audit finding

The current product direction is coherent, but the implementation is at a prototype/foundation stage. The priority is to make the core catalogue-to-secure-checkout-to-library journey real before adding series, subscriptions, gifts, or marketing automation.

