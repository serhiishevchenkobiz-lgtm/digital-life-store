import type { Metadata } from "next";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { StoreSidebar } from "@/components/store-sidebar";
import { books, getCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Browse Digital Books",
  description: "Browse eBooks, audio editions and bundles by title, author, category, topic and format.",
};

export default function BooksPage({ searchParams }: { searchParams: { q?: string } }) {
  const categories = getCategories();
  const query = searchParams.q?.trim() ?? "";
  const normalizedQuery = query.toLowerCase();
  const matchingBooks = normalizedQuery
    ? books.filter((book) => [book.title, book.subtitle, book.author, book.category, book.section, book.topic, book.shortDescription].some((value) => value.toLowerCase().includes(normalizedQuery)))
    : books;

  return (
    <div className="store-shell">
      <StoreSidebar />
      <main className="store-main">
        <section className="page-banner"><Container>
          <nav aria-label="Breadcrumb" className="breadcrumbs mb-2"><Link href="/">Home</Link><span className="breadcrumb-separator">›</span><span>Books</span></nav>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#a97820]">Browse</p>
          <h1 className="font-serif text-4xl font-medium text-[#17354a]">Books, shelves and formats.</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#5d6f78]">Search by title, author, category or topic, then open a book page for its complete format and reading options.</p>
        </Container></section>

        <Container className="books-page-inner pb-12">
          <div className="results-toolbar">
            <div><p className="results-count">Showing {matchingBooks.length} title{matchingBooks.length === 1 ? "" : "s"}{query ? ` for “${query}”` : ""}</p></div>
            <label className="sort-control"><span className="sr-only">Sort results</span><select defaultValue="alpha"><option value="alpha">Alphabetical</option><option value="newest">Newest first</option><option value="price">Price</option></select></label>
          </div>

          <div className="books-results-layout">
            <section aria-label="Book results">
              {matchingBooks.length > 0 ? <div className="result-list">{matchingBooks.map((book) => <ResultRow key={book.slug} book={book} />)}</div> : <section className="empty-results"><h2 className="font-serif text-2xl">No matching books</h2><p className="mt-2 text-[#5d6f78]">Try a broader title, author, category or topic.</p><Button href="/books" variant="outline" className="mt-4">Browse all books</Button></section>}
            </section>

            <aside className="filter-panel" aria-label="Browse filters">
              <h2>Refine your browse</h2>
              <label className="block"><span className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#88949a]">Search</span><input aria-label="Search within books" defaultValue={query} placeholder="Title, author or topic" className="w-full" /></label>
              <div className="filter-group"><h3>Category</h3><select defaultValue="all" aria-label="Category"><option value="all">All categories</option>{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select></div>
              <div className="filter-group"><h3>Book format</h3><label><input type="checkbox" defaultChecked /> eBook</label><label><input type="checkbox" /> Audio</label><label><input type="checkbox" /> Bundle</label></div>
              <Link href="/full-book" className="secondary-action mt-4 w-full">Open Full Book →</Link>
            </aside>
          </div>
        </Container>
      </main>
    </div>
  );
}

function ResultRow({ book }: { book: (typeof books)[number] }) {
  const formats = book.formats.map((format) => format === "ebook" ? "eBook" : format === "audio" ? "Audio" : "Bundle").join(" · ");
  return <article className="result-row"><Link href={`/books/${book.slug}`} className="result-cover" aria-label={`${book.title} — details`}><img src={`/covers/${book.slug}.svg`} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /><div className="result-cover-fallback"><span>{book.title}</span></div></Link><div className="result-copy"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a97820]">{book.category} · {book.topic}</p><h2><Link href={`/books/${book.slug}`} className="hover:text-[#956d20]">{book.title}</Link></h2><p className="result-subtitle">{book.subtitle}</p><p className="result-meta">{book.author} · {book.pages} pages · {formats}</p><p className="result-description">{book.shortDescription}</p><div className="result-actions"><Button href={`/books/${book.slug}`}>View book</Button><Link href={`/books/${book.slug}`} className="wishlist-action">Details →</Link></div></div></article>;
}
