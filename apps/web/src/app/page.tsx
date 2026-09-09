import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { books, getCategories } from "@/lib/catalog";

const featured = books.slice(0, 6);
const newest = [...books].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const practical = books.filter((book) => ["Productivity", "Home"].includes(book.category));
const categories = getCategories();

const tabs = [
  { id: "featured", label: "Featured Titles" },
  { id: "new", label: "Just Arrived" },
  { id: "practical", label: "Useful Reads" },
  { id: "browse", label: "Browse Topics" },
];

export default function HomePage() {
  return (
    <div className="storefront">
      <section className="newsletter-strip">
        <Container className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-2.5 text-center text-xs sm:justify-between sm:text-left">
          <span className="font-medium">Free reading notes, new releases and occasional offers.</span>
          <Link href="/free-library" className="font-semibold underline underline-offset-4 hover:text-accent">Get a free read →</Link>
        </Container>
      </section>

      <section className="storefront-hero">
        <Container className="py-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="store-label">Digital Life Press</p>
              <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.7rem,6vw,5.7rem)] leading-[.95] tracking-[-0.04em]">Digital books for curious lives.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft md:text-lg">Browse useful books across mind, work, home and everyday life. Buy once, keep your titles in your library, and read in the format that suits you.</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Button href="/books">Browse all books</Button>
              <Button href="/free-library" variant="outline">Free reading</Button>
            </div>
          </div>

          <div className="mt-10 border-y border-ink/10 bg-paper-bright">
            <div className="flex min-h-12 items-stretch overflow-x-auto" aria-label="Store sections">
              {tabs.map((tab, index) => (
                <a key={tab.id} href={`#${tab.id}`} className={`flex shrink-0 items-center border-r border-ink/10 px-5 py-3 text-xs font-semibold uppercase tracking-[.12em] transition-colors hover:bg-paper-deep hover:text-accent ${index === 0 ? "bg-ink text-paper hover:bg-ink hover:text-paper" : "text-ink-soft"}`}>
                  {tab.label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section id="featured" className="store-section">
          <SectionHeader eyebrow="Featured Titles" title="A considered shelf to start with" actionHref="/books" actionLabel="View all books" />
          <ProductRail books={featured} />
        </section>

        <section id="new" className="store-section border-t border-muted-line">
          <SectionHeader eyebrow="Just Arrived" title="New to the catalogue" actionHref="/books" actionLabel="Browse the catalogue" />
          <ProductRail books={newest} />
        </section>
      </Container>

      <section id="browse" className="border-y border-muted-line bg-paper-deep">
        <Container className="py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="store-label">Popular Categories</p>
              <h2 className="mt-3 font-display text-display-lg leading-[.98]">Browse by the part of life you want to tend.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">Simple shelves, clear formats, and no endless maze of filters. Start with a topic and let the books do the rest.</p>
              <Link href="/categories" className="mt-6 inline-flex border-b border-ink pb-1 text-sm font-semibold hover:border-accent hover:text-accent">View all categories →</Link>
            </div>
            <nav aria-label="Popular categories" className="grid grid-cols-2 gap-x-5 sm:grid-cols-4">
              {categories.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`} className="group border-t border-ink/15 py-5">
                  <span className="block text-xs font-semibold uppercase tracking-[.12em] text-ink-muted">{category.books.length} titles</span>
                  <span className="mt-2 block font-display text-2xl leading-tight group-hover:text-accent">{category.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </section>

      <Container>
        <section id="practical" className="store-section">
          <SectionHeader eyebrow="Useful Reads" title="Books with something to do with your week" actionHref="/books" actionLabel="See the full shelf" />
          <ProductRail books={practical} />
        </section>
      </Container>

      <section className="border-y border-muted-line bg-paper-bright">
        <Container className="py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <InfoBlock number="01" title="Buy once" text="Your purchase unlocks the digital formats included with that title." />
            <InfoBlock number="02" title="Read anywhere" text="Keep your books in your library and return when you need them." />
            <InfoBlock number="03" title="Build a stack" text="Eligible orders of three books receive the planned 10% bundle saving at checkout." />
          </div>
        </Container>
      </section>

      <Container>
        <section className="store-section">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="store-label">Free Library</p>
              <h2 className="mt-3 font-display text-display-lg leading-[.98]">Read before you decide.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">Opening chapters, short essays and practical downloads — a quieter way to discover what belongs on your shelf.</p>
            </div>
            <Button href="/free-library" variant="outline">Open the free library</Button>
          </div>
        </section>
      </Container>
    </div>
  );
}

function SectionHeader({ eyebrow, title, actionHref, actionLabel }: { eyebrow: string; title: string; actionHref: string; actionLabel: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5 border-b border-muted-line pb-5">
      <div>
        <p className="store-label">{eyebrow}</p>
        <h2 className="mt-2 font-display text-display-lg leading-[.98]">{title}</h2>
      </div>
      <Link href={actionHref} className="text-sm font-semibold text-accent hover:text-accent-deep">{actionLabel} →</Link>
    </div>
  );
}

function ProductRail({ books: items }: { books: typeof books }) {
  return <div className="product-rail" aria-label="Book titles">{items.map((book) => <BookCard key={book.slug} book={book} />)}</div>;
}

function InfoBlock({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="border-t-2 border-ink pt-4">
      <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-accent">{number}</p>
      <h3 className="mt-3 font-display text-2xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p>
    </article>
  );
}
