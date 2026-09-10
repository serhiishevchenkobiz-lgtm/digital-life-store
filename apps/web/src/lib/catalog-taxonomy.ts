import { books, categorySlug, type Book } from "@/lib/catalog";

export interface TaxonomyTopic {
  name: string;
  slug: string;
  books: Book[];
}

export interface TaxonomySection {
  name: string;
  slug: string;
  topics: TaxonomyTopic[];
}

export interface TaxonomyCategory {
  name: string;
  slug: string;
  sections: TaxonomySection[];
}

const prototypePaths: Record<string, { category: string; section: string; topic: string }> = {
  "the-quiet-architecture": { category: "Lifestyle", section: "Everyday Life", topic: "Routines & Habits" },
  "the-compass-and-the-cup": { category: "Lifestyle", section: "Rituals & Wellbeing", topic: "Daily Rituals" },
  "letters-on-attention": { category: "Mind", section: "Attention & Thinking", topic: "Focus" },
  "a-small-book-of-routines": { category: "Productivity", section: "Planning & Organization", topic: "Daily Systems" },
  "tides-and-small-tasks": { category: "Productivity", section: "Planning & Organization", topic: "Sustainable Planning" },
  "the-house-you-live-in": { category: "Home", section: "Living Spaces", topic: "Home Environment" },
};

export function getBookPath(book: Book) {
  return prototypePaths[book.slug] ?? {
    category: book.category,
    section: "More from this category",
    topic: "Browse this topic",
  };
}

function alpha<T extends { name: string }>(items: T[]) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
}

export function getFullBookTaxonomy(): TaxonomyCategory[] {
  const grouped = new Map<string, Map<string, Map<string, Book[]>>>();

  for (const book of books) {
    const path = getBookPath(book);
    const sections = grouped.get(path.category) ?? new Map<string, Map<string, Book[]>>();
    const topics = sections.get(path.section) ?? new Map<string, Book[]>();
    const shelf = topics.get(path.topic) ?? [];
    shelf.push(book);
    topics.set(path.topic, shelf);
    sections.set(path.section, topics);
    grouped.set(path.category, sections);
  }

  return alpha(Array.from(grouped, ([category, sections]) => ({
    name: category,
    slug: categorySlug(category),
    sections: alpha(Array.from(sections, ([section, topics]) => ({
      name: section,
      slug: categorySlug(section),
      topics: alpha(Array.from(topics, ([topic, shelfBooks]) => ({
        name: topic,
        slug: categorySlug(topic),
        books: [...shelfBooks].sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" })),
      }))),
    }))),
  })));
}
