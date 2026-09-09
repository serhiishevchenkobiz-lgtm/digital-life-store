# Content, i18n, AI assets, and bookstore taxonomy

## Purpose

The storefront should follow the dense retail logic demonstrated by the reference bookstore screenshots while remaining an original Digital Life Press implementation.

Use the reference site for information architecture and merchandising patterns, not for copied branding, copy, artwork, or proprietary assets.

## Visual/content rule

The same design system applies to homepage, browse pages, category pages, book detail pages, gift pages, cart/checkout, account/library, footer, and editorial pages.

Design should be:
- dense and commerce-first;
- white / blue / light-gray as the primary interface family;
- full-width within the viewport with no permanent decorative empty side columns;
- compact typography, thin rules, clear prices, formats, and actions;
- image-led for book merchandising, with original covers and editorial graphics;
- responsive from mobile through wide desktop;
- accessible and localization-ready.

## AI production pipeline

AI is part of the production workflow, but generated content is not the source of truth for commerce.

Use separate AI tasks:
1. Brand/visual concepting: logo directions, cover-art concepts, banners, campaign graphics.
2. Image generation/editing: original book-cover art and supporting visual assets.
3. Editorial writing: human-sounding product descriptions, category introductions, landing copy, emails and blog drafts.
4. Translation/localization: first-pass translations, glossary enforcement, locale adaptation.
5. SEO: title tags, meta descriptions, structured keyword intent, internal-link suggestions.
6. QA/editorial review: factual consistency, terminology, tone, accessibility, and duplication checks.

All generated assets must be reviewed before publication. Never invent author credentials, reviews, sales numbers, awards, certifications, or customer statements.

## Brand identity

The logo must be an original AI-assisted concept for Digital Life Press. Do not reuse eBooks.com logos, marks, or distinctive artwork.

Keep the final logo in reusable vector/raster variants and use it consistently in the header, footer, email templates, social assets, and metadata.

## Human-sounding copy

Customer-facing English should read like an experienced bookseller/editor wrote it:
- concrete rather than promotional filler;
- short sentences where clarity helps;
- useful descriptions of what a reader gets;
- honest about formats, availability and delivery;
- no fake urgency;
- no machine-like repetition;
- no unsupported claims.

Translations should preserve meaning and intent, not word-for-word English syntax.

## Multilingual architecture

The database is the source of truth for localized content.

Required localized entities:
- site navigation labels;
- category and subcategory names;
- category descriptions;
- book title/subtitle/short/long description;
- authors and series metadata when localized;
- product-format labels;
- gift and promotion copy;
- checkout/account/library labels;
- blog/article title/excerpt/body;
- SEO title/description and social metadata.

Locale model:
- stable machine slug/ID is language-neutral;
- translated display fields live in translation records;
- fallback locale is English;
- no route should require translating a machine slug;
- locale selection must persist for the visitor/account.

Existing Supabase schema already contains `book_translations` and `article_translations`; category localization needs to be added without weakening the existing RLS model.

## Taxonomy strategy

Use the public bookstore reference as a taxonomy research source, then create original SEO-facing labels and hierarchy.

Reference-level themes currently useful for our taxonomy include Business, Computers/Technology, Health & Fitness, History, Mind/Body/Spirit, Religion, Science, Fiction, and broad Non-Fiction groupings. The reference also exposes deeper subjects such as Architecture, Art, Biography, Cooking, Design, Education, Relationships, Gardening, House & Home, Philosophy, Psychology, Self-Help, Social Science, Sports & Recreation, Study Aids, Technology, Travel, and True Crime.

We should not import the entire reference taxonomy. It is too broad for the current catalogue and would create empty pages.

Initial Digital Life Press taxonomy proposal:

### 01 Work, Business & Leadership
SEO focus: work, leadership, business skills, professional growth, careers

### 02 Technology & Digital Life
SEO focus: technology, digital habits, AI literacy, online life, practical tech

### 03 Health, Fitness & Wellbeing
SEO focus: healthy routines, wellbeing, fitness, rest, everyday health

### 04 Mind & Psychology
SEO focus: attention, psychology, focus, stress, habits, mental skills

### 05 Personal Growth & Self-Help
SEO focus: personal development, self-help, goals, confidence, life skills

### 06 Home & Everyday Living
SEO focus: home, routines, organization, cooking, practical everyday living

### 07 Relationships & Communication
SEO focus: relationships, communication, family life, social skills

### 08 History, Culture & Society
SEO focus: history, culture, society, ideas, contemporary life

### 09 Science & Discovery
SEO focus: science, nature, discovery, evidence-based learning

### 10 Philosophy & Ideas
SEO focus: philosophy, meaning, ethics, ideas, reflective reading

### 11 Learning & Education
SEO focus: learning, study skills, education, reference, lifelong learning

### 12 Fiction
SEO focus: fiction, literary fiction, mystery, fantasy, romance, science fiction, thrillers

## Fiction subcategory policy

Fiction should be a parent category with focused subcategories only when the catalogue has enough titles to justify them. Candidate SEO names include:
- Literary Fiction
- Mystery & Crime
- Fantasy & Speculative Fiction
- Romance
- Science Fiction
- Thrillers & Suspense
- Historical Fiction
- Young Adult Fiction

Do not create empty subcategory landing pages just to imitate a larger retailer.

## Category implementation rules

Each category page should have:
- localized name;
- SEO title and meta description;
- short editorial introduction;
- related subcategories;
- featured titles;
- newest titles;
- relevant formats;
- author links when enough data exists;
- breadcrumbs;
- structured internal links;
- pagination or progressive loading for large collections.

The sidebar may expose the taxonomy as a compact tree on desktop. On mobile it becomes a collapsible/stacked navigation block.

## Commerce boundary

AI may recommend books, explain formats, draft copy, translate, summarize and prepare marketing material.

AI must not decide final price, tax, discount eligibility, payment status, entitlement, refund state, or download authorization. Those remain deterministic application rules backed by Supabase.

## Asset storage

Original covers, campaign graphics, editorial images, and downloadable assets should be stored in the approved private/public storage architecture according to whether the asset is public marketing media or paid content. Never place secrets or private credentials in the asset repository.

## Next implementation order

1. Finish the eBooks.com-style global shell and footer.
2. Replace the temporary catalog labels with the approved taxonomy model.
3. Add localized taxonomy records and translation fallbacks.
4. Add category SEO metadata and breadcrumbs.
5. Build original AI-assisted cover/logo/marketing asset pipeline.
6. Replace temporary copy with reviewed human-sounding copy.
7. Add multilingual navigation and customer-facing UI strings.
8. Run responsive visual QA and accessibility checks.
