"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AccountMenu } from "@/components/account-menu";
import { useCart } from "@/components/cart-provider";
import { Container } from "@/components/container";

const topLinks = [
  { href: "/books", label: "Browse" },
  { href: "/gifts", label: "Gift Certificates" },
  { href: "/books?q=drm-free", label: "DRM-Free Books" },
  { href: "/feedback", label: "Feedback" },
  { href: "/blog", label: "Blog" },
];

const locales = [
  ["en-US", "English"],
  ["uk-UA", "Українська"],
  ["pl-PL", "Polski"],
  ["de-DE", "Deutsch"],
  ["es-ES", "Español"],
  ["fr-FR", "Français"],
] as const;

export function SiteHeader() {
  const [query, setQuery] = useState("");
  const [locale, setLocale] = useState("en-US");
  const router = useRouter();
  const { items } = useCart();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = query.trim();
    router.push(search ? `/books?q=${encodeURIComponent(search)}` : "/books");
  }

  return (
    <header className="site-header bg-white text-blue-deep">
      <div className="border-b border-sky-line bg-sky-muted">
        <Container className="flex min-h-9 items-center gap-4 overflow-x-auto whitespace-nowrap text-[13px]">
          {topLinks.map((item) => <Link key={item.href} href={item.href} className="font-medium hover:text-sky hover:underline">{item.label}</Link>)}
          <div className="ml-auto flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-[12px] font-semibold" htmlFor="site-language">
              <span aria-hidden="true">◎</span> Language
              <select
                id="site-language"
                value={locale}
                onChange={(event) => setLocale(event.target.value)}
                className="border border-sky-line bg-white px-2 py-1 text-[12px] font-semibold text-blue-deep"
                aria-label="Site language"
              >
                {locales.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <Link href="/account/sign-in" className="font-semibold hover:text-sky">Sign in</Link>
            <Link href="/account/sign-up" className="font-semibold hover:text-sky">Create an Account</Link>
            <Link href="/checkout" className="font-bold hover:text-sky">Basket ({items.length})</Link>
          </div>
        </Container>
      </div>

      <Container className="flex min-h-[88px] items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Digital bookstore home">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-400 bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-2xl font-bold text-emerald-600 shadow-sm">✦</span>
          <span className="site-logo text-[39px] leading-none tracking-[-.045em] text-logo-blue sm:text-[46px]">Book<span className="text-logo-green">haven</span></span>
        </Link>
        <p className="hidden max-w-xs text-right text-sm leading-5 text-slate lg:block">Independent digital publishing<br />Books, audio and reader resources</p>
      </Container>

      <div className="header-search border-y border-sky-line bg-sky-pale">
        <Container className="grid min-h-[58px] grid-cols-[170px_minmax(0,1fr)_auto] items-center gap-4">
          <div className="hidden border-r border-sky-line pr-4 text-center text-sm font-semibold text-blue-deep sm:block">New to the shop?<br /><Link href="/about" className="text-sky hover:underline">Learn how it works</Link></div>
          <form onSubmit={submitSearch} className="col-span-2 flex min-w-0 sm:col-span-1" role="search">
            <label className="sr-only" htmlFor="site-search">Search by title, author, subject or ISBN</label>
            <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, author, subject or ISBN" className="min-w-0 flex-1 border border-sky-line bg-white px-4 py-3 text-base text-blue-deep outline-none focus:border-sky" />
            <button type="submit" className="ml-1 rounded bg-blue-deep px-6 py-3 text-sm font-bold text-white hover:bg-sky">GO</button>
          </form>
          <Link href="/checkout" className="hidden text-sm font-bold text-blue-deep sm:block">View basket ({items.length})</Link>
        </Container>
      </div>

      <div className="border-b-2 border-sky-line bg-white">
        <Container className="flex min-h-12 items-center gap-7 overflow-x-auto whitespace-nowrap text-[14px] text-blue-deep">
          <Link href="/books" className="font-bold hover:text-sky hover:underline">Browse ebooks</Link>
          <Link href="/full-book" className="font-bold text-sky hover:underline">Full Book</Link>
          <Link href="/books?q=bestseller" className="hover:text-sky hover:underline">Bestsellers</Link>
          <Link href="/books?q=new" className="hover:text-sky hover:underline">New titles</Link>
          <Link href="/categories" className="hover:text-sky hover:underline">Categories</Link>
          <Link href="/free-library" className="hover:text-sky hover:underline">Free library</Link>
          <Link href="/library" className="hover:text-sky hover:underline">My Books</Link>
          <Link href="/wishlist" className="hover:text-sky hover:underline">Wishlist</Link>
          <div className="ml-auto flex items-center gap-4"><AccountMenu /><Link href="/checkout" className="font-bold">Basket {items.length}</Link></div>
        </Container>
      </div>
    </header>
  );
}
