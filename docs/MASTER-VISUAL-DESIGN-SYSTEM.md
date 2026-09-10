# Master Visual Design System

Status: APPROVED VISUAL DIRECTION — 2026-09-10

## Core visual idea
A warm, premium digital bookstore that feels like an elegant illustrated reading room and a refined botanical stationery set. The design is editorial and welcoming, with a cream paper base, botanical ornament, restrained gold accents, deep readable ink, sage/green secondary accents, soft blue-green support tones, rounded cards, subtle depth and generous but controlled spacing.

The reference concept is the approved visual direction, not a pixel-for-pixel copy of another store.

## Global page frame
Every customer-facing page should share the same visual language:

- Full-width page canvas with an ornamental botanical border around the usable page area.
- Floral corner clusters and thin winding botanical lines; decorative, elegant, never visually noisy.
- Internal section separators may use fine ornamental rules with a small central botanical motif.
- Main content remains wide and usable; no permanently empty side gutters.
- Decorative elements must not reduce readability, accessibility or responsive usability.

## Palette and typography
- Base: warm ivory/cream rather than stark white.
- Primary ink: deep blue-green/navy for strong contrast and trustworthy bookstore character.
- Secondary: sage, muted teal and warm botanical greens.
- Accent: restrained antique-gold / honey tones for calls to action and ornaments.
- Optional soft blush and pale blue botanical accents.
- Display typography: refined editorial serif for major headings and brand expression.
- Interface/body typography: highly legible sans-serif with larger default text than the current prototype.
- Avoid tiny helper text except for metadata that genuinely needs secondary hierarchy.

## Header
Persistent across customer pages.

- Original logo/brand mark; do not use eBooksPress or another reference-brand imitation.
- Main navigation centered and clearly separated.
- Search, account, wishlist and basket actions remain visible and easy to reach.
- Language selector is visible in the upper-right area and opens the supported locale list.
- Header should feel like a bookstore masthead rather than a generic SaaS navbar.

## Left navigation panel
Use on browse/catalog-style pages and the homepage when it improves discovery.

- Wider than the previous prototype.
- Larger readable labels and comfortable line-height.
- Navigation contains text + meaningful icons.
- Categories are grouped and hierarchical.
- Do not place a large book cover or promotional character in the permanent left navigation.
- Promotional content may exist as a small textual callout when useful, but it must not crowd the taxonomy.

## Right information panel
When present on desktop layouts, it is a useful content column, not a decorative void.

Recommended order:
1. Discovery / useful resources with icons or compact illustrated badges.
2. Practical reader information.
3. Audio/video showcase lower in the column.
4. Knowledge-base entry point.
5. Small collapsed assistant trigger at the bottom.

The media player should be compact and proportionate, never stretched across most of the page merely because it exists.

## Homepage composition
The homepage is a curated entrance into the store, not the full catalogue dump.

1. Hero / visual storefront facade.
2. Featured Book with category → section → topic path.
3. Shop by Category with meaningful thematic imagery.
4. Just Arrived / selected shelves with compact cards.
5. Audio + Video showcase in a dedicated compact block.
6. Additional editorial category or discovery block.
7. Footer.

The homepage should make it obvious what a visitor can click next and where that click leads.

## Catalogue architecture
Canonical route:

`Full Book → Category → Section → Topic → Shelf → Book`

Each newly published book must have a canonical category, section and topic. Topic shelves are alphabetically ordered by localized title unless an explicitly managed campaign shelf overrides merchandising order without changing canonical taxonomy.

## Book cards and shelves
- Covers should feel like physical books with light 2.5D depth and soft shadows.
- Prefer thematic illustration/photography over generic geometric placeholders.
- Cards should be compact but readable.
- Title gets clear emphasis; supporting text is limited.
- Shelves should be visually separated from neighboring shelves.
- Desktop shelves can use horizontal arrows when more books exist than fit on screen.
- Arrow movement should have a brief, subtle transition and should return cleanly to the first/last position.

## Category pages
Every major customer category becomes a mini-storefront within the common frame:

