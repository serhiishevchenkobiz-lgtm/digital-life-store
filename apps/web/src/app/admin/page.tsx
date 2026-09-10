import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";

export const metadata: Metadata = { title: "Admin Dashboard | Bookhaven", description: "Central management area for the digital bookstore catalogue, commerce, content, translations, marketing and security." };

const modules = [
  ["Catalog", "Books, authors, categories, sections, topics and collections.", "/full-book"],
  ["Orders & customers", "Orders, payments, purchases, entitlements and download activity.", "/account"],
  ["Gifts & promotions", "Gift products, coupons, campaigns and bundles.", "/gifts"],
  ["Content studio", "Landing pages, blog, editorial content and media.", "/blog"],
  ["Translations", "Locale content, translation status and EN-US source content.", "/"],
  ["SEO & social", "Metadata, structured content, social drafts and publishing review.", "/"],
  ["Email & analytics", "Reader communications, campaigns and site performance.", "/"],
  ["Access & security", "Roles, permissions, audit log and security controls.", "/account"],
] as const;

export default function AdminPage() {
  return <main className="admin-shell"><Container>
    <header className="admin-header p-6 sm:p-9"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="store-kicker">Administration</p><h1 className="mt-2 text-4xl sm:text-5xl">Bookhaven control centre.</h1><p className="mt-4 text-base leading-7">One calm workspace for the catalogue, customers, commerce, content, translations, marketing, analytics and security.</p></div><nav className="flex flex-wrap gap-2" aria-label="Admin shortcuts"><Link href="/" className="secondary-action">View storefront</Link><Link href="/full-book" className="primary-action">Review catalogue</Link></nav></div></header>
    <section className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4" aria-label="Store overview">{[["06","Current books"],["04","Buyer categories"],["03","Book formats"],["EN-US","Canonical source"]].map(([value,label])=><div key={label} className="bg-[#fffaf0] px-4 py-5 text-center"><strong className="block font-serif text-2xl text-[var(--gold)] sm:text-3xl">{value}</strong><span className="mt-1 block text-xs text-[var(--ink-soft)] sm:text-sm">{label}</span></div>)}</section>
    <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Administration modules">{modules.map(([title,description,href],index)=><Link href={href} key={title} className="admin-module group p-5"><span className="text-xs font-bold tracking-[0.16em] text-[var(--gold)]">{String(index+1).padStart(2,"0")}</span><h2 className="mt-3 font-serif text-xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-6">{description}</p><span className="mt-4 inline-block text-xs font-bold text-[var(--gold)]">Open module →</span></Link>)}</section>
    <section className="mt-6 editorial-panel grid gap-5 p-5 sm:p-7 lg:grid-cols-[1.15fr_.85fr] lg:items-center"><div><p className="store-kicker">Editorial workflow</p><h2 className="font-serif text-2xl sm:text-3xl">Plan → Change → Test → Review → Commit → Deploy</h2></div><p className="text-sm leading-6">AI can prepare drafts, suggestions and analysis. Payment, refunds, entitlement, private asset access and role changes remain deterministic application operations protected by the appropriate staff permissions.</p></section>
  </Container></main>;
}
