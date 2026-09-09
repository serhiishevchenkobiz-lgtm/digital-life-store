import Link from "next/link";
import { Container } from "@/components/container";

const columns = [
  { title: "Discover", links: [{ href: "/books", label: "All books" }, { href: "/categories", label: "Browse topics" }, { href: "/audio", label: "Audiobooks" }] },
  { title: "Read with us", links: [{ href: "/free-library", label: "Free library" }, { href: "/about", label: "About the press" }, { href: "/library", label: "My library" }] },
  { title: "Good to know", links: [{ href: "/account/sign-in", label: "Sign in" }, { href: "/books", label: "Formats & delivery" }, { href: "/about", label: "Editorial standards" }] },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-night text-paper sm:mt-28">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr] lg:gap-20">
          <div>
            <Link href="/" className="font-display text-3xl tracking-tight">Digital Life <em className="font-normal text-accent">Press</em></Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-paper/70">A digital publisher for readers who want less noise, better ideas, and useful books they can keep close.</p>
            <Link href="/free-library" className="mt-7 inline-flex border-b border-accent pb-1 text-sm font-semibold text-paper hover:text-accent">Get the free reading shelf →</Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-paper/45">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-paper/75 hover:text-paper">{link.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/45 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Digital Life Press.</p>
          <p>Independent publishing · Digital delivery worldwide</p>
        </div>
      </Container>
    </footer>
  );
}
