# Catalog & Shelf Architecture

## Store promise
Every book belongs to a visible path. The storefront should never present the catalog as a loose pile of cards.

`Full Book` → `Category` → `Section` → `Topic` → `Shelf` → `Book`

A book may also surface on the home page as a recommendation, but its canonical home remains its taxonomy shelf.

## Shelf rules

1. Categories are stable customer-facing entry points.
2. Sections group related subjects inside a category.
3. Topics are the smallest browseable grouping.
4. Every shelf is ordered alphabetically by localized book title unless the editor explicitly selects a merchandising order for a campaign shelf.
5. A new book must have one canonical category, section, and topic before publication.
6. A category page shows its sections in editorial order; a section page shows its topics in editorial order; a topic shelf shows its books alphabetically.
7. Home page recommendations link directly to the relevant book and expose the category path so the buyer can continue browsing the shelf.

## Home-page pattern

The home page is a set of clear doorways rather than the whole catalog:

- First recommendation: one highlighted book with cover, short promise, category path, and a direct route to its shelf.
- Category doorways: a compact visual block for each major buyer-facing category.
- Each doorway goes to a category shelf where sections and topics are laid out in order.
- Full Book opens the complete taxonomy view.
- Editorial rails may show selected books, but they do not replace taxonomy.

## Current prototype taxonomy

- Home → Living Spaces → Home Environment
- Lifestyle → Everyday Life → Routines & Habits
- Lifestyle → Rituals & Wellbeing → Daily Rituals
- Mind → Attention & Thinking → Focus
- Productivity → Planning & Organization → Daily Systems
- Productivity → Planning & Organization → Sustainable Planning

This is a prototype taxonomy for the current fictional catalog. Production taxonomy will be managed from the admin dashboard and stored in the database.

## Future admin behavior

The administrator will assign a book to its canonical category, section, and topic from the book editor. Publishing is blocked when any required taxonomy level is missing. Reordering a campaign shelf must not silently change the canonical taxonomy.
