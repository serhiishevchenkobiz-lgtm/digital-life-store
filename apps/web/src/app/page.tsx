import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { BookCover } from "@/components/book-cover";
import { Container } from "@/components/container";
import { books, getCategories } from "@/lib/catalog";
import { formatPrice } from "@/lib/utils";

const categories = getCategories();
const featured = books.slice(0, 5);
const newest = [...books].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const popular = books.slice(0, 5);
const practical = books.filter((book) => ["Productivity", "Home", "Mind", "Lifestyle"].includes(book.category));

const sidebarGroups = [
  { title: "Popular Categories", items: ["Work, Business & Leadership", "Technology & Digital Life", "Health, Fitness & Wellbeing", "History & Culture", "Mind & Psychology", "Personal Growth & Self-Help", "Science & Discovery"] },
  { title: "Fiction", items: ["Crime & Mystery", "Fantasy & Speculative Fiction", "Literary Fiction", "Romance", "Science Fiction", "Thrillers & Suspense", "Young Adult Fiction"] },
  { title: "Non-fiction", items: ["Biography & Memoir", "Design & Architecture", "Food & Cooking", "Gardening & Nature", "Health & Medicine", "Travel & Places"] },
];

export default function HomePage() {
  return (
    <div className="store-home">
      <div className="store-shell">
        <aside className="store-sidebar" aria-label="Book categories">
          <section className="sidebar-panel bg-sky-pale">
            <p className="sidebar-kicker">New to the press?</p>
            <h2>Find the next book for you.</h2>
            <p>Browse by subject, compare editions and keep every purchase in your library.</p>
            <Link className="sidebar-button" href="/free-library">Get a free read</Link>
          </section>
          {sidebarGroups.map((group) => (
            <section className="sidebar-panel" key={group.title}>
              <h2 className="sidebar-heading">{group.title}</h2>
              {group.items.map((label) => <Link className="sidebar-link" href={`/books?q=${encodeURIComponent(label)}`} key={label}>{label}</Link>)}
            </section>
          ))}
        </aside>

        <main className="store-main">
          <section className="featured-strip" aria-label="Featured titles">
            <div className="section-tabs">
              <a className="section-tab active" href="#featured">Featured Titles</a>
              <a className="section-tab" href="#new">Just Arrived</a>
              <a className="section-tab" href="#bestsellers">Bestsellers</a>
              <a className="section-tab" href="#reading">What We&apos;re Reading</a>
            </div>
            <div className="cover-carousel">
              {featured.map((book) => <Link key={book.slug} href={`/books/${book.slug}`} className="carousel-cover" aria-label={book.title}><BookCover palette={book.cover.palette} motif={book.cover.motif} spineLabel={book.cover.spineLabel} title={book.title} /></Link>)}
            </div>
          </section>

          <section className="shop-lead">
            <article className="lead-feature">
              <div className="lead-cover"><BookCover palette={books[0].cover.palette} motif={books[0].cover.motif} spineLabel={books[0].cover.spineLabel} title={books[0].title} /></div>
              <div className="lead-copy">
                <p className="store-kicker">Featured title</p>
                <h1>{books[0].title}</h1>
                <p>{books[0].subtitle}</p>
                <p className="tabular font-bold text-logo-green">From {formatPrice(books[0].priceCents)}</p>
                <div className="lead-actions"><Link href={`/books/${books[0].slug}`} className="primary-action">View book</Link><Link href="/books" className="secondary-action">Browse all books</Link></div>
              </div>
            </article>
            <section className="topic-box" aria-labelledby="popular-subjects-title">
              <h2 id="popular-subjects-title">Popular subjects...</h2>
              <div className="topic-grid">
                {sidebarGroups[0].items.slice(0, 8).map((label) => <Link key={label} href={`/books?q=${encodeURIComponent(label)}`} className="topic-link"><span>{label}</span></Link>)}
              </div>
            </section>
          </section>

          <StoreShelf id="featured" title="Featured Titles" items={featured} />
          <StoreShelf id="new" title="Just Arrived" items={newest} />
          <StoreShelf id="bestsellers" title="Digital Life Press Bestsellers" items={popular} />

          <section id="reading" className="category-promo">
            <div>
              <p className="store-kicker">Browse the shop</p>
              <h2>Find a shelf by subject.</h2>
              <p>Category names are adapted from familiar bookstore subject families and rewritten for our catalogue, search intent and SEO.</p>
              <Link href="/categories" className="info-link">View all categories →</Link>
            </div>
            <div className="category-promo-links">
              {categories.map((category) => <Link key={category.slug} href={`/categories/${category.slug}`}><span>{category.name}</span><small>{category.books.length}</small></Link>)}
            </div>
          </section>

          <StoreShelf id="useful" title="Useful Reads" items={practical.length ? practical : books} />

          <section className="reading-service-grid" aria-label="Reader services">
            <InfoTile href="/about" title="About the Press" text="How we choose, edit and publish our books." />
            <InfoTile href="/books" title="Book formats" text="Compare ebook, audio and bundle editions." />
            <InfoTile href="/library" title="Read online" text="Keep purchases together in your personal library." />
            <InfoTile href="/help" title="Help & support" text="Accounts, payments, downloads and reading help." />
          </section>
        </main>
      </div>

      <Container>
        <section className="home-bottom-note">
          <div><p className="store-kicker">A better way to browse</p><h2>Clear shelves. Clear prices. No maze.</h2></div>
          <Link href="/books" className="secondary-action">See the full catalogue →</Link>
        </section>
      </Container>
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
