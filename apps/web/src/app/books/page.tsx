import type { Metadata } from "next";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { StoreSidebar } from "@/components/store-sidebar";
import { books, getCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Browse Books",
  description: "Browse Digital Life Press books by category, format, and topic.",
};

export default function BooksPage({ searchParams }: { searchParams: { q?: string } }) {
  const categories = getCategories();
  const query = searchParams.q?.trim() ?? "";
  const normalizedQuery = query.toLowerCase();
  const matchingBooks = normalizedQuery
    ? books.filter((book) => [book.title, book.subtitle, book.author, book.category, book.shortDescription].some((value) => value.toLowerCase().includes(normalizedQuery)))
    : books;

  return (
    <div className="store-shell">
      <StoreSidebar />
      <main className="store-main">
        <section className="page-banner">
          <Container>
            <h1>Browse eBooks</h1>
          </Container>
        </section>

        <Container className="books-page-inner">
          <div className="results-toolbar">
            <div>
              <p className="results-count">1–{matchingBooks.length} of {matchingBooks.length} results</p>
              <nav className="pagination" aria-label="Pagination">
                <span className="current">1</span>
                <span aria-hidden>2</span>
                <span aria-hidden>3</span>
                <span aria-hidden>4</span>
                <span>Next »</span>
              </nav>
            </div>
            <label className="sort-control">
              <span className="sr-only">Sort results</span>
              <select defaultValue="popular">
                <option value="popular">Sort by Popularity</option>
                <option value="newest">Newest</option>
                <option value="price">Price</option>
              </select>
            </label>
          </div>

          <div className="books-results-layout">
            <section aria-label="Book results">
              {matchingBooks.length > 0 ? (
                <div className="result-list">
                  {matchingBooks.map((book) => <ResultRow key={book.slug} book={book} />)}
                </div>
              ) : (
                <section className="empty-results">
                  <h2>No matching books</h2>
                  <p>Try a broader title, author, or category.</p>
                  <Button href="/books" variant="outline">Browse all books</Button>
                </section>
              )}
            </section>

            <aside className="filter-panel" aria-label="Filter results">
              <h2>Filter Results</h2>
              <input aria-label="Search within these results" placeholder="Search within these results" />

              <div className="filter-group">
                <h3>Date added</h3>
                <label><input type="radio" name="date" defaultChecked /> All time</label>
                <label><input type="radio" name="date" /> Last 30 days</label>
                <label><input type="radio" name="date" /> Last 90 days</label>
              </div>

              <div className="filter-group">
                <h3>Category</h3>
                <select defaultValue="all" aria-label="Category">
                  <option value="all">All</option>
                  {categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}
                </select>
              </div>

              <div className="filter-group">
                <h3>Book format</h3>
                <label><input type="radio" name="format" defaultChecked /> All</label>
                <label><input type="radio" name="format" /> PDF</label>
                <label><input type="radio" name="format" /> EPUB</label>
                <label><input type="radio" name="format" /> Audio</label>
              </div>

              <div className="filter-group">
                <h3>Language</h3>
                <select defaultValue="en">
                  <option value="en">English</option>
                </select>
              </div>

              <button type="button" className="secondary-action">Apply Filters</button>
              <p className="advanced-link">Not quite what you were looking for? <Link href="/books">Browse all categories.</Link></p>
            </aside>
          </div>
        </Container>
      </main>
    </div>
  );
}

function ResultRow({ book }: { book: (typeof books)[number] }) {
  const formats = book.formats.map((format) => format === "ebook" ? "EPUB" : format === "audio" ? "Audio" : "Bundle").join(" · ");
  return (
    <article className="result-row">
      <Link href={`/books/${book.slug}`} className="result-cover" aria-label={`${book.title} — details`}>
        <img src={`/covers/${book.slug}.svg`} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        <div className="result-cover-fallback"><span>{book.title}</span></div>
      </Link>
      <div className="result-copy">
        <h2><Link href={`/books/${book.slug}`}>{book.title}</Link></h2>
        <p className="result-subtitle">{book.subtitle}</p>
        <p className="result-meta">{book.author} · {book.pages} pages · {formats}</p>
        <p className="result-description">{book.shortDescription}</p>
        <div className="result-actions">
          <Button href={`/books/${book.slug}`}>Add to Cart</Button>
          <Link href={`/books/${book.slug}#details`} className="wishlist-action">View details</Link>
        </div>
      </div>
    </article>
  );
}
