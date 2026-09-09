import type { Metadata } from "next";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { books, getCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Books",
  description: "Explore original eBooks, audio editions, and useful reading for a considered everyday life.",
};

export default function BooksPage({ searchParams }: { searchParams: { q?: string } }) {
  const categories = getCategories();
  const query = searchParams.q?.trim() ?? "";
  const normalizedQuery = query.toLowerCase();
  const matchingBooks = normalizedQuery
    ? books.filter((book) => [book.title, book.subtitle, book.author, book.category, book.shortDescription].some((value) => value.toLowerCase().includes(normalizedQuery)))
    : books;

  return (
    <>
      <section className="border-b border-muted-line bg-night text-paper">
        <Container className="py-14 md:py-20">
          <p className="eyebrow eyebrow-light">The catalogue</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div><h1 className="max-w-3xl font-display text-display-xl">Books for a life with more attention in it.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-paper/75">Short, beautifully made books for work, home, mind, and the routines that hold it all together.</p></div>
            <p className="text-sm text-paper/60">EPUB, PDF, audio & bundles</p>
          </div>
        </Container>
      </section>

      <Container className="py-10 md:py-14">
        <nav aria-label="Book categories" className="flex flex-wrap gap-2 border-b border-muted-line pb-7">
          <Link href="/books" className={`border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${!query ? "border-ink bg-ink text-paper" : "border-muted-line hover:border-ink"}`}>All titles</Link>
          {categories.map((category) => <Link key={category.slug} href={`/categories/${category.slug}`} className="border border-muted-line px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:border-ink hover:text-accent">{category.name}</Link>)}
        </nav>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
          <div><p className="eyebrow">{query ? "Search results" : "All titles"}</p><h2 className="mt-2 font-display text-3xl">{query ? `Results for “${query}”` : "The complete shelf"}</h2></div>
          <p className="text-sm text-ink-muted">{matchingBooks.length} title{matchingBooks.length === 1 ? "" : "s"}</p>
        </div>

        {matchingBooks.length > 0 ? <div className="book-grid mt-9 md:mt-12">{matchingBooks.map((book) => <BookCard key={book.slug} book={book} />)}</div> : (
          <section className="mt-10 max-w-2xl border-l-4 border-accent bg-paper-deep p-7 md:p-10" aria-labelledby="no-results">
            <p className="eyebrow">No exact match</p><h2 id="no-results" className="mt-3 font-display text-3xl">That title is not on our shelf yet.</h2><p className="mt-3 leading-7 text-ink-soft">Try a broader topic, or explore the full catalogue instead.</p><Button href="/books" variant="outline" className="mt-6">Browse all titles</Button>
          </section>
        )}
      </Container>
    </>
  );
}
