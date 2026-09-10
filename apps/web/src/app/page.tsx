import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { BookAssistant } from "@/components/book-assistant";
import { Container } from "@/components/container";
import { books, getCategories } from "@/lib/catalog";
import { getBookPath } from "@/lib/catalog-taxonomy";
import { formatPrice } from "@/lib/utils";

const categories = getCategories();
const newest = [...books].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
const firstBook = books[0];
const firstPath = getBookPath(firstBook);

const categoryDescriptions: Record<string, string> = {
  Lifestyle: "Everyday life, routines and small rituals.",
  Mind: "Focus, awareness and clearer thinking.",
  Productivity: "Planning, habits and sustainable systems.",
  Home: "Living spaces, comfort and the way we live.",
};

export default function HomePage() {
  return (
    <div className="store-home botanical-storefront">
      <div className="store-frame" aria-hidden="true">
        <span className="ornament ornament-tl">❀ 〰</span>
        <span className="ornament ornament-tr">❀ 〰</span>
        <span className="ornament ornament-bl">❀ 〰</span>
        <span className="ornament ornament-br">❀ 〰</span>
      </div>

      <Container className="storefront-container">
        <div className="storefront-grid">
          <aside className="storefront-left-rail" aria-label="Bookstore navigation">
            <section className="left-rail-panel left-rail-welcome">
              <p className="rail-kicker">Explore the shop</p>
              <h2>Find your next favorite book.</h2>
              <p>Choose a category, follow its section and open the shelf that fits what you want to read.</p>
              <Link href="/full-book" className="rail-primary">Open Full Book →</Link>
            </section>

            <section className="left-rail-panel">
              <h2 className="rail-heading">Browse</h2>
              {[["Home", "/"], ["All Books", "/books"], ["Categories", "/categories"], ["Full Book", "/full-book"], ["Bestsellers", "/books?q=bestseller"], ["New Titles", "/books?q=new"], ["Free Library", "/free-library"], ["My Library", "/library"], ["Wishlist", "/wishlist"]].map(([label, href]) => (
                <Link key={href} href={href} className={`rail-link${href === "/" ? " is-active" : ""}`}>
                  <span className="rail-link-icon" aria-hidden="true">{href === "/" ? "⌂" : href === "/full-book" ? "▤" : href === "/wishlist" ? "♡" : "○"}</span>{label}
                </Link>
              ))}
            </section>

            <section className="left-rail-panel">
              <h2 className="rail-heading">Categories</h2>
              {categories.map((category) => (
                <Link href={`/categories/${category.slug}`} key={category.slug} className="rail-category-link">
                  <span><span className="rail-link-icon" aria-hidden="true">✦</span>{category.name}</span><small>{category.books.length}</small>
                </Link>
              ))}
            </section>

            <section className="left-rail-panel rail-information">
              <h2 className="rail-heading">Information</h2>
              {[ ["Gift Certificates", "/gifts"], ["DRM-Free Books", "/books?q=drm-free"], ["Feedback", "/feedback"], ["Blog", "/blog"], ["How it works", "/about"], ["Contact", "/contact"] ].map(([label, href]) => (
                <Link href={href} className="rail-link" key={href}><span className="rail-link-icon" aria-hidden="true">◦</span>{label}</Link>
              ))}
            </section>
          </aside>

          <main className="storefront-main">
            <section className="home-hero" aria-label="Bookstore introduction">
              <div className="home-hero-copy">
                <p className="store-kicker">Your digital library</p>
                <h1>Books for a more beautiful everyday.</h1>
                <p className="home-hero-subtitle">Thoughtful books, calming audio and practical tools for a better life.</p>
                <Link href="/categories" className="hero-button">Explore our collection →</Link>
              </div>
              <div className="home-hero-art" aria-hidden="true">
                <div className="hero-landscape" />
                <div className="hero-books-stack"><i /><i /><i /><i /></div>
                <div className="hero-vase">❀</div>
              </div>
            </section>

            <section className="home-section featured-section" aria-labelledby="featured-book-title">
              <div className="home-section-heading"><div className="section-rule"><span>Featured Book</span></div><Link href={`/categories/${firstPath.category.toLowerCase()}`}>View shelf →</Link></div>
              <div className="featured-book-card">
                <div className="featured-cover-wrap"><BookCover palette={firstBook.cover.palette} motif={firstBook.cover.motif} spineLabel={firstBook.cover.spineLabel} title={firstBook.title} className="featured-cover" /></div>
                <div className="featured-book-copy">
                  <span className="book-pill">{firstPath.category}</span>
                  <h2 id="featured-book-title">{firstBook.title}</h2>
                  <p className="book-subtitle">{firstBook.subtitle}</p>
                  <p className="book-path">{firstPath.category} <span>•</span> {firstPath.section} <span>•</span> {firstPath.topic}</p>
                  <p className="book-description">{firstBook.shortDescription}</p>
                  <p className="book-price">From {formatPrice(firstBook.priceCents)}</p>
                  <div className="book-actions"><Link href={`/books/${firstBook.slug}`} className="hero-button">View book →</Link><Link href={`/categories/${firstPath.category.toLowerCase()}`} className="outline-button">Open its shelf →</Link></div>
                </div>
                <div className="featured-note" aria-hidden="true"><span>✿</span><em>Small books.<br />Big changes.</em></div>
              </div>
            </section>

            <section className="home-section" id="categories" aria-labelledby="category-title">
              <div className="home-section-heading"><div className="section-rule"><span id="category-title">Shop by Category</span></div><Link href="/categories">See all categories →</Link></div>
              <div className="category-card-grid">
                {categories.map((category) => (
                  <Link href={`/categories/${category.slug}`} className="category-card" key={category.slug}>
                    <div className={`category-art category-art-${category.slug}`} aria-hidden="true"><span>✿</span></div>
                    <div className="category-card-body"><strong>{category.name}</strong><p>{categoryDescriptions[category.name] ?? "Books collected around a clear subject."}</p><span>Open shelf →</span></div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="home-section" id="new" aria-labelledby="new-title">
              <div className="home-section-heading"><div className="section-rule"><span id="new-title">Just Arrived</span></div><Link href="/books?q=new">More books →</Link></div>
              <div className="mini-shelf-grid">
                {newest.slice(0, 5).map((book) => (
                  <Link href={`/books/${book.slug}`} className="mini-book-card" key={book.slug}>
                    <div className="mini-book-cover"><BookCover palette={book.cover.palette} motif={book.cover.motif} spineLabel={book.cover.spineLabel} title={book.title} /></div>
                    <div className="mini-book-copy"><span>{book.category}</span><strong>{book.title}</strong><small>{formatPrice(book.priceCents)}</small></div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="full-book-callout">
              <div><p className="store-kicker">Full Book</p><h2>The complete catalogue, arranged by category, section and topic.</h2><p>Every title has one clear home. Editorial selections can appear on the front page without losing their canonical shelf.</p></div>
              <Link href="/full-book" className="outline-button">Open Full Book →</Link>
            </section>
          </main>

          <aside className="storefront-right-rail" aria-label="Bookstore information and media">
            <section className="right-rail-panel"><div className="right-panel-title">Discover More</div><p className="right-panel-intro">Helpful tools, useful links and inspiration for everyday reading.</p>
              {[["Free resources", "Free books, guides and tips"], ["Reading recommendations", "Curated by our editorial team"], ["Audio & video", "Listen, watch and be inspired"], ["Learning & growth", "Small steps, practical ideas"]].map(([title, text]) => (
                <Link href="/help" className="right-service" key={title}><span className="right-service-icon" aria-hidden="true">✦</span><span><strong>{title}</strong><small>{text}</small></span></Link>
              ))}
            </section>
            <section className="right-rail-panel media-panel"><div className="right-panel-title">Featured Media</div><p className="right-panel-intro">Books come to life with audio and video.</p><div className="media-scene" aria-label="Featured media preview"><span>▶</span><small>0:00 / 1:42</small></div><div className="media-features"><span>◉ HD Video & Audio</span><span>▣ Multiple formats</span><span>▤ Works on all devices</span></div></section>
            <section className="right-rail-panel"><div className="right-panel-title">Quick Links</div>{[["FAQ", "/help"], ["Shopping & Delivery", "/help"], ["Returns & Refunds", "/help"], ["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]].map(([label, href]) => <Link className="quick-link" href={href} key={label}>◦ {label}</Link>)}</section>
            <section className="right-rail-panel help-panel"><div className="right-panel-title">Need Help?</div><p>Our English knowledge base is here for you.</p><Link href="/help" className="info-link">Search the knowledge base →</Link></section>
          </aside>
        </div>
      </Container>
      <BookAssistant />
    </div>
  );
}
