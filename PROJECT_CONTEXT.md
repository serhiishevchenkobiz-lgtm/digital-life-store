@'
# DIGITAL LIFE STORE â€” PROJECT CONTEXT

## 1. PROJECT VISION
Create a premium multilingual digital publishing ecosystem focused on practical life content:
- eBooks
- Audio versions
- Useful free content
- Articles
- Checklists
- Worksheets
- Social content
- Educational/lifestyle media

The product is a personal project initially.
No Amazon Kids publishing at this stage.

## 2. PRIMARY LANGUAGE
Canonical content language: EN-US.

All other languages are derived from EN-US.
Translations must preserve:
- meaning
- tone
- structure
- SEO intent
- cultural appropriateness
- layout usability

## 3. DESIGN DIRECTION
Target visual language:
PREMIUM EDITORIAL + MODERN LIFESTYLE + 2.5D

Principles:
- professional studio-grade appearance
- elegant typography
- strong visual hierarchy
- premium spacing and grids
- layered 2.5D objects
- subtle depth
- restrained motion
- high-quality editorial imagery
- sophisticated book covers
- visual consistency across products
- avoid cheap/template-like AI aesthetics
- avoid excessive 3D, clutter, gradients and animation

Preferred creative direction:
Life Objects / Editorial Future hybrid.

## 4. RESPONSIVE DESIGN
Design mobile-first.

Required targets:
- small mobile
- large mobile
- tablet portrait
- tablet landscape
- laptop
- desktop
- large desktop

Every page and component must be tested at multiple viewport sizes.

Do not rely on mouse-only interactions.
Keyboard navigation must work.
Touch targets must be practical.
No horizontal overflow on normal layouts.

Accessibility target:
WCAG 2.2 AA.

## 5. PERFORMANCE
Performance is a product requirement, not a later optimization.

Rules:
- minimize client-side JavaScript
- prefer server rendering where appropriate
- lazy-load non-critical media
- optimize images
- use responsive image sizes
- avoid unnecessarily heavy libraries
- avoid autoplay video/audio
- optimize fonts
- use caching/CDN capabilities
- avoid layout shifts
- monitor real and lab performance
- keep 2.5D effects lightweight and progressively enhance them
- provide reduced-motion behavior

## 6. SEO
SEO is built into architecture from day one.

Requirements:
- semantic HTML
- crawlable navigation
- clean URL structure
- canonical URLs
- hreflang for multilingual pages
- XML sitemap
- robots.txt
- metadata
- Open Graph
- social preview metadata
- structured data where appropriate
- product structured data
- article structured data
- breadcrumb structured data
- strong internal linking
- category/topic architecture
- search-intent mapping
- helpful original content
- descriptive image alt text
- proper headings
- indexation control
- duplicate-content prevention

SEO content must serve users first, not search-engine manipulation.

## 7. SMM / CONTENT DISTRIBUTION
Every major content asset should support multi-format repurposing.

One book may generate:
- blog articles
- short posts
- social carousels
- short-form video scripts
- YouTube topics
- Pinterest content
- email content
- checklists
- quotes
- educational snippets
- FAQs

Each social platform requires native formatting rather than blind duplication.

Rules:
- useful content first
- no spam
- no engagement bait without value
- strong hooks
- clear CTA
- consistent brand voice
- consistent visual identity
- content calendar
- analytics-driven iteration
- reusable templates
- batch production where practical

## 8. CONTENT PRODUCTION
Book pipeline:

IDEA
-> RESEARCH
-> AUDIENCE
-> BOOK PROMISE
-> OUTLINE
-> CHAPTER PLAN
-> DRAFT
-> EDITORIAL REVIEW
-> FACT CHECK
-> CONSISTENCY CHECK
-> HUMAN REVIEW
-> FINAL EN-US
-> TRANSLATION
-> AUDIO
-> EPUB/PDF
-> COVER
-> PRODUCT PAGE
-> SEO
-> SOCIAL CONTENT

AI output must be treated as a draft until reviewed.

## 9. PRODUCT ARCHITECTURE
Main site areas:

HOME
BOOKS
AUDIO
CATEGORIES
FREE LIBRARY
BLOG / ARTICLES
BUNDLES
ABOUT
MY LIBRARY
ACCOUNT

Admin:

DASHBOARD
BOOKS
CONTENT
AUDIO
MEDIA
ORDERS
CUSTOMERS
SEO
MARKETING
ANALYTICS
SETTINGS
SECURITY

## 10. TECHNICAL DIRECTION
Preferred initial stack:

Frontend:
- Next.js
- TypeScript
- Tailwind CSS

Backend:
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Edge Functions where justified

Hosting/CDN:
- Cloudflare where practical

Source control:
- Git
- GitHub

Development:
- VS Code
- CLI-first when this is simpler and safer

AI coding:
- Qwen Code / suitable coding model after environment verification
- other connected AI tools when useful

