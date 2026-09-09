import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { BookCover } from "@/components/book-cover";
import { Container } from "@/components/container";
import { books, getCategories } from "@/lib/catalog";

const categories = getCategories();
const featured = books.slice(0, 5);
const newest = [...books].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const lifestyle = books.filter((book) => book.category === "Lifestyle");
const productivity = books.filter((book) => book.category === "Productivity");

const tabs = [
  { href: "#featured", label: "Featured Titles" },
  { href: "#new", label: "Just Arrived" },
  { href: "#topics", label: "Browse Topics" },
  { href: "#useful", label: "Useful Reads" },
];

export default function HomePage() {
  return (
    <>
      <div className="store-shell">
        <aside className="store-sidebar" aria-label="Shop navigation">
          <section className="sidebar-panel sidebar-newsletter">
            <p className="sidebar-kicker">Free reading</p>
            <h2>New books and useful notes.</h2>
            <p>Get a free sample, new releases and occasional offers.</p>
            <Link href="/free-library" className="sidebar-button">Get a free read</Link>
          </section>

          <section className="sidebar-panel">
            <h2 className="sidebar-heading">Popular Categories</h2>
            <nav aria-label="Popular categories">
              {categories.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`} className="sidebar-link">
                  {category.name}
                </Link>
              ))}
            </nav>
          </section>

          <section className="sidebar-panel">
            <h2 className="sidebar-heading">Shop</h2>
            <Link href="/books" className="sidebar-link">All books</Link>
            <Link href="/audio" className="sidebar-link">Audiobooks</Link>
            <Link href="/free-library" className="sidebar-link">Free library</Link>
            <Link href="/library" className="sidebar-link">My library</Link>
            <Link href="/about" className="sidebar-link">About the press</Link>
          </section>
        </aside>

        <main className="store-main">
          <section className="featured-strip" id="featured" aria-labelledby="featured-title">
            <div className="section-tabs">
              {tabs.map((tab, index) => (
                <a key={tab.href} href={tab.href} className={`section-tab ${index === 0 ? "active" : ""}`}>
                  {tab.label}
                </a>
              ))}
            </div>
            <div className="cover-carousel" aria-label="Featured titles">
              {featured.map((book) => (
                <Link key={book.slug} href={`/books/${book.slug}`} className="carousel-cover">
                  <BookCover palette={book.cover.palette} motif={book.cover.motif} spineLabel={book.cover.spineLabel} title={book.title} />
                </Link>
              ))}
            </div>
          </section>

          <section className="shop-lead">
            <div className="lead-feature">
              <BookCover palette={books[0].cover.palette} motif={books[0].cover.motif} spineLabel={books[0].cover.spineLabel} title={books[0].title} className="lead-cover" />
              <div className="lead-copy">
                <p className="store-kicker">Digital Life Press</p>
                <h1>Books for the parts of life that need more attention.</h1>
                <p>Short, practical digital books for mind, work, home and everyday life. Buy once, keep your titles in your library, and read in the format that suits you.</p>
                <div className="lead-actions">
                  <Link href={`/books/${books[0].slug}`} className="primary-action">View featured book</Link>
                  <Link href="/books" className="secondary-action">Browse the shop</Link>
                </div>
              </div>
            </div>

            <aside className="topic-box" id="topics" aria-labelledby="topic-box-title">
              <h2 id="topic-box-title">Browse topics</h2>
              <div className="topic-grid">
                {categories.map((category) => (
                  <Link key={category.slug} href={`/categories/${category.slug}`} className="topic-link">
                    <span>{category.name}</span>
                    <small>{category.books.length}</small>
                  </Link>
                ))}
              </div>
            </aside>
          </section>

          <StoreShelf id="new" title="Just Arrived" action="Browse all books" actionHref="/books" books={newest} />

          <section className="category-promo" aria-labelledby="category-promo-title">
            <div>
              <p className="store-kicker">Popular categories</p>
              <h2 id="category-promo-title">Start with the subject closest to your day.</h2>
              <p>Use the shelves below instead of digging through endless filters. Each category leads to a focused collection.</p>
            </div>
            <div className="category-promo-links">
              {categories.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`}>
                  <span>{category.name}</span>
                  <small>{category.books.length} title{category.books.length === 1 ? "" : "s"}</small>
                </Link>
              ))}
            </div>
          </section>

          {lifestyle.length > 0 && <StoreShelf id="lifestyle" title="Lifestyle" action="See lifestyle books" actionHref="/categories/lifestyle" books={lifestyle} />}
          {productivity.length > 0 && <StoreShelf id="useful" title="Useful Reads" action="See productivity books" actionHref="/categories/productivity" books={productivity} />}

          <section className="reading-service-grid" aria-label="Reader services">
            <InfoTile title="Buy once" text="One purchase unlocks the digital formats included with the title." />
            <InfoTile title="Read anywhere" text="Keep every purchase in your personal library and return whenever you need it." />
            <InfoTile title="Build a stack" text="Eligible orders of three books receive the planned 10% saving at checkout." />
            <InfoTile title="Need a free read?" text="Open the free library for samples, excerpts and practical downloads." href="/free-library" />
          </section>
        </main>
      </div>

      <Container>
        <section className="home-bottom-note">
          <div>
            <p className="store-kicker">A quieter storefront</p>
            <h2>Clear prices, clear formats, no maze.</h2>
          </div>
          <Link href="/books" className="secondary-action">See the full catalogue →</Link>
        </section>
      </Container>
    </>
  );
}

function StoreShelf({ id, title, action, actionHref, books: items }: { id: string; title: string; action: string; actionHref: string; books: typeof books }) {
  return (
    <section id={id} className="store-shelf" aria-labelledby={`${id}-title`}>
      <div className="shelf-heading">
        <h2 id={`${id}-title`}>{title}</h2>
        <Link href={actionHref}>{action} →</Link>
      </div>
      <div className="shelf-grid">
        {items.map((book) => <BookCard key={book.slug} book={book} />)}
      </div>
    </section>
  );
}

function InfoTile({ title, text, href }: { title: string; text: string; href?: string }) {
  const content = (
    <>
      <h3>{title}</h3>
      <p>{text}</p>
      {href ? <span className="info-link">Open free library →</span> : null}
    </>
  );

  return href ? <Link href={href} className="info-tile">{content}</Link> : <article className="info-tile">{content}</article>;
}
