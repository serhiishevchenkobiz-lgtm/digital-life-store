"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/container";
import { AccountMenu } from "@/components/account-menu";
import { useCart } from "@/components/cart-provider";

const nav = [
  { href: "/books", label: "Books" },
  { href: "/categories", label: "Categories" },
  { href: "/audio", label: "Audiobooks" },
  { href: "/free-library", label: "Free reads" },
  { href: "/about", label: "Our press" },
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
    <header className="relative z-40 border-b border-ink/10 bg-paper-bright">
      <div className="bg-night text-paper">
        <Container className="flex h-9 items-center justify-between gap-4 text-[11px] font-medium tracking-wide">
          <p className="truncate">Independent digital books for curious lives.</p>
          <div className="hidden items-center gap-5 sm:flex">
            <span>EPUB · PDF · Audio</span>
            <Link href="/free-library" className="underline decoration-paper/40 underline-offset-4 hover:text-paper">Get a free read</Link>
          </div>
        </Container>
      </div>

      <Container className="flex min-h-[76px] items-center justify-between gap-4 py-3 lg:min-h-[88px]">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5 font-display text-[23px] leading-none tracking-tight sm:text-[27px]" aria-label="Digital Life Press — home">
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm text-paper transition-transform group-hover:rotate-12">D</span>
          <span>Digital Life <em className="font-normal text-accent">Press</em></span>
        </Link>

        <form onSubmit={submitSearch} className="hidden min-w-0 max-w-lg flex-1 lg:block" role="search">
          <label className="sr-only" htmlFor="site-search">Search books and topics</label>
          <div className="flex items-center border-b border-ink/25 focus-within:border-ink">
            <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, authors, topics" className="min-w-0 flex-1 bg-transparent px-0 py-2 text-sm outline-none placeholder:text-ink-muted" />
            <button type="submit" className="px-2 py-2 text-sm font-semibold text-ink hover:text-accent" aria-label="Search catalogue">Search</button>
          </div>
        </form>

        <div className="flex items-center gap-2 sm:gap-4">
          <AccountMenu />
          <Link href="/checkout" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent" aria-label={`Basket, ${items.length} item${items.length === 1 ? "" : "s"}`}>
            <span aria-hidden>Basket</span><span className="grid h-5 min-w-5 place-items-center rounded-full bg-leaf-pale px-1 text-[10px] text-ink">{items.length}</span>
          </Link>
          <Link href="/books" className="hidden border border-ink bg-ink px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:border-accent hover:bg-accent sm:inline-flex">Browse books</Link>
          <button type="button" className="inline-flex min-h-10 items-center gap-2 px-2 text-sm font-semibold lg:hidden" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span className="sr-only">{menuOpen ? "Close" : "Open"} menu</span>
            <span aria-hidden className="text-[11px] uppercase tracking-[0.14em]">Menu</span>
            <span aria-hidden className="grid gap-1"><span className="block h-px w-5 bg-ink" /><span className="block h-px w-5 bg-ink" /></span>
          </button>
        </div>
      </Container>

      <div className="border-t border-ink/10 bg-paper lg:block">
        <Container className="hidden h-12 items-center justify-between lg:flex">
          <nav aria-label="Primary" className="flex h-full items-center gap-7">
            {nav.map((item) => <Link key={item.href} href={item.href} className="text-sm font-medium text-ink-soft transition-colors hover:text-accent focus-visible:outline-offset-4">{item.label}</Link>)}
          </nav>
          <p className="text-xs text-ink-muted"><span className="font-semibold text-accent">Save 10%</span> on any three books in one order</p>
        </Container>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 border-b border-ink/10 bg-paper-bright shadow-editorial lg:hidden">
          <Container className="py-6">
            <form onSubmit={submitSearch} className="mb-6" role="search">
              <label className="sr-only" htmlFor="mobile-site-search">Search books and topics</label>
              <div className="flex border border-muted-line bg-paper"><input id="mobile-site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the catalogue" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none" /><button type="submit" className="bg-ink px-4 text-xs font-semibold uppercase tracking-wide text-paper">Go</button></div>
            </form>
            <nav aria-label="Mobile primary" className="grid gap-1">
              {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-muted-line py-3 font-display text-2xl hover:text-accent">{item.label}</Link>)}
              <Link href="/books" onClick={() => setMenuOpen(false)} className="mt-4 inline-flex w-fit bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-paper">Browse books</Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
