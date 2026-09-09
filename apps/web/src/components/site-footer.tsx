import Link from "next/link";
import { Container } from "@/components/container";

const serviceBlocks = [
  { href: "/about", title: "About the Press", text: "Who we are, how we publish, and what belongs on our shelves." },
  { href: "/books", title: "Book formats", text: "Compare ebook, audio and bundle options before you buy." },
  { href: "/library", title: "My library", text: "Return to your purchases and keep your reading together." },
  { href: "/help", title: "Help", text: "Answers about accounts, downloads, reading and orders." },
  { href: "/free-library", title: "Free reading", text: "Start with free excerpts, samples and practical downloads." },
  { href: "/contact", title: "Contact", text: "Get in touch with the Digital Life Press team." },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/terms", label: "Terms" },
  { href: "/licenses", label: "Licenses" },
  { href: "/authors", label: "Authors" },
];

export function SiteFooter() {
  return (
    <footer className="classic-footer mt-16 sm:mt-20">
      <Container>
        <div className="footer-service-grid">
          {serviceBlocks.map((block) => (
            <Link key={block.href} href={block.href} className="footer-service">
              <span className="footer-service-icon" aria-hidden="true">✦</span>
              <span><strong>{block.title}</strong><small>{block.text}</small></span>
            </Link>
          ))}
        </div>
      </Container>

      <div className="footer-dark">
        <Container className="footer-dark-inner">
          <div>
            <Link href="/" className="font-serif text-3xl text-white">Digital Life<span className="text-logo-green"> Press</span></Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/70">A digital bookstore for useful ideas, thoughtful reading and books you can keep close.</p>
          </div>
          <div className="footer-columns">
            <div><h2>Discover</h2><Link href="/books">Browse books</Link><Link href="/categories">Categories</Link><Link href="/audio">Audiobooks</Link></div>
            <div><h2>Readers</h2><Link href="/library">My library</Link><Link href="/free-library">Free library</Link><Link href="/account/sign-in">Sign in</Link></div>
            <div><h2>More</h2><Link href="/about">About</Link><Link href="/help">Help</Link><Link href="/contact">Contact</Link></div>
          </div>
        </Container>
        <Container className="footer-legal">
          <p>© {new Date().getFullYear()} Digital Life Press · Digital delivery worldwide</p>
          <nav aria-label="Legal and policy links">{legal.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
        </Container>
      </div>
    </footer>
  );
}
