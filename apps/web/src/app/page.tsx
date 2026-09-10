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
    <div className="store-home relative overflow-hidden bg-[#fffdf8]">
      <div className="pointer-events-none absolute inset-2 z-20 rounded-[26px] border-[3px] border-sky-200/80 sm:inset-3" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-5 z-20 rounded-[22px] border border-emerald-200/80 sm:inset-7" aria-hidden="true" />
      <div className="pointer-events-none absolute left-3 top-8 z-20 text-2xl text-rose-300 sm:left-6 sm:text-3xl" aria-hidden="true">❀ 〰</div>
      <div className="pointer-events-none absolute right-3 top-8 z-20 rotate-180 text-2xl text-amber-300 sm:right-6 sm:text-3xl" aria-hidden="true">❀ 〰</div>
      <div className="pointer-events-none absolute bottom-8 left-3 z-20 rotate-180 text-2xl text-violet-300 sm:left-6 sm:text-3xl" aria-hidden="true">❀ 〰</div>
      <div className="pointer-events-none absolute bottom-8 right-3 z-20 text-2xl text-emerald-300 sm:right-6 sm:text-3xl" aria-hidden="true">❀ 〰</div>

      <div className="relative z-10 px-2 py-4 sm:px-4 sm:py-6">
        <div className="store-shell md:[grid-template-columns:230px_minmax(0,1fr)] rounded-xl bg-white/95 shadow-sm">
          <aside className="store-sidebar text-[15px]" aria-label="Book categories">
            <section className="sidebar-panel bg-sky-pale">
              <p className="sidebar-kicker !text-xs">Find your shelf</p>
              <h2 className="!text-xl !leading-tight">Choose a doorway into the shop.</h2>
              <p className="!text-sm !leading-5">Each category leads to its own sections, topics and alphabetically ordered shelves.</p>
              <Link className="sidebar-button !py-2.5 !text-sm" href="/full-book">Open Full Book</Link>
            </section>
            {categories.map((category) => (
              <section className="sidebar-panel" key={category.slug}>
                <h2 className="sidebar-heading !text-xl !py-2">{category.name}</h2>
                <Link className="sidebar-link !py-1.5 !text-sm !font-semibold" href={`/categories/${category.slug}`}>Open {category.name} shelf →</Link>
                {category.books.map((book) => <Link className="sidebar-link !py-1 !text-[14px]" href={`/books/${book.slug}`} key={book.slug}>{book.title}</Link>)}
              </section>
            ))}
          </aside>

          <main className="store-main">
            <section className="featured-strip !mx-3 !mt-3" aria-label="Featured titles">
              <div className="section-tabs !text-[14px]">
                <a className="section-tab !px-5 !py-3" href="#for-you">For you</a>
                <a className="section-tab !px-5 !py-3" href="#new">Just Arrived</a>
                <a className="section-tab !px-5 !py-3" href="#categories">Browse by Category</a>
                <Link className="section-tab !px-5 !py-3" href="/full-book">Full Book</Link>
              </div>
              <div className="cover-carousel !gap-7 !px-8 !py-7">
                {featured.map((book) => (
                  <Link key={book.slug} href={`/books/${book.slug}`} className="carousel-cover" aria-label={book.title}>
                    <BookCover palette={book.cover.palette} motif={book.cover.motif} spineLabel={book.cover.spineLabel} title={book.title} />
                  </Link>
                ))}
              </div>
            </section>

            <section id="for-you" className="shop-lead !gap-4 !px-3 !pt-4">
              <article className="lead-feature !rounded-xl">
                <div className="lead-cover !p-7"><BookCover palette={firstBook.cover.palette} motif={firstBook.cover.motif} spineLabel={firstBook.cover.spineLabel} title={firstBook.title} /></div>
                <div className="lead-copy !p-7">
                  <p className="store-kicker">First recommendation</p>
                  <h1 className="!text-4xl sm:!text-5xl">{firstBook.title}</h1>
                  <p className="!text-base">{firstBook.subtitle}</p>
                  <p className="mt-3 text-sm font-semibold text-sky-700">{firstPath.category} · {firstPath.section} · {firstPath.topic}</p>
                  <p className="mt-3 max-w-xl text-base leading-6 text-slate">{firstBook.shortDescription}</p>
                  <p className="tabular mt-4 text-lg font-bold text-logo-green">From {formatPrice(firstBook.priceCents)}</p>
                  <div className="lead-actions !mt-5">
                    <Link href={`/books/${firstBook.slug}`} className="primary-action !px-4 !py-2.5 !text-sm">View book</Link>
                    <Link href={`/categories/${firstPath.category.toLowerCase()}`} className="secondary-action !px-4 !py-2.5 !text-sm">Open its shelf</Link>
                  </div>
                </div>
              </article>

              <section className="topic-box !rounded-xl !p-5" aria-labelledby="shop-doorways-title">
                <p className="store-kicker">The shop is arranged</p>
                <h2 id="shop-doorways-title" className="!text-2xl">by category, then subject.</h2>
                <div className="topic-grid">
                  {categories.map((category) => (
                    <Link key={category.slug} href={`/categories/${category.slug}`} className="topic-link !py-3 !text-sm">
                      <span>{category.name}</span><small>{category.books.length} titles</small>
                    </Link>
                  ))}
                </div>
                <Link href="/full-book" className="info-link !text-sm">Open the complete catalogue →</Link>
              </section>
            </section>

            <section className="mx-auto my-5 w-[calc(100%-24px)] max-w-4xl overflow-hidden rounded-xl border border-slate-300 bg-slate-950 shadow-sm" aria-label="Storefront video showcase">
              <div className="flex min-h-36 items-center justify-center bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-7 text-center sm:min-h-44">
                <div className="max-w-2xl text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-200">Storefront showcase</p>
                  <h2 className="mt-2 text-xl font-semibold sm:text-2xl">A compact place for narrated video and audio.</h2>
                  <p className="mt-2 text-sm leading-5 text-slate-300">The production player will support browser-compatible video and multiple audio sources, with controls sized for desktop and touch devices.</p>
                  <div className="mt-4 flex justify-center gap-2">
                    <button type="button" className="rounded border border-white/25 px-3 py-1.5 text-xs font-semibold hover:bg-white/10">Play</button>
                    <button type="button" className="rounded border border-white/25 px-3 py-1.5 text-xs font-semibold hover:bg-white/10">Pause</button>
                    <button type="button" className="rounded border border-white/25 px-3 py-1.5 text-xs font-semibold hover:bg-white/10">Stop</button>
                  </div>
                </div>
              </div>
            </section>

            <section id="categories" className="category-promo !mx-3 !my-5 !p-6 !rounded-xl">
              <div>
                <p className="store-kicker">Category doorways</p>
                <h2 className="!text-3xl">One clear route to every shelf.</h2>
                <p className="!text-base">Each category leads to its own sections and topics, so the customer always knows where they are and where the next shelf begins.</p>
                <Link href="/full-book" className="info-link !text-sm">See the complete hierarchy →</Link>
              </div>
              <div className="category-promo-links !text-sm">
                {categories.map((category) => (
                  <Link key={category.slug} href={`/categories/${category.slug}`}>
                    <span>{category.name}</span><small>{category.books.length}</small>
                  </Link>
                ))}
              </div>
            </section>

            <StoreShelf id="new" title="Just Arrived" items={newest} />
            <StoreShelf id="selected" title="A few more to explore" items={featured.slice(0, 4)} />

            <section className="reading-service-grid !mx-3 !mt-5 !rounded-xl" aria-label="Reader services">
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
