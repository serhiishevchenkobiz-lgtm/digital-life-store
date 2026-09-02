import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { BookCover } from "@/components/book-cover";
import { books, getBook } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const book = getBook(params.slug);
  if (!book) return {};
  return {
    title: book.title,
    description: book.shortDescription,
    openGraph: {
      title: book.title,
      description: book.shortDescription,
      type: "book",
    },
  };
}

export default function BookDetailPage({ params }: Params) {
  const book = getBook(params.slug);
  if (!book) return notFound();

  const hasAudio = book.formats.includes("audio") && book.audioPriceCents;
  const hasBundle = book.formats.includes("bundle") && book.bundlePriceCents;
  const related = books.filter((b) => b.slug !== book.slug).slice(0, 3);

  // JSON-LD: Book + Product + Breadcrumb
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      name: book.title,
      description: book.longDescription,
      isbn: book.isbn,
      inLanguage: book.language,
      numberOfPages: book.pages,
      datePublished: book.publishedAt,
      author: { "@type": "Organization", name: book.author },
      publisher: { "@type": "Organization", name: "Digital Life Press" },
      offers: {
        "@type": "Offer",
        price: (book.priceCents / 100).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://digitallifepress.com"}/books/${book.slug}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Books", item: "/books" },
        {
          "@type": "ListItem",
          position: 3,
          name: book.title,
          item: `/books/${book.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="pt-14 md:pt-20 pb-12 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <BookCover
              palette={book.cover.palette}
              motif={book.cover.motif}
              spineLabel={book.cover.spineLabel}
              title={book.title}
              className="max-w-sm mx-auto lg:mx-0"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.18em] text-ink-muted">
            <ol className="flex gap-2">
              <li><Link href="/" className="hover:text-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/books" className="hover:text-ink">Books</Link></li>
              <li aria-hidden>/</li>
              <li className="text-ink">{book.title}</li>
            </ol>
          </nav>

          <p className="eyebrow mt-8">{book.category}</p>
          <h1 className="mt-4 font-display text-display-xl text-balance">{book.title}</h1>
          <p className="mt-3 text-xl text-ink-soft leading-snug text-balance">
            {book.subtitle}
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-ink-muted">Pages</dt>
              <dd className="mt-1 font-display text-2xl tabular">{book.pages}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-ink-muted">Read time</dt>
              <dd className="mt-1 font-display text-2xl tabular">
                {Math.floor(book.readingMinutes / 60)}h {book.readingMinutes % 60}m
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-ink-muted">Audio</dt>
              <dd className="mt-1 font-display text-2xl tabular">
                {hasAudio ? `${book.audioSampleMinutes}m sample` : "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-10 prose-editorial max-w-2xl">
            <p>{book.longDescription}</p>
          </div>

          <ul className="mt-8 space-y-3">
            {book.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-ink-soft">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-xl border border-muted-line bg-paper-bright p-6 md:p-8">
            <p className="eyebrow">Choose a format</p>
            <div className="mt-4 grid gap-3">
              <FormatRow
                label="eBook — EPUB + PDF"
                sub="Read on any device. Includes printable worksheets."
                priceCents={book.priceCents}
              />
              {hasAudio && book.audioPriceCents && (
                <FormatRow
                  label="Audio edition"
                  sub="Human-narrated. MP3 + M4B chapter files."
                  priceCents={book.audioPriceCents}
                />
              )}
              {hasBundle && book.bundlePriceCents && (
                <FormatRow
                  label="Complete bundle — eBook + Audio"
                  sub="Best value. Both formats, one download."
                  priceCents={book.bundlePriceCents}
                  accent
                />
              )}
            </div>
            <p className="mt-5 text-xs text-ink-muted">
              Secure delivery via private storage. Download links expire after
              24 hours and can be regenerated from your library.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/checkout">Add to cart</Button>
              <Button href="#sample" variant="outline">
                Read a sample
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <section id="sample" className="bg-paper-deep">
        <Container className="py-16 md:py-24">
          <p className="eyebrow">Sample</p>
          <h2 className="mt-4 font-display text-display-lg text-balance max-w-2xl">
            Read the opening pages.
          </h2>
          <div className="mt-8 max-w-2xl prose-editorial">
            <p>
              The first chapter is offered as a free sample so you can read the
              voice of the book before deciding. Below is the opening
              passage — short, deliberate, written for a quiet room.
            </p>
            <p className="mt-4">
              <em>This is a placeholder sample for the MVP storefront. Final
              samples will be drawn from the published manuscript.</em>
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-24">
          <p className="eyebrow">You might also like</p>
          <h2 className="mt-4 font-display text-display-lg text-balance">
            From the same shelf.
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {related.map((b) => (
              <Link
                key={b.slug}
                href={`/books/${b.slug}`}
                className="group flex items-center gap-5 rounded-lg border border-muted-line bg-paper-bright p-5 hover:border-ink/40 transition-colors"
              >
                <div className="w-20 shrink-0">
                  <BookCover
                    palette={b.cover.palette}
                    motif={b.cover.motif}
                    spineLabel={b.cover.spineLabel}
                    title={b.title}
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">{b.category}</p>
                  <p className="mt-1 font-display text-xl leading-tight group-hover:text-accent transition-colors">
                    {b.title}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft tabular">
                    From {formatPrice(Math.min(b.priceCents, b.audioPriceCents ?? b.priceCents, b.bundlePriceCents ?? b.priceCents))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function FormatRow({
  label,
  sub,
  priceCents,
  accent,
}: {
  label: string;
  sub: string;
  priceCents: number;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center justify-between gap-4 rounded-lg border p-4 md:p-5 " +
        (accent ? "border-ink bg-paper" : "border-muted-line bg-paper-bright")
      }
    >
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-ink-muted">{sub}</p>
      </div>
      <p className="font-display text-2xl tabular shrink-0">{formatPrice(priceCents)}</p>
    </div>
  );
}