import type { Metadata } from "next";
import { Container } from "@/components/container";
import { BookCard } from "@/components/book-card";
import { books } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Books",
  description:
    "The complete Digital Life Press catalogue — eBooks, audio editions and bundles, organised by season and topic.",
};

export default function BooksPage() {
  const categories = Array.from(new Set(books.map((b) => b.category)));

  return (
    <Container className="py-14 md:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow">Catalogue</p>
        <h1 className="mt-4 font-display text-display-xl text-balance">
          The full catalogue.
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Every title is hand-edited, designed in three formats, and narrated
          for the audio edition at a humane pace. Filter by topic or browse the
          full shelf below.
        </p>
      </header>

      <nav aria-label="Categories" className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <a
            key={c}
            href={`#${c.toLowerCase()}`}
            className="text-xs uppercase tracking-[0.18em] px-3 py-2 rounded-full border border-muted-line text-ink-soft hover:text-ink hover:border-ink/40 transition-colors"
          >
            {c}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-16">
        {categories.map((category) => {
          const subset = books.filter((b) => b.category === category);
          return (
            <section key={category} id={category.toLowerCase()} aria-labelledby={`h-${category}`}>
              <div className="flex items-end justify-between gap-6 mb-8">
                <h2 id={`h-${category}`} className="font-display text-3xl">
                  {category}
                </h2>
                <p className="text-xs uppercase tracking-[0.18em] text-ink-muted tabular">
                  {subset.length} title{subset.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {subset.map((book) => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}