## 11. ZERO-BUDGET PRINCIPLE
Initial operating target: $0 recurring cost.

Use free tiers and free/open-source tooling whenever technically practical.

Paid services must NOT be assumed.

When a paid feature is encountered:
1. identify it
2. determine whether it is actually necessary
3. search for a free alternative
4. search for an open-source/self-hosted alternative
5. search for a free tier
6. only present paid use as a future optional upgrade

Do not build architecture that depends on expensive services during the MVP phase.

## 12. SECURITY
Security requirements:
- admin account protected by Google authentication + TOTP MFA
- no phone number dependency
- least-privilege access
- secure sessions
- private paid files
- signed/temporary download URLs
- server-side secrets
- no secrets committed to Git
- never expose service-role credentials to clients
- database Row Level Security
- explicit authorization for admin functions
- validate webhooks
- validate uploaded files
- protect admin routes
- audit security-sensitive changes

## 13. ADMIN AUTH
Admin flow target:

Google authentication
-> Supabase Auth
-> TOTP MFA
-> admin authorization
-> Admin Dashboard

Normal users must not gain admin privileges.

Authorization must never depend on editable user profile metadata.

## 14. DIGITAL PRODUCTS
Products may contain:
- EPUB
- PDF
- audio
- bonus files
- worksheets
- previews

Paid assets must live in private storage.

Free previews may be public.

## 15. DATA MODEL DIRECTION
Likely entities:

users
profiles
roles
books
book_translations
chapters
chapter_translations
audio
audio_translations
categories
products
product_assets
previews
orders
order_items
purchases
downloads
coupons
articles
article_translations
tags
media
analytics_events

Final schema must be reviewed before implementation.

## 16. AI AGENT PRINCIPLES
Agents must have limited responsibilities.

Possible agents:
- project-director
- research-agent
- writing-agent
- editor-agent
- fact-check-agent
- translation-agent
- audio-agent
- design-agent
- frontend-agent
- backend-agent
- seo-agent
- smm-agent
- qa-agent
- security-agent

Agents must follow project rules.

No agent should make uncontrolled production changes.

## 17. CHANGE CONTROL
Preferred workflow:

PLAN
-> CHANGE
-> TEST
-> REVIEW
-> COMMIT
-> DEPLOY

Destructive actions require explicit human confirmation.

Database, authentication, payments, production deployment and security changes receive extra review.

## 18. USER WORKFLOW
The project owner has limited software-development experience.

Instructions must therefore be:
- in Russian
- step-by-step
- one major action at a time
- explain where to click
- explain what should appear
- give exact terminal commands when useful
- never assume advanced knowledge
- never skip important intermediate steps
- ask for command output when diagnostics are needed

When a UI operation is complicated, guide the user click-by-click.

Never request passwords or secret credentials in chat.

## 19. CLOUD-FIRST PRINCIPLE
Prefer cloud services when they:
- reduce local resource usage
- reduce installation complexity
- improve reliability
- provide a free tier
- simplify deployment

The local PC should remain lightweight.

## 20. QUALITY STANDARD
The project should aim for:

PRODUCT QUALITY:
premium
coherent
usable
trustworthy
accessible

DESIGN QUALITY:
studio-grade
editorial
distinctive
modern
2.5D
responsive

TECHNICAL QUALITY:
maintainable
secure
performant
SEO-ready
testable

CONTENT QUALITY:
useful
original
well-researched
well-edited
multilingual
human-reviewed

MARKETING QUALITY:
valuable
native to each platform
consistent
measurable
non-spammy

## 21. CURRENT HARDWARE CONSTRAINTS
Known local environment:
- Windows 11 Pro 64-bit
- Intel Xeon E5-2650 v2
- 8 cores / 16 threads
- approximately 8 GB RAM
- NVIDIA GTX 650 2 GB
- approximately 329 GB free disk space

Do not assume this machine should run heavy local AI models.

## 22. CURRENT DEVELOPMENT TOOLS
Verified:
- VS Code 1.135.0
- Git 2.55.0
- Node.js 24.19.0
- npm 11.17.0 via npm.cmd
- WSL command available
- winget available

## 23. PROJECT STATUS
Current phase:
PHASE 0 â€” FOUNDATION

Completed:
- product concept
- broad ecosystem architecture
- zero-budget strategy
- cloud-first direction
- local PC diagnostics
- Git installation
- Node.js installation
- project directory creation

Current next objectives:
1. Create project memory files
2. Initialize Git repository
3. Configure Git identity safely
4. Connect GitHub
5. Decide cloud architecture
6. Set up Supabase
7. Set up deployment
8. Establish design system
9. Build first prototype
10. Create first book

## 24. NON-NEGOTIABLE PRINCIPLE
Do not optimize for speed at the expense of security, maintainability, accessibility, content quality or user experience.

