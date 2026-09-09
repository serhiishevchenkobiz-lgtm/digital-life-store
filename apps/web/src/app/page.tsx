import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { BookCover } from "@/components/book-cover";
import { BookAssistant } from "@/components/book-assistant";
import { Container } from "@/components/container";
import { books, getCategories } from "@/lib/catalog";
import { getBookPath } from "@/lib/catalog-taxonomy";
import { formatPrice } from "@/lib/utils";

const categories = getCategories();
const featured = books.slice(0, 5);
const newest = [...books].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export default function HomePage() {
  const firstBook = books[0];
  const firstPath = getBookPath(firstBook);

  return (
    <div className="store-home relative overflow-hidden">
      <div className="pointer-events-none absolute inset-2 rounded-[24px] border-2 border-sky-100 sm:inset-3" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-4 rounded-[21px] border border-emerald-100 sm:inset-6" aria-hidden="true" />
      <div className="pointer-events-none absolute left-3 top-16 h-8 w-8 rounded-full border-2 border-pink-200 sm:left-6" aria-hidden="true" />
      <div className="pointer-events-none absolute right-4 top-24 h-7 w-12 rounded-full border-2 border-amber-200 rotate-12 sm:right-8" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-20 left-4 h-7 w-11 rounded-full border-2 border-violet-200 -rotate-12 sm:left-8" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-14 right-4 h-8 w-8 rounded-full border-2 border-green-200 sm:right-8" aria-hidden="true" />

      <div className="relative z-10">
        <div className="store-shell">
          <aside className="store-sidebar" aria-label="Book categories">
            <section className="sidebar-panel bg-sky-pale">
              <p className="sidebar-kicker">Find your shelf</p>
              <h2>Choose a doorway into the shop.</h2>
              <p>Each category leads to its own sections, topics and alphabetically ordered shelves.</p>
              <Link className="sidebar-button" href="/full-book">Full Book</Link>
            </section>
            {categories.map((category) => (
              <section className="sidebar-panel" key={category.slug}>
                <h2 className="sidebar-heading">{category.name}</h2>
                <Link className="sidebar-link font-semibold" href={`/categories/${category.slug}`}>Open {category.name} shelf →</Link>
                {category.books.slice(0, 4).map((book) => <Link className="sidebar-link" href={`/books/${book.slug}`} key={book.slug}>{book.title}</Link>)}
              </section>
            ))}
          </aside>

          <main className="store-main">
            <section className="featured-strip" aria-label="Featured titles">
              <div className="section-tabs">
                <a className="section-tab active" href="#for-you">For you</a>
                <a className="section-tab" href="#new">Just Arrived</a>
                <a className="section-tab" href="#categories">Browse by Category</a>
                <Link className="section-tab" href="/full-book">Full Book</Link>
              </div>
              <div className="cover-carousel">
                {featured.map((book) => (
                  <Link key={book.slug} href={`/books/${book.slug}`} className="carousel-cover" aria-label={book.title}>
                    <BookCover palette={book.cover.palette} motif={book.cover.motif} spineLabel={book.cover.spineLabel} title={book.title} />
                  </Link>
                ))}
              </div>
            </section>

            <section id="for-you" className="shop-lead">
              <article className="lead-feature">
                <div className="lead-cover"><BookCover palette={firstBook.cover.palette} motif={firstBook.cover.motif} spineLabel={firstBook.cover.spineLabel} title={firstBook.title} /></div>
                <div className="lead-copy">
                  <p className="store-kicker">First recommendation</p>
                  <h1>{firstBook.title}</h1>
                  <p>{firstBook.subtitle}</p>
                  <p className="mt-2 text-xs font-semibold text-sky-700">{firstPath.category} · {firstPath.section} · {firstPath.topic}</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate">{firstBook.shortDescription}</p>
                  <p className="tabular mt-3 font-bold text-logo-green">From {formatPrice(firstBook.priceCents)}</p>
                  <div className="lead-actions">
                    <Link href={`/books/${firstBook.slug}`} className="primary-action">View book</Link>
                    <Link href={`/categories/${firstPath.category.toLowerCase()}`} className="secondary-action">Open its shelf</Link>
                  </div>
                </div>
              </article>

              <section className="topic-box" aria-labelledby="shop-doorways-title">
                <p className="store-kicker">The shop is arranged</p>
                <h2 id="shop-doorways-title">by category, then subject.</h2>
                <div className="topic-grid">
                  {categories.map((category) => (
                    <Link key={category.slug} href={`/categories/${category.slug}`} className="topic-link">
                      <span>{category.name}</span><small>{category.books.length} titles</small>
                    </Link>
                  ))}
                </div>
                <Link href="/full-book" className="info-link">Open the complete catalogue →</Link>
              </section>
            </section>

            <section className="mx-1 my-3 border border-slate-200 bg-slate-950 p-2 shadow-sm" aria-label="Storefront video showcase">
              <div className="flex min-h-44 items-center justify-center border border-slate-700 bg-slate-900 px-5 py-8 text-center sm:min-h-56">
                <div className="max-w-xl text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-200">Audio + video showcase</p>
                  <h2 className="mt-2 text-xl font-semibold sm:text-2xl">A place for the shop&apos;s narrated showcase.</h2>
                  <p className="mt-2 text-xs leading-5 text-slate-300">The final media source will be managed from the admin panel. The storefront is prepared for native browser video/audio playback and multiple source formats.</p>
                  <div className="mt-4 flex justify-center gap-2 text-[11px] font-semibold"><span className="border border-slate-600 px-3 py-1.5">Play</span><span className="border border-slate-600 px-3 py-1.5">Pause</span><span className="border border-slate-600 px-3 py-1.5">Stop</span></div>
                </div>
              </div>
            </section>

            <section id="categories" className="category-promo">
              <div>
                <p className="store-kicker">Category doorways</p>
                <h2>One clear route to every shelf.</h2>
                <p>These are the customer-facing entry points. Inside each one, the catalogue becomes more specific instead of more crowded.</p>
                <Link href="/full-book" className="info-link">See the complete hierarchy →</Link>
              </div>
              <div className="category-promo-links">
                {categories.map((category) => (
                  <Link key={category.slug} href={`/categories/${category.slug}`}>
                    <span>{category.name}</span><small>{category.books.length}</small>
                  </Link>
                ))}
              </div>
            </section>

            <StoreShelf id="new" title="Just Arrived" items={newest} />
            <StoreShelf id="selected" title="A few more to explore" items={featured.slice(0, 4)} />

            <section className="reading-service-grid" aria-label="Reader services">
              <InfoTile href="/about" title="About the shop" text="How we choose, edit and prepare our digital books." />
              <InfoTile href="/books" title="Formats" text="Compare ebook, audio and bundle editions." />
              <InfoTile href="/library" title="Your library" text="Keep purchased books together and ready to read." />
              <InfoTile href="/help" title="Help & support" text="Accounts, payments, downloads and reading help." />
            </section>
          </main>
        </div>

        <Container>
          <section className="home-bottom-note">
            <div><p className="store-kicker">A quieter way to browse</p><h2>Choose a door. Follow the shelf.</h2></div>
            <Link href="/full-book" className="secondary-action">Open Full Book →</Link>
          </section>
        </Container>
      </div>
      <BookAssistant />
    </div>
  );
}

function StoreShelf({ id, title, items }: { id: string; title: string; items: typeof books }) {
  return (
    <section id={id} className="store-shelf" aria-labelledby={`${id}-title`}>
      <div className="shelf-heading"><h2 id={`${id}-title`}>{title}</h2><Link href="/books">More books ›</Link></div>
      <div className="shelf-grid">{items.slice(0, 5).map((book) => <BookCard key={book.slug} book={book} />)}</div>
    </section>
  );
}

function InfoTile({ title, text, href }: { title: string; text: string; href: string }) {
  return <Link href={href} className="info-tile"><h3>{title}</h3><p>{text}</p><span className="info-link">Learn more →</span></Link>;
}
