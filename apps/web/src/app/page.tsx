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
    <div className="store-home">
      <div className="store-frame" aria-hidden="true"><span className="ornament ornament-tl">❀</span><span className="ornament ornament-tr">❀</span><span className="ornament ornament-bl">❀</span><span className="ornament ornament-br">❀</span></div>
      <div className="relative z-10">
        <div className="store-shell botanical-home-shell">
          <aside className="store-sidebar" aria-label="Bookstore navigation">
            <section className="sidebar-panel sidebar-welcome"><p className="sidebar-kicker">Explore the shop</p><h2>Find your next favorite book.</h2><p>Choose a doorway, then follow the category, section and topic to its shelf.</p><Link className="sidebar-button" href="/full-book">Open Full Book</Link></section>
            <section className="sidebar-panel"><h2 className="sidebar-heading">Browse</h2>{[['Home','/'],['All Books','/books'],['Categories','/categories'],['Full Book','/full-book'],['Bestsellers','/books?q=bestseller'],['New Titles','/books?q=new'],['Free Library','/free-library'],['My Library','/library'],['Wishlist','/wishlist']].map(([label,href],i)=><Link className={i===0?'sidebar-link sidebar-link-active':'sidebar-link'} href={href} key={label}>{label}</Link>)}</section>
            <section className="sidebar-panel"><h2 className="sidebar-heading">Categories</h2>{categories.map(c=><Link className="sidebar-category-link" href={`/categories/${c.slug}`} key={c.slug}><span>{c.name}</span><small>{c.books.length}</small></Link>)}</section>
            <section className="sidebar-panel sidebar-info-panel"><h2 className="sidebar-heading">Information</h2>{[['Gift Certificates','/gifts'],['DRM-Free Books','/books?q=drm-free'],['Feedback','/feedback'],['Blog','/blog'],['How it works','/about'],['Contact','/contact']].map(([label,href])=><Link className="sidebar-link" href={href} key={href}>{label}</Link>)}</section>
          </aside>

          <main className="store-main">
            <section className="hero-stage" aria-label="Bookstore introduction"><div className="hero-copy"><p className="store-kicker">Your digital library</p><h1>Books for a more beautiful everyday.</h1><p>Thoughtful books, calming audio and practical tools for a better life.</p><Link href="/categories" className="primary-action">Explore our collection →</Link></div><div className="hero-art" aria-hidden="true"><div className="hero-shelf-line"/><span className="hero-book hero-book-one"/><span className="hero-book hero-book-two"/><span className="hero-book hero-book-three"/><span className="hero-floral">✿</span></div></section>

            <section className="featured-book-panel" aria-labelledby="featured-book-title"><div className="section-rule"><span>Featured Book</span></div><div className="featured-book-inner"><div className="lead-cover"><BookCover palette={firstBook.cover.palette} motif={firstBook.cover.motif} spineLabel={firstBook.cover.spineLabel} title={firstBook.title}/></div><div className="lead-copy"><p className="book-pill">{firstPath.category}</p><h2 id="featured-book-title">{firstBook.title}</h2><p className="lead-subtitle">{firstBook.subtitle}</p><p className="book-path">{firstPath.category}<span>•</span>{firstPath.section}<span>•</span>{firstPath.topic}</p><p className="lead-description">{firstBook.shortDescription}</p><p className="tabular lead-price">From {formatPrice(firstBook.priceCents)}</p><div className="lead-actions"><Link href={`/books/${firstBook.slug}`} className="primary-action">View book →</Link><Link href={`/categories/${firstPath.category.toLowerCase()}`} className="secondary-action">Open its shelf →</Link></div></div><div className="featured-ornament" aria-hidden="true">✿<br/><span>Small books.<br/>Big changes.</span></div></div></section>

            <section className="category-doorways" id="categories" aria-labelledby="category-doorways-title"><div className="section-rule"><span id="category-doorways-title">Shop by Category</span><Link href="/categories">See all categories →</Link></div><div className="category-card-grid">{categories.map(category=><Link key={category.slug} href={`/categories/${category.slug}`} className="category-card"><div className={`category-image category-${category.slug}`} aria-hidden="true"><span>✿</span></div><strong>{category.name}</strong><small>Explore its shelves →</small></Link>)}</div></section>

            <section className="store-shelf" id="new" aria-labelledby="new-title"><div className="section-rule"><span id="new-title">Just Arrived</span><Link href="/books?q=new">More books →</Link></div><div className="shelf-grid">{newest.slice(0,5).map(book=><BookCard key={book.slug} book={book}/>)}</div></section>
            <section className="store-shelf compact-featured-shelf"><div className="section-rule"><span>A few more to explore</span><Link href="/books">See the full catalogue →</Link></div><div className="shelf-grid">{featured.slice(0,4).map(book=><BookCard key={book.slug} book={book}/>)}</div></section>
          </main>

          <aside className="store-right-rail" aria-label="Bookstore services and media">
            <section className="right-panel"><div className="right-panel-title">Discover More</div><p className="right-panel-intro">Helpful tools, useful links and inspiration for everyday reading.</p>{[['✦','Free resources','Free books, guides and tips'],['❧','Reading recommendations','Curated by our editorial team'],['◉','Audio & video','Listen, watch and be inspired'],['✿','Learning & growth','Small steps, practical ideas']].map(([icon,title,text])=><Link href="/help" className="right-service" key={title}><span className="service-icon" aria-hidden="true">{icon}</span><span><strong>{title}</strong><small>{text}</small></span></Link>)}</section>
            <section className="right-panel right-media-panel"><div className="right-panel-title">Featured Media</div><p className="right-panel-intro">Books come to life with audio and video.</p><div className="media-preview" role="img" aria-label="Featured audio and video preview"><span className="media-play">▶</span><span className="media-time">0:00 / 1:42</span></div><div className="media-meta"><span>◉ HD Video & Audio</span><span>▣ Multiple formats</span><span>▤ Works on all devices</span></div></section>
            <section className="right-panel"><div className="right-panel-title">Quick Links</div>{[['FAQ','/help'],['Shopping & Delivery','/help'],['Returns & Refunds','/help'],['Privacy Policy','/privacy'],['Terms of Service','/terms']].map(([label,href])=><Link className="quick-link" href={href} key={label}>◌ {label}</Link>)}</section>
            <section className="right-panel right-help-panel"><div className="right-panel-title">Need Help?</div><p>Our knowledge base is here for you.</p><Link href="/help" className="info-link">Search the knowledge base →</Link></section>
          </aside>
        </div>
        <Container><section className="home-bottom-note"><div><p className="store-kicker">Full Book</p><h2>The complete catalogue, arranged by category, section and topic.</h2></div><Link href="/full-book" className="secondary-action">Open Full Book →</Link></section></Container>
      </div>
      <BookAssistant />
    </div>
  );
}
