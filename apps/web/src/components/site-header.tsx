"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/container";
import { AccountMenu } from "@/components/account-menu";
import { useCart } from "@/components/cart-provider";

const nav = [
  { href: "/books", label: "Browse" },
  { href: "/categories", label: "Categories" },
  { href: "/audio", label: "Audiobooks" },
  { href: "/free-library", label: "Free Reads" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { items } = useCart();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = query.trim();
    router.push(search ? `/books?q=${encodeURIComponent(search)}` : "/books");
    setMenuOpen(false);
  }

  return (
    <header className="site-header relative z-40 border-b border-ink/15 bg-paper-bright">
      <Container className="flex min-h-14 items-center justify-between gap-3 text-xs sm:min-h-12">
        <p className="hidden text-ink-muted sm:block">Independent digital books for curious lives.</p>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/free-library" className="font-semibold hover:text-accent">Free reading</Link>
          <span className="hidden text-ink-muted sm:inline">EPUB · PDF · Audio</span>
        </div>
      </Container>

      <Container className="flex min-h-[78px] items-center gap-6 py-3 lg:min-h-[92px]">
        <Link href="/" className="group flex shrink-0 items-center gap-2 font-display text-[25px] tracking-[-.03em] sm:text-[30px]" aria-label="Digital Life Press — home">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-sm bg-ink text-sm font-sans font-bold text-paper transition-transform group-hover:rotate-[-4deg]">DL</span>
          <span>Digital Life <em className="font-normal text-accent">Press</em></span>
        </Link>

        <form onSubmit={submitSearch} className="hidden min-w-0 max-w-2xl flex-1 lg:block" role="search">
          <label className="sr-only" htmlFor="site-search">Search by title, author, topic</label>
          <div className="search-box flex items-center bg-paper-deep px-4">
            <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, author or topic" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-ink-muted" />
            <button type="submit" className="px-2 py-2 text-xs font-bold uppercase tracking-[.12em] text-ink hover:text-accent" aria-label="Search catalogue">Search</button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <AccountMenu />
          <Link href="/checkout" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold hover:text-accent" aria-label={`Basket, ${items.length} item${items.length === 1 ? "" : "s"}`}>
            <span>Basket</span><span className="grid h-6 min-w-6 place-items-center rounded-full border border-ink/20 px-1 text-[10px]">{items.length}</span>
          </Link>
          <button type="button" className="inline-flex min-h-10 items-center gap-2 px-2 text-sm font-semibold lg:hidden" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span className="sr-only">{menuOpen ? "Close" : "Open"} menu</span>
            <span aria-hidden className="text-[11px] uppercase tracking-[.14em]">Menu</span>
            <span aria-hidden className="grid gap-1"><span className="block h-px w-5 bg-ink" /><span className="block h-px w-5 bg-ink" /></span>
          </button>
        </div>
      </Container>

      <div className="border-t border-ink/10 bg-paper-deep">
        <Container className="hidden h-12 items-center justify-between lg:flex">
          <nav aria-label="Primary" className="flex h-full items-center gap-8">
            {nav.map((item) => <Link key={item.href} href={item.href} className="flex h-full items-center border-b-2 border-transparent text-sm font-semibold transition-colors hover:border-accent hover:text-accent">{item.label}</Link>)}
          </nav>
          <p className="text-xs text-ink-muted"><span className="font-bold text-accent">10% saving</span> on any three eligible books</p>
        </Container>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 border-b border-ink/10 bg-paper-bright shadow-editorial lg:hidden">
          <Container className="py-6">
            <form onSubmit={submitSearch} className="mb-6" role="search">
              <label className="sr-only" htmlFor="mobile-site-search">Search books and topics</label>
              <div className="search-box flex bg-paper-deep px-3"><input id="mobile-site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the catalogue" className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm outline-none" /><button type="submit" className="px-3 text-xs font-bold uppercase tracking-wide">Go</button></div>
            </form>
            <nav aria-label="Mobile primary" className="grid divide-y divide-muted-line border-y border-muted-line">
              {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="py-4 font-display text-2xl hover:text-accent">{item.label}</Link>)}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
