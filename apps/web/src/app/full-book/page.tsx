import Link from "next/link";
import type { Metadata } from "next";
import { BookCard } from "@/components/book-card";
import { Container } from "@/components/container";
import { getFullBookTaxonomy } from "@/lib/catalog-taxonomy";

export const metadata: Metadata = {
  title: "Full Book Catalogue",
  description: "Browse the complete catalogue by category, section, topic and alphabetical shelf.",
};

export default function FullBookPage() {
  const categories = getFullBookTaxonomy();

  return (
    <main className="relative overflow-hidden bg-white py-6 sm:py-8">
      <div className="pointer-events-none absolute inset-2 rounded-[28px] border-2 border-sky-200 sm:inset-4" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-4 rounded-[24px] border border-emerald-200/80 sm:inset-7" aria-hidden="true" />
      <div className="pointer-events-none absolute left-7 top-8 h-7 w-7 rounded-full border-2 border-pink-300 sm:left-10" aria-hidden="true" />
      <div className="pointer-events-none absolute right-8 top-10 h-6 w-11 rounded-full border-2 border-amber-300 rotate-12 sm:right-12" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-10 left-8 h-8 w-12 rounded-full border-2 border-violet-200 -rotate-12 sm:left-12" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-7 w-7 rounded-full border-2 border-green-300 sm:right-12" aria-hidden="true" />

      <Container className="relative z-10">
        <header className="mx-auto max-w-4xl border border-slate-200 bg-gradient-to-b from-white to-sky-50/70 px-5 py-7 shadow-sm sm:px-8">
          <p className="store-kicker">Full Book</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-blue-deep sm:text-5xl">The complete bookshelf, carefully arranged.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate sm:text-base">
            Start with a category, open a section, choose a topic, then browse the shelf in alphabetical order.
            Editorial selections can appear elsewhere in the shop, but every title has a clear canonical home here.
          </p>
        </header>

        <nav className="mx-auto mt-4 flex max-w-4xl flex-wrap gap-2 border-y border-slate-200 bg-white px-3 py-3" aria-label="Catalogue categories">
          {categories.map((category) => (
            <a key={category.slug} href={`#${category.slug}`} className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-blue-deep hover:border-sky-400 hover:bg-white">
              {category.name}
            </a>
          ))}
        </nav>

        <div className="mx-auto mt-6 max-w-6xl space-y-7">
          {categories.map((category) => (
            <section key={category.slug} id={category.slug} className="scroll-mt-6 border border-slate-200 bg-white shadow-sm" aria-labelledby={`${category.slug}-title`}>
              <div className="flex items-end justify-between gap-4 border-b-2 border-sky-100 bg-sky-50/70 px-4 py-4 sm:px-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-600">Category</p>
                  <h2 id={`${category.slug}-title`} className="mt-1 text-2xl font-semibold text-blue-deep sm:text-3xl">{category.name}</h2>
                </div>
                <span className="text-xs text-slate">{category.sections.length} sections</span>
              </div>

              <div className="divide-y divide-slate-200">
                {category.sections.map((section) => (
                  <div key={section.slug} className="px-4 py-5 sm:px-6">
                    <div className="flex items-end justify-between gap-4 border-l-4 border-emerald-300 pl-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">Section</p>
                        <h3 className="mt-1 text-xl font-semibold text-blue-deep">{section.name}</h3>
                      </div>
                      <span className="text-xs text-slate">{section.topics.length} topics</span>
                    </div>

                    <div className="mt-5 space-y-6">
                      {section.topics.map((topic) => (
                        <div key={topic.slug} className="border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
                          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">Topic</p>
                              <h4 className="mt-1 text-lg font-semibold text-blue-deep">{topic.name}</h4>
                            </div>
                            <span className="text-xs text-slate">{topic.books.length} {topic.books.length === 1 ? "book" : "books"}</span>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-5">
                            {topic.books.map((book) => <BookCard key={book.slug} book={book} />)}
                          </div>
                          <Link href={`/books?q=${encodeURIComponent(topic.name)}`} className="mt-4 inline-block text-xs font-bold text-sky-700 hover:text-sky-500 hover:underline">See this topic shelf →</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
