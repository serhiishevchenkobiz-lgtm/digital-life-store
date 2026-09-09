# Repository guidance

- Treat this repository as a Next.js storefront and Supabase backend project.
- Preserve `supabase/migrations/` and never edit environment or secret files unless a task explicitly authorizes it.
- Keep customer-facing work accessible (WCAG 2.2 AA), responsive, localization-ready, secure, and performance-conscious.
- Prefer server-rendered data and existing shared components before adding client-side code or dependencies.
- Run the relevant existing `npm run` validation commands after application changes.
