"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/container";
import { AccountMenu } from "@/components/account-menu";
import { useCart } from "@/components/cart-provider";

const topLinks = [
  { href: "/books", label: "Browse" },
  { href: "/gifts", label: "Gift Certificates" },
  { href: "/free-library", label: "Free Reads" },
  { href: "/feedback", label: "Feedback" },
  { href: "/blog", label: "Blog" },
];

const nav = [
  { href: "/books", label: "Featured Titles" },
  { href: "/books", label: "Just Arrived" },
  { href: "/categories", label: "Popular Categories" },
  { href: "/audio", label: "Audiobooks" },
  { href: "/about", label: "About the Press" },
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
    <header className="site-header relative z-40 border-b border-sky-line bg-white">
      <div className="header-top border-b border-sky-line bg-white text-[12px] text-blue-deep">
        <Container className="flex min-h-8 items-center justify-between gap-4 overflow-x-auto whitespace-nowrap">
          <nav aria-label="Utility" className="flex items-center gap-7">
            {topLinks.map((item) => (
              <Link key={item.href + item.label} href={item.href} className="hover:text-sky hover:underline">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/account/sign-in" className="hover:text-sky hover:underline">Sign In</Link>
            <Link href="/account/sign-up" className="hover:text-sky hover:underline">Create an Account</Link>
            <Link href="/help" className="hover:text-sky hover:underline">Help</Link>
          </div>
        </Container>
      </div>

      <Container className="flex min-h-[74px] items-center justify-between gap-6 py-2">
        <Link href="/" className="site-logo group shrink-0 font-serif text-[38px] leading-none tracking-[-.055em] text-logo-blue" aria-label="Digital Life Press — home">
          <span className="text-logo-green">D</span><span>igitalLife</span><span className="text-logo-green">Press</span>
        </Link>

        <div className="hidden text-right md:block">
          <p className="font-serif text-lg text-blue-deep">Digital books for curious lives</p>
          <p className="text-[11px] text-slate">EPUB · PDF · Audio · Worldwide delivery</p>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <AccountMenu />
          <Link href="/checkout" className="text-sm font-semibold text-blue-deep">Basket ({items.length})</Link>
          <button type="button" className="px-2 py-2 text-xs font-bold uppercase" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            Menu
          </button>
        </div>
      </Container>

      <div className="header-search border-y border-sky-line bg-sky-pale">
        <Container className="flex items-center gap-2 py-2">
          <span className="hidden whitespace-nowrap text-[13px] text-slate sm:inline">Search our ebook catalogue</span>
          <form onSubmit={submitSearch} className="flex min-w-0 flex-1" role="search">
            <label className="sr-only" htmlFor="site-search">Search by title, author, subject or ISBN</label>
            <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, author, subject or ISBN" className="min-w-0 flex-1 border border-sky-line bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-slate focus:border-sky" />
            <button type="submit" className="ml-1 min-w-11 rounded-sm bg-blue-deep px-3 py-2 text-xs font-bold uppercase text-white hover:bg-sky">Go</button>
          </form>
        </Container>
      </div>

      <div className="header-nav border-b border-sky-line bg-sky-muted">
        <Container className="hidden min-h-10 items-center lg:flex">
          <nav aria-label="Primary" className="flex min-w-0 overflow-hidden">
            {nav.map((item) => (
              <Link key={item.href + item.label} href={item.href} className="border-r border-sky-line px-5 py-2 text-[13px] text-blue-deep first:border-l hover:bg-white hover:text-sky">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto pl-4 text-[12px] text-slate">
            <Link href="/checkout" className="font-semibold text-blue-deep hover:text-sky">Basket ({items.length})</Link>
          </div>
        </Container>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 border-b border-sky-line bg-white shadow-lg lg:hidden">
          <Container className="py-4">
            <form onSubmit={submitSearch} className="mb-4 flex" role="search">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the catalogue" className="min-w-0 flex-1 border border-sky-line px-3 py-2 text-sm outline-none" aria-label="Search the catalogue" />
              <button type="submit" className="bg-blue-deep px-4 text-xs font-bold uppercase text-white">Go</button>
            </form>
            <nav aria-label="Mobile primary" className="grid border-y border-sky-line">
              {nav.map((item) => <Link key={item.href + item.label} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-sky-line py-3 text-sm text-blue-deep last:border-b-0 hover:text-sky">{item.label}</Link>)}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
