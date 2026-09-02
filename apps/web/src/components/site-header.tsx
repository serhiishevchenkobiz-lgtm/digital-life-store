import Link from "next/link";
import { Container } from "@/components/container";
import { AccountMenu } from "@/components/account-menu";

const nav = [
  { href: "/books", label: "Books" },
  { href: "/audio", label: "Audio" },
  { href: "/categories", label: "Categories" },
  { href: "/free-library", label: "Free Library" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70 border-b border-muted-line">
      <Container className="flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-xl tracking-tight"
          aria-label="Digital Life Press — home"
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-accent group-hover:scale-110 transition-transform"
          />
          <span>
            Digital Life <span className="text-accent">Press</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <AccountMenu />
          <Link
            href="/books"
            className="inline-flex items-center rounded-md bg-ink text-paper px-4 py-2 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            Browse
          </Link>
        </div>
      </Container>
    </header>
  );
}