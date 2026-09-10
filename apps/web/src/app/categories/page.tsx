import type { Metadata } from "next";
import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { Container } from "@/components/container";
import { getCategories } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Book Categories",
  description: "Browse digital books by category, section and topic, then open the matching shelf.",
};

export default function CategoriesPage() {
  const categories = getCategories();
  return (
    <main className="py-8 sm:py-12 md:py-16">
      <Container>
        <header className="rounded-2xl border border-[#dccfae] bg-gradient-to-br from-[#eef2e8] via-[#fffaf0] to-[#f7edd7] p-6 shadow-sm sm:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a97820]">Catalogue</p>
          <h1 className="font-serif text-4xl font-medium leading-tight text-[#17354a] sm:text-5xl">Browse by category.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#5d6f78]">Choose a customer-facing category first. Every category opens into ordered sections, topics and shelves instead of one long undifferentiated list.</p>
          <div className="mt-5 flex flex-wrap gap-2"><Link href="/full-book" className="inline-flex min-h-10 items-center rounded-full bg-[#b8862f] px-4 text-sm font-bold text-white">Open Full Book →</Link><Link href="/books" className="inline-flex min-h-10 items-center rounded-full border border-[#c8b57f] bg-[#fffaf0] px-4 text-sm font-bold text-[#17354a]">Browse all books</Link></div>
        </header>

        {categories.length > 0 ? <section className="mt-7" aria-labelledby="category-list-title">
          <div className="section-rule"><span id="category-list-title">The store shelves</span></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const featuredBook = category.books[0];
              return <Link href={`/categories/${category.slug}`} key={category.slug} className="group rounded-2xl border border-[#dccfae] bg-[#fffaf0] p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b8862f] hover:shadow-md">
                <div className="rounded-xl border border-[#e0d5bc] bg-[#f5ecda] p-4"><BookCover palette={featuredBook.cover.palette} motif={featuredBook.cover.motif} spineLabel={featuredBook.cover.spineLabel} title={featuredBook.title} ariaLabel={`${featuredBook.title}, featured in ${category.name}`} className="mx-auto max-w-[170px]" /></div>
                <div className="mt-4"><h2 className="font-serif text-2xl font-semibold text-[#17354a] group-hover:text-[#946c1d]">{category.name}</h2><p className="mt-1 text-sm text-[#6a7a81]">{category.books.length} title{category.books.length === 1 ? "" : "s"}</p><p className="mt-3 text-xs font-bold text-[#8a671f]">Open category shelf →</p></div>
              </Link>;
            })}
          </div>
        </section> : <section className="mt-7 rounded-2xl border border-dashed border-[#c8b57f] bg-[#fffaf0] p-8"><h2 className="font-serif text-2xl">The shelves are being arranged.</h2><p className="mt-2 text-[#5d6f78]">There are no categories to browse yet.</p></section>}
      </Container>
    </main>
  );
}
