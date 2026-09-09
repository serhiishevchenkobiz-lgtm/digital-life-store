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
  { href: "/about", label: "Commercial Solutions" },
];

const helpLinks = [
  { href: "/help", label: "Help" },
  { href: "/about", label: "How it works" },
];

export function SiteHeader() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { items } = useCart();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = query.trim();
    router.push(search ? `/books?q=${encodeURIComponent(search)}` : "/books");
  }

  return (
    <header className="site-header bg-white">
      <div className="header-top border-b border-sky-line bg-sky-muted text-blue-deep">
        <Container className="flex min-h-8 items-center gap-4 overflow-x-auto whitespace-nowrap text-[12px]">
          {topLinks.map((item) => <Link key={item.href} href={item.href} className="font-medium hover:text-sky hover:underline">{item.label}</Link>)}
          <span className="ml-auto hidden sm:inline text-slate">|</span>
          <Link href="/account/sign-in" className="font-semibold hover:text-sky">Sign in</Link>
          <Link href="/account/sign-up" className="font-semibold hover:text-sky">Create an Account</Link>
          {helpLinks.map((item) => <Link key={item.href} href={item.href} className="hover:text-sky">{item.label}</Link>)}
          <Link href="/checkout" className="font-bold hover:text-sky">Basket ({items.length})</Link>
        </Container>
      </div>

      <Container className="flex min-h-[76px] items-center justify-between gap-6 py-3 sm:min-h-[88px]">
        <Link href="/" className="site-logo text-logo-blue text-[38px] leading-none tracking-[-.06em] sm:text-[48px]" aria-label="Digital Life Press — home">
          <span className="text-logo-green">e</span>Books<span className="text-logo-green">Press</span>
        </Link>
        <p className="hidden text-right text-sm text-slate lg:block">Independent digital publishing<br />Books, audio and reader resources</p>
      </Container>

      <div className="header-search border-y border-sky-line bg-sky-pale">
        <Container className="grid min-h-[50px] grid-cols-[160px_minmax(0,1fr)_auto] items-center gap-3">
          <div className="hidden border-r border-sky-line pr-4 text-center text-xs font-semibold text-blue-deep sm:block">New to Digital Life?<br /><Link href="/about" className="text-sky hover:underline">Learn more</Link></div>
          <form onSubmit={submitSearch} className="col-span-2 flex min-w-0 sm:col-span-1" role="search">
            <label className="sr-only" htmlFor="site-search">Search by title, author, subject or ISBN</label>
            <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, author, subject or ISBN" className="min-w-0 flex-1 border border-sky-line bg-white px-3 py-2 text-sm text-blue-deep outline-none focus:border-sky" />
            <button type="submit" className="ml-1 rounded bg-blue-deep px-4 py-2 text-sm font-bold text-white hover:bg-sky">GO</button>
          </form>
          <Link href="/checkout" className="hidden text-xs font-bold text-blue-deep sm:block">View basket ({items.length})</Link>
        </Container>
      </div>

      <div className="border-b border-sky-line bg-white">
        <Container className="flex min-h-10 items-center gap-6 overflow-x-auto whitespace-nowrap text-[13px] text-blue-deep">
          <Link href="/books" className="font-bold hover:text-sky hover:underline">Browse ebooks</Link>
          <Link href="/books?q=bestseller" className="hover:text-sky hover:underline">Bestsellers</Link>
          <Link href="/books?q=new" className="hover:text-sky hover:underline">New titles</Link>
          <Link href="/categories" className="hover:text-sky hover:underline">Categories</Link>
          <Link href="/free-library" className="hover:text-sky hover:underline">Free library</Link>
          <Link href="/library" className="hover:text-sky hover:underline">My Books</Link>
          <Link href="/wishlist" className="hover:text-sky hover:underline">Wishlist</Link>
          <div className="ml-auto flex items-center gap-3"><AccountMenu /><Link href="/checkout" className="font-bold">Basket {items.length}</Link></div>
        </Container>
      </div>
    </header>
  );
}
