import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { BookCover } from "@/components/book-cover";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { books, getCategories } from "@/lib/catalog";

const featured = books.slice(0, 4);
const bestsellers = [books[0], books[3], books[1], books[4]];

export default function HomePage() {
  const categories = getCategories();

  return (
    <>
      <section className="bg-night text-paper">
        <Container className="grid min-h-[620px] items-center gap-12 py-14 md:min-h-[650px] md:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 xl:min-h-[700px]">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow eyebrow-light">Digital books, thoughtfully published</p>
            <h1 className="mt-6 font-display text-[clamp(3.4rem,7vw,7rem)] leading-[0.91] tracking-[-0.045em]">
              Find your next<br /><em className="font-normal text-[#D8E1D1]">good idea.</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-paper/75 md:text-lg md:leading-8">Books and audio for the way people really live: ambitious, distracted, curious, and in need of a little more room to think.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/books" className="bg-accent text-paper hover:bg-accent-deep">Explore all books</Button>
              <Button href="/free-library" variant="outline" className="border-paper/35 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-ink">Start with a free read</Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-paper/20 pt-6 text-sm text-paper/70">
              <span><strong className="block text-2xl font-display text-paper">6</strong> current titles</span>
              <span><strong className="block text-2xl font-display text-paper">3</strong> reading formats</span>
              <span><strong className="block text-2xl font-display text-paper">10%</strong> off any three books</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px] py-8 lg:py-0" aria-label="Featured Digital Life Press books">
            <div className="absolute inset-0 -z-10 border border-paper/15" aria-hidden />
            <div className="absolute -left-5 top-10 h-32 w-32 rounded-full bg-leaf/30 blur-3xl" aria-hidden />
            <div className="grid grid-cols-2 gap-4 p-5 sm:gap-6 sm:p-8">
              <div className="translate-y-12"><BookCover {...bookCoverProps(books[0])} className="shadow-[18px_22px_0_rgba(0,0,0,.18)]" /></div>
              <div><BookCover {...bookCoverProps(books[3])} className="shadow-[18px_22px_0_rgba(0,0,0,.18)]" /></div>
              <div className="col-span-2 ml-auto w-[48%] -translate-y-1"><BookCover {...bookCoverProps(books[1])} className="shadow-[18px_22px_0_rgba(0,0,0,.18)]" /></div>
            </div>
            <p className="absolute -bottom-1 left-4 bg-accent px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper sm:left-8">The autumn reading list</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-muted-line bg-paper-bright">
        <Container className="grid gap-5 py-6 md:grid-cols-[auto_1fr_auto] md:items-center">
          <p className="font-display text-xl">A better way to build your shelf.</p>
          <p className="text-sm leading-6 text-ink-soft md:border-l md:border-muted-line md:pl-6">One purchase unlocks your formats. Keep every title in your personal library and download again whenever you need it.</p>
          <Link href="/library" className="text-sm font-semibold text-accent hover:text-accent-deep">Visit My Library →</Link>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="eyebrow">Editor&apos;s selection</p><h2 className="mt-3 font-display text-display-lg">Start somewhere useful.</h2></div>
            <Link href="/books" className="border-b border-ink pb-1 text-sm font-semibold hover:text-accent hover:border-accent">See the full catalogue</Link>
          </div>
          <div className="book-grid mt-10 md:mt-12">{featured.map((book) => <BookCard key={book.slug} book={book} />)}</div>
        </Container>
      </section>

      <section className="bg-[#D8E1D1] py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
            <div><p className="eyebrow">Browse the shop</p><h2 className="mt-3 font-display text-display-lg">Read toward the part of life you want to tend.</h2><p className="mt-5 max-w-sm leading-7 text-ink-soft">Practical shelves for attention, home, routines, and the long work of becoming more yourself.</p></div>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {categories.map((category, index) => (
                <li key={category.slug} className="border-t border-ink/20 py-5 first:sm:border-t-0 sm:nth-[2]:border-t-0">
                  <Link href={`/categories/${category.slug}`} className="group flex items-baseline justify-between gap-4">
                    <span className="font-display text-3xl group-hover:text-accent">{category.name}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{String(index + 1).padStart(2, "0")} / {category.books.length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <div>
            <p className="eyebrow">Popular with readers</p>
            <h2 className="mt-3 font-display text-display-lg">The books readers return to.</h2>
            <div className="book-grid mt-10 md:mt-12">{bestsellers.map((book) => <BookCard key={book.slug} book={book} />)}</div>
          </div>
          <aside className="self-start bg-ink p-7 text-paper md:p-10 lg:mt-12">
            <p className="eyebrow eyebrow-light">Three-book saving</p>
            <h2 className="mt-4 font-display text-4xl leading-tight">Build a stack.<br />Save 10%.</h2>
            <p className="mt-5 text-sm leading-7 text-paper/75">Choose any three books in a single order and your 10% reading-stack saving is applied at checkout.</p>
            <Button href="/books" variant="outline" className="mt-8 border-paper/35 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-ink">Choose three books</Button>
            <p className="mt-9 border-t border-paper/20 pt-5 text-xs leading-5 text-paper/55">Available on eligible digital books. Your final price is always shown before payment.</p>
          </aside>
        </Container>
      </section>

      <section className="border-y border-muted-line bg-paper-bright py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div><p className="eyebrow">The free library</p><h2 className="mt-3 font-display text-display-lg">Read before you decide.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">Opening chapters, quiet essays, and one practical worksheet. No payment, no catch, no crowded inbox.</p><Button href="/free-library" className="mt-8">Open the free library</Button></div>
          <div className="border-l-4 border-accent bg-paper-deep p-7 md:p-10"><p className="font-display text-3xl leading-tight">“A book does not need to be loud to change the shape of a week.”</p><p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">From Letters on Attention</p></div>
        </Container>
      </section>

      <section className="bg-accent py-14 text-paper md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="eyebrow text-paper/75">A note from the press</p><h2 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.7rem)] leading-[.98]">New books, useful excerpts, and reader-only offers.</h2></div>
          <Link href="/free-library" className="inline-flex w-fit border border-paper px-6 py-3 text-sm font-semibold transition-colors hover:bg-paper hover:text-ink">Get the next free read →</Link>
        </Container>
      </section>
    </>
  );
}

function bookCoverProps(book: (typeof books)[number]) {
  return { palette: book.cover.palette, motif: book.cover.motif, spineLabel: book.cover.spineLabel, title: book.title };
}
