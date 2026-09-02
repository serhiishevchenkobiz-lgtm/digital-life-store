import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { BookCover } from "@/components/book-cover";
import { BookCard } from "@/components/book-card";
import { books } from "@/lib/catalog";

export default function HomePage() {
  const featured = books.slice(0, 3);
  const editorial = books[0];

  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="pt-14 md:pt-24 pb-16 md:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Volume 01 · Autumn 2026</p>
            <h1 className="mt-6 font-display text-display-2xl text-balance">
              Premium digital publishing
              <span className="text-accent"> for a calmer, more capable life.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft leading-relaxed">
              Digital Life Press is a small editorial house for eBooks and audio
              that respect your time, your attention and your taste. No noise.
              No motivational shouting. Just well-made things, written and
              designed to be useful.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/books">Browse the catalogue</Button>
              <Button href="/free-library" variant="ghost">
                Explore the Free Library →
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "Titles", v: "06" },
                { k: "Avg. length", v: "2h 45m" },
                { k: "Languages", v: "EN" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-xs uppercase tracking-[0.22em] text-ink-muted">{s.k}</dt>
                  <dd className="mt-2 font-display text-3xl tabular">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5 relative">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(178,58,47,0.10),transparent_60%)]"
            />
            <div className="grid grid-cols-2 gap-6 items-end">
              <div className="translate-y-6">
                <BookCover
                  palette={editorial.cover.palette}
                  motif={editorial.cover.motif}
                  spineLabel={editorial.cover.spineLabel}
                  title={editorial.title}
                />
              </div>
              <div>
                <BookCover
                  palette={books[1].cover.palette}
                  motif={books[1].cover.motif}
                  spineLabel={books[1].cover.spineLabel}
                  title={books[1].title}
                />
              </div>
              <div className="-translate-y-2">
                <BookCover
                  palette={books[2].cover.palette}
                  motif={books[2].cover.motif}
                  spineLabel={books[2].cover.spineLabel}
                  title={books[2].title}
                />
              </div>
              <div className="translate-y-4">
                <BookCover
                  palette={books[4].cover.palette}
                  motif={books[4].cover.motif}
                  spineLabel={books[4].cover.spineLabel}
                  title={books[4].title}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="featured">
        <Container className="py-16 md:py-24">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow">New & Featured</p>
              <h2 id="featured" className="mt-4 font-display text-display-lg text-balance">
                This season&rsquo;s reading.
              </h2>
            </div>
            <Link
              href="/books"
              className="hidden sm:inline text-sm text-ink-soft hover:text-ink transition-colors"
            >
              See all titles →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {featured.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-deep">
        <Container className="py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Editorial Promise</p>
            <h2 className="mt-4 font-display text-display-lg text-balance">
              Every title is treated like a small object you will keep on a shelf.
            </h2>
            <ul className="mt-8 space-y-5 max-w-xl">
              {[
                "Hand-edited by a working editor before publication.",
                "Designed as EPUB, PDF and audio — never one format squeezed into another.",
                "Free companion worksheets for every paid book.",
                "Human narration at a humane pace. No AI voice for narration.",
              ].map((line) => (
                <li key={line} className="flex gap-4 text-ink-soft leading-relaxed">
                  <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/about" variant="outline">
                Read our standards
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="bg-paper-bright border border-muted-line rounded-xl p-8 md:p-10 shadow-editorial">
              <blockquote className="font-display text-2xl md:text-3xl leading-snug text-balance">
                &ldquo;A small press doing the slow, careful thing the big houses stopped doing.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.22em] text-ink-muted">
                — Editorial review, Vol. 1
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section aria-labelledby="categories">
        <Container className="py-20 md:py-24">
          <div className="mb-10">
            <p className="eyebrow">Browse by topic</p>
            <h2 id="categories" className="mt-4 font-display text-display-lg text-balance">
              Choose a corner of the room.
            </h2>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Lifestyle", "Mind", "Productivity", "Home"].map((cat) => (
              <li key={cat}>
                <Link
                  href={`/categories/${cat.toLowerCase()}`}
                  className="group block rounded-lg border border-muted-line bg-paper-bright p-6 hover:border-ink/40 transition-colors"
                >
                  <p className="font-display text-2xl">{cat}</p>
                  <p className="mt-2 text-sm text-ink-muted group-hover:text-ink transition-colors">
                    {books.filter((b) => b.category === cat).length} title
                    {books.filter((b) => b.category === cat).length === 1 ? "" : "s"} →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container className="py-20 md:py-28">
          <div className="rounded-2xl border border-muted-line bg-ink text-paper p-10 md:p-16 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
            />
            <p className="eyebrow text-paper/70">Free Library</p>
            <h2 className="mt-4 font-display text-display-lg text-balance max-w-2xl">
              Three complete chapters, one printable worksheet, no email wall.
            </h2>
            <p className="mt-6 max-w-xl text-paper/80 leading-relaxed">
              Free Library is our small gift to anyone browsing. Three opening
              chapters and a companion worksheet — to read, to print, to keep.
            </p>
            <div className="mt-8">
              <Button href="/free-library" variant="outline" className="border-paper/30 text-paper hover:bg-paper hover:text-ink">
                Open the Free Library
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}