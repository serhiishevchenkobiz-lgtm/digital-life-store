import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { getCategories, getCategory } from "@/lib/catalog";

interface Params { params: { slug: string } }

export function generateStaticParams() { return getCategories().map((category) => ({ slug: category.slug })); }

export function generateMetadata({ params }: Params): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} Books`,
    description: `Browse ${category.name.toLowerCase()} books arranged by section, topic and shelf.`,
  };
}

export default function CategoryPage({ params }: Params) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  return (
    <main className="py-8 sm:py-12 md:py-16">
      <Container>
        <nav aria-label="Breadcrumb" className="breadcrumbs"><Link href="/">Home</Link><span className="breadcrumb-separator">›</span><Link href="/categories">Categories</Link><span className="breadcrumb-separator">›</span><span>{category.name}</span></nav>

        <header className="rounded-2xl border border-[#dccfae] bg-gradient-to-br from-[#eef2e8] via-[#fffaf0] to-[#f7edd7] p-6 shadow-sm sm:p-9">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a97820]">Category shelf</p>
          <h1 className="font-serif text-4xl font-medium leading-tight text-[#17354a] sm:text-5xl">{category.name}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#5d6f78]">This shelf is the buyer&apos;s doorway into {category.name.toLowerCase()}. Start with a section, narrow to a topic, then choose the book that fits.</p>
        </header>

        {category.sections?.length > 0 ? category.sections.map((section) => (
          <section key={section.slug} className="mt-7 rounded-2xl border border-[#dccfae] bg-[#fffaf0] p-5 sm:p-7" aria-labelledby={`section-${section.slug}`}>
            <div className="section-rule"><span id={`section-${section.slug}`}>{section.name}</span></div>
            {section.topics?.map((topic) => <div key={topic.slug} className="mt-5 rounded-xl border border-[#e1d7bf] bg-[#f8f0e0] p-4 sm:p-5">
              <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#a97820]">Topic shelf</p><h3 className="font-serif text-2xl text-[#17354a]">{topic.name}</h3></div><span className="text-xs text-[#88949a]">{topic.books.length} title{topic.books.length === 1 ? "" : "s"}</span></div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{topic.books.map((book) => <BookCard key={book.slug} book={book} />)}</div>
            </div>)}
          </section>
        )) : <section className="mt-7 rounded-2xl border border-[#dccfae] bg-[#fffaf0] p-7"><h2 className="font-serif text-2xl">This shelf is waiting for its first title.</h2><p className="mt-2 text-[#5d6f78]">Browse the full catalogue while more books are being prepared.</p><div className="mt-5"><Button href="/full-book" variant="outline">Open Full Book</Button></div></section>}
      </Container>
    </main>
  );
}