- Category title and visual identity.
- Short editorial introduction.
- Sections in a deliberate order.
- Topics within each section.
- Themed imagery or decorative motif appropriate to the category.
- Book shelves within each topic, alphabetically ordered.
- Breadcrumb/path visibility.

Category pages should never look like a raw database grid.

## Full Book page
This is the structured catalogue index.

- Clear hierarchy from category to section to topic.
- Strong visual grouping and indentation/spacing.
- Alphabetical shelf order.
- Search/filter/sort controls presented cleanly.
- Full Book is the place where the visitor can understand the entire store structure.

## Product/book page
The book is presented as a premium reading product:

- Large thematic cover with 2.5D presentation.
- Title, author, category path and concise promise.
- Format options: visual ebook, audio, bundle when available.
- Clear purchase controls.
- Audio sample/player where available.
- Book preview / reading experience entry.
- Related books and non-intrusive cross-sell suggestions.
- Trust, accessibility and compatibility information.

## Reader
The reader is a combined content experience:

- Visual book reading in the page.
- Embedded audio player for MP3 narration.
- Play / Pause / Stop and progress controls inside the reading experience.
- Responsive layout for desktop, tablet and phone.
- Accessible controls and readable text.

## AI Book Assistant
The assistant is a subtle optional storefront companion.

Default state:
- Small translucent character/icon trigger near the lower corner.
- Short invitation text such as “How may I help?”
- It should not dominate the page.

Open state:
- Book/category questions.
- Knowledge-base answers grounded in store content.
- Recommendations and gentle related-book upsell.
- Locale follows the visitor-selected language.

Behavior:
- May appear after a non-intrusive delay.
- Stays open while the visitor is actively interacting.
- Closes after approximately 10 minutes of inactivity.
- After closing, it should not continuously reappear without a useful reason.

The AI assistant must never become the source of truth for payment, refund, entitlement or access decisions.

## Multilingual UX
Canonical source language is EN-US.

- Language selector visible in the header.
- Supported locales are database-backed, not browser auto-translation.
- At minimum the architecture supports EN-US, UK-UA, PL-PL, DE-DE, ES-ES and FR-FR.
- Category names, book text, navigation, help content, metadata and editorial content should have localized versions where applicable.
- Switching locale updates the active page content rather than redirecting to machine-translated browser overlays.

## Footer
Footer must feel like part of the bookshop, not an afterthought.

- Brand mark and short store statement.
- Clearly separated link groups.
- Contact.
- Help/support.
- Legal/accessibility/privacy.
- Social icons linked to real business profiles once those profiles are established.
- Newsletter/free-book signup area.
- Thin botanical separators and subtle ornaments.

## Admin dashboard
The private admin area follows the same brand family but uses a more utilitarian information architecture.

Primary modules include:
Dashboard, Books, Authors, Categories, Sections, Topics, Collections, Series, Products, Orders, Customers, Payments, Entitlements, Downloads, Gifts, Coupons, Promotions, Subscriptions, Blog, Landing Pages, Translations, SEO, Social, Email, Analytics, Settings, Roles and Audit Log.

The admin UI may be denser than customer pages, but it should remain readable and professionally organized.

## Page-family roadmap
Customer-facing pages:
- Home
- Full Book
- Category
- Section
- Topic/Shelf
- Browse/Search
- Book/Product detail
- Reader
- Cart/Basket
- Checkout
- Gifts
- Free Library
- My Library
- Wishlist
- Account sign-in/sign-up/profile
- Help / Knowledge Base
- Contact
- About
- Blog / Article
- Feedback
- Legal / Accessibility / Privacy / Terms / Copyright

Commercial/operational pages:
- Admin Dashboard and management modules listed above.

## Design QA rule
No page is considered visually finished merely because it compiles.

Required review cycle:
`Design → Implement → Browser inspect → 390/768/1024/1440/1920 review → Correct → Recheck`

Every page family must retain the common frame, typography, navigation language, ornamental system and spacing discipline while adapting its composition to its purpose.
