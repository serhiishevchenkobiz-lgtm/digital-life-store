import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { BookCover } from "@/components/book-cover";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { books, getBook } from "@/lib/catalog";
import { getBookPath } from "@/lib/catalog-taxonomy";
import { formatPrice } from "@/lib/utils";

interface Params { params: { slug: string } }

export function generateStaticParams() { return books.map((b) => ({ slug: b.slug })); }

export function generateMetadata({ params }: Params): Metadata {
  const book = getBook(params.slug);
  if (!book) return {};
  return {
    title: `${book.title} — ${book.category}`,
    description: book.shortDescription,
    openGraph: { title: book.title, description: book.shortDescription, type: "book" },
  };
}

export default function BookDetailPage({ params }: Params) {
  const book = getBook(params.slug);
  if (!book) return notFound();

  const path = getBookPath(book);
  const hasAudio = book.formats.includes("audio") && Boolean(book.audioPriceCents);
  const hasBundle = book.formats.includes("bundle") && Boolean(book.bundlePriceCents);
  const related = books.filter((b) => b.slug !== book.slug && b.category === book.category).slice(0, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "Book", name: book.title, description: book.longDescription,
      isbn: book.isbn, inLanguage: book.language, numberOfPages: book.pages, datePublished: book.publishedAt,
      author: { "@type": "Organization", name: book.author }, publisher: { "@type": "Organization", name: "Digital Life Press" },
      offers: { "@type": "Offer", price: (book.priceCents / 100).toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock", url: `${siteUrl}/books/${book.slug}` },
    },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${siteUrl}/categories` },
      { "@type": "ListItem", position: 3, name: book.category, item: `${siteUrl}/categories/${path.categorySlug}` },
      { "@type": "ListItem", position: 4, name: book.title, item: `${siteUrl}/books/${book.slug}` },
    ] },
  ];

  return (
    <div className="book-detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="py-8 sm:py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/">Home</Link><span className="breadcrumb-separator">›</span>
          <Link href="/categories">Categories</Link><span className="breadcrumb-separator">›</span>
          <Link href={`/categories/${path.categorySlug}`}>{path.category}</Link><span className="breadcrumb-separator">›</span>
          <span>{book.title}</span>
        </nav>

        <div className="grid gap-7 lg:grid-cols-[290px_minmax(0,1fr)_250px] xl:grid-cols-[330px_minmax(0,1fr)_280px]">
          <aside className="rounded-2xl border border-[#dccfae] bg-[#f6efdf] p-5 shadow-sm">
            <BookCover palette={book.cover.palette} motif={book.cover.motif} spineLabel={book.cover.spineLabel} title={book.title} className="mx-auto max-w-[250px]" />
            <div className="mt-5 border-t border-[#dccfae] pt-4 text-sm text-[#5d6f78]">
              <p className="font-semibold text-[#17354a]">Shelf path</p>
              <p className="mt-1 leading-6">{path.category} → {path.section} → {path.topic}</p>
            </div>
          </aside>

          <article>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a97820]">{book.category}</p>
            <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#17354a] sm:text-5xl">{book.title}</h1>
            <p className="mt-3 max-w-3xl font-serif text-xl leading-8 text-[#5d6f78]">{book.subtitle}</p>

            <dl className="mt-7 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-[#dccfae] bg-[#dccfae]">
              <div className="bg-[#fffaf0] p-4"><dt className="text-[11px] uppercase tracking-[0.12em] text-[#88949a]">Pages</dt><dd className="mt-1 font-serif text-2xl text-[#17354a]">{book.pages}</dd></div>
              <div className="bg-[#fffaf0] p-4"><dt className="text-[11px] uppercase tracking-[0.12em] text-[#88949a]">Read time</dt><dd className="mt-1 font-serif text-2xl text-[#17354a]">{Math.floor(book.readingMinutes / 60)}h {book.readingMinutes % 60}m</dd></div>
              <div className="bg-[#fffaf0] p-4"><dt className="text-[11px] uppercase tracking-[0.12em] text-[#88949a]">Audio</dt><dd className="mt-1 font-serif text-2xl text-[#17354a]">{hasAudio ? `${book.audioSampleMinutes}m` : "—"}</dd></div>
            </dl>

            <div className="mt-8 max-w-3xl rounded-2xl border border-[#dccfae] bg-[#fffaf0] p-6 shadow-sm sm:p-7">
              <p className="leading-7 text-[#5d6f78]">{book.longDescription}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {book.highlights.map((h) => <li key={h} className="rounded-lg border border-[#e4dac0] bg-[#f8f0e0] px-4 py-3 text-sm leading-6 text-[#5d6f78]"><span className="mr-2 text-[#a97820]">✦</span>{h}</li>)}
              </ul>
            </div>

            <section className="mt-7 rounded-2xl border border-[#dccfae] bg-[#f6efdf] p-6 sm:p-7" aria-labelledby="choose-format">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a97820]">Choose a format</p>
              <h2 id="choose-format" className="font-serif text-2xl font-semibold text-[#17354a]">Take the book with you.</h2>
              <div className="mt-4 grid gap-3">
                <FormatRow label="eBook — EPUB + PDF" sub="Read on phone, tablet or desktop." priceCents={book.priceCents} />
                {hasAudio && book.audioPriceCents && <FormatRow label="Audio edition" sub="MP3 + M4B chapter files." priceCents={book.audioPriceCents} />}
                {hasBundle && book.bundlePriceCents && <FormatRow label="Complete bundle — eBook + Audio" sub="Both formats in one purchase." priceCents={book.bundlePriceCents} accent />}
              </div>
              <p className="mt-4 text-xs leading-5 text-[#78858b]">Secure digital delivery. Your library keeps purchased books together.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <AddToCartButton book={book} format={hasBundle ? "bundle" : "ebook"} priceCents={hasBundle ? book.bundlePriceCents! : book.priceCents} />
                <Button href="#sample" variant="outline">Read a sample</Button>
              </div>
            </section>
          </article>

          <aside className="self-start space-y-4 lg:sticky lg:top-6">
            <section className="rounded-2xl border border-[#dccfae] bg-[#f8f0e0] p-5">
              <h2 className="font-serif text-xl font-semibold">Reading & audio</h2>
              <p className="mt-2 text-sm leading-6 text-[#5d6f78]">This product can combine visual reading with a companion audio edition when available.</p>
              <Link href={hasAudio ? "/audio" : "/help"} className="mt-3 inline-block text-xs font-bold text-[#8a671f] hover:underline">Explore reading options →</Link>
            </section>
            <section className="rounded-2xl border border-[#dccfae] bg-[#fffaf0] p-5">
              <h2 className="font-serif text-xl font-semibold">Need help?</h2>
              <p className="mt-2 text-sm leading-6 text-[#5d6f78]">Questions about formats, downloads or your library?</p>
              <Link href="/help" className="mt-3 inline-block text-xs font-bold text-[#8a671f] hover:underline">Open help centre →</Link>
            </section>
          </aside>
        </div>
      </Container>

      <section id="sample" className="border-y border-[#dccfae] bg-[#f2ecdf]">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a97820]">Sample</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#17354a]">Read the opening pages.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5d6f78]">The full reading experience will live here, with protected content, responsive pagination and an optional in-book audio player.</p>
        </Container>
      </section>

      {related.length > 0 && <section>
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a97820]">Same shelf</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#17354a]">You might also like.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b) => <Link key={b.slug} href={`/books/${b.slug}`} className="flex gap-4 rounded-xl border border-[#dccfae] bg-[#fffaf0] p-4 hover:border-[#b8862f] hover:shadow-sm">
              <div className="w-20 shrink-0"><BookCover palette={b.cover.palette} motif={b.cover.motif} spineLabel={b.cover.spineLabel} title={b.title} /></div>
              <div><p className="text-xs text-[#88949a]">{b.category}</p><h3 className="mt-1 font-serif text-xl leading-tight">{b.title}</h3><p className="mt-2 text-sm text-[#8a671f]">From {formatPrice(Math.min(b.priceCents, b.audioPriceCents ?? b.priceCents, b.bundlePriceCents ?? b.priceCents))}</p></div>
            </Link>)}
          </div>
        </Container>
      </section>}
    </div>
  );
}

function FormatRow({ label, sub, priceCents, accent }: { label:string; sub:string; priceCents:number; accent?:boolean }) {
  return <div className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${accent ? "border-[#b8862f] bg-[#fff6df]" : "border-[#dccfae] bg-[#fffaf0]"}`}>
    <div><p className="font-semibold text-[#17354a]">{label}</p><p className="mt-1 text-sm text-[#6a7a81]">{sub}</p></div><p className="shrink-0 font-serif text-2xl text-[#9b6e19]">{formatPrice(priceCents)}</p>
  </div>;
}
