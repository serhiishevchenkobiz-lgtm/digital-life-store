import type { Metadata } from "next";
import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { Container } from "@/components/container";
import { getCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse Digital Life Press books by topic, from attention and routines to home and everyday life.",
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <Container className="py-14 md:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow">Catalogue</p>
        <h1 className="mt-4 font-display text-display-xl text-balance">
          Browse by topic.
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          Each shelf gathers books that belong in the same part of a considered life.
        </p>
      </header>

      {categories.length > 0 ? (
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {categories.map((category) => {
            const featuredBook = category.books[0];

            return (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-muted-line bg-paper-bright p-5 md:p-6 hover:border-ink/40 transition-colors focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
                >
                  <div className="w-28 md:w-32">
                    <BookCover
                      palette={featuredBook.cover.palette}
                      motif={featuredBook.cover.motif}
                      spineLabel={featuredBook.cover.spineLabel}
                      title={featuredBook.title}
                      ariaLabel={`${featuredBook.title}, featured in ${category.name}`}
                      className="group-hover:-translate-y-1"
                    />
                  </div>
                  <div className="mt-6">
                    <h2 className="font-display text-3xl leading-tight group-hover:text-accent transition-colors">
                      {category.name}
                    </h2>
                    <p className="mt-2 text-sm text-ink-muted">
                      {category.books.length} title{category.books.length === 1 ? "" : "s"} on this shelf →
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <section className="mt-12 max-w-2xl rounded-xl border border-muted-line bg-paper-bright p-8 md:p-10" aria-labelledby="empty-categories">
          <p className="eyebrow">Coming soon</p>
          <h2 id="empty-categories" className="mt-3 font-display text-2xl text-balance">
            The shelves are being arranged.
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            There are no categories to browse yet. Please check back soon.
          </p>
        </section>
      )}
    </Container>
  );
}
