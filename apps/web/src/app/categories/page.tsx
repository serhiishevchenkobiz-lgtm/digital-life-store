import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { getCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Book Categories",
  description: "Browse digital books by category, section and topic, then open the matching shelf.",
};

export default function CategoriesPage() {
  const categories = getCategories();
  return (
    <main className="content-page">
      <Container>
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span className="breadcrumb-separator">›</span><span>Categories</span></nav>
        <header className="editorial-panel p-7 md:p-10">
          <p className="store-kicker">Catalogue map</p>
          <h1 className="mt-2 text-4xl md:text-6xl">Find your subject shelf.</h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg leading-7">Choose a broad category first. Every category opens into ordered sections, topics and shelves instead of one long undifferentiated list.</p>
          <div className="mt-5 flex flex-wrap gap-2"><Link href="/full-book" className="primary-action">Open Full Book →</Link><Link href="/books" className="secondary-action">Browse all books</Link></div>
        </header>
        <section className="mt-8" aria-labelledby="category-list-title">
          <div className="section-rule"><span className="section-rule-mark">❀</span><h2 id="category-list-title" className="font-display text-2xl md:text-3xl">The store shelves</h2></div>
          <div className="category-card-grid mt-4">{categories.map(category => <Link href={`/categories/${category.slug}`} key={category.slug} className="category-card"><div className={`category-image category-${category.slug}`} aria-hidden="true"><span>✿</span></div><strong>{category.name}</strong><small>{category.books.length} title{category.books.length === 1 ? "" : "s"} · Open shelf →</small></Link>)}</div>
        </section>
        <section className="editorial-panel mt-8"><p className="store-kicker">Complete hierarchy</p><h2 className="font-display text-2xl md:text-3xl">Need the whole catalogue?</h2><p className="mt-2 max-w-2xl text-sm leading-6">Full Book keeps categories, sections, topics and alphabetic shelves visible as one navigable structure.</p><Link href="/full-book" className="primary-action mt-4">Open Full Book →</Link></section>
      </Container>
    </main>
  );
}
