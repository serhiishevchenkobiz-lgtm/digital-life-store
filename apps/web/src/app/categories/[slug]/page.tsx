import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { getCategories, getCategory } from "@/lib/catalog";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const category = getCategory(params.slug);

  if (!category) return {};

  return {
    title: category.name,
    description: `Browse ${category.name.toLowerCase()} books from Digital Life Press.`,
  };
}

export default function CategoryPage({ params }: Params) {
  const category = getCategory(params.slug);

  if (!category) notFound();

  return (
    <Container className="py-14 md:py-20">
      <header className="max-w-3xl">
        <p className="eyebrow">Category</p>
        <h1 className="mt-4 font-display text-display-xl text-balance">
          {category.name}
        </h1>
        <p className="mt-4 text-lg text-ink-soft leading-relaxed">
          A considered shelf of books for the everyday work of {category.name.toLowerCase()}.
        </p>
      </header>

      {category.books.length > 0 ? (
        <section className="mt-12" aria-labelledby="category-books">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="category-books" className="font-display text-3xl">
              On this shelf
            </h2>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-muted tabular">
              {category.books.length} title{category.books.length === 1 ? "" : "s"}
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {category.books.map((book) => (
              <li key={book.slug}>
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="mt-12 max-w-2xl rounded-xl border border-muted-line bg-paper-bright p-8 md:p-10" aria-labelledby="empty-category">
          <p className="eyebrow">Coming soon</p>
          <h2 id="empty-category" className="mt-3 font-display text-2xl text-balance">
            This shelf is waiting for its first title.
          </h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            Browse the full catalogue while new books are being prepared.
          </p>
          <div className="mt-6">
            <Button href="/books" variant="outline">
              Browse all books
            </Button>
          </div>
        </section>
      )}
    </Container>
  );
}
