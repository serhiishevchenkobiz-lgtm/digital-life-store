import Link from "next/link";
import { Container } from "@/components/container";

const columns = [
  {
    title: "Read",
    links: [
      { href: "/books", label: "All books" },
      { href: "/categories", label: "Categories" },
      { href: "/free-library", label: "Free Library" },
    ],
  },
  {
    title: "Listen",
    links: [
      { href: "/audio", label: "Audio editions" },
      { href: "/audio#samples", label: "Audio samples" },
    ],
  },
  {
    title: "Press",
    links: [
      { href: "/about", label: "About" },
      { href: "/journal", label: "Journal" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/library", label: "My Library" },
      { href: "/account", label: "Account" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-muted-line bg-paper-deep">
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-xl tracking-tight">
              Digital Life <span className="text-accent">Press</span>
            </Link>
            <p className="mt-3 text-sm text-ink-muted max-w-xs leading-relaxed">
              A small editorial press for digital books and audio that respect
              your time and attention.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-soft hover:text-ink transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule mt-12" />

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} Digital Life Press. All rights reserved.</p>
          <p className="tabular">
            Hand-edited. Built quietly. Designed for the long read.
          </p>
        </div>
      </Container>
    </footer>
  );
}