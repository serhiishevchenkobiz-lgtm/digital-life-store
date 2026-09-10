import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Admin Dashboard | Bookhaven",
  description: "Central management area for the digital bookstore catalogue, commerce, content, translations, marketing and security.",
};

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
  return (
    <main className="min-h-[80vh] bg-[#fffdf7] py-8 text-[#17354a] sm:py-12">
      <Container>
        <header className="overflow-hidden rounded-2xl border border-[#dccfae] bg-gradient-to-br from-[#eef2e8] via-[#fffaf0] to-[#f7edd7] p-6 shadow-sm sm:p-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a97820]">Administration</p>
              <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#17354a] sm:text-5xl">Bookhaven control centre.</h1>
              <p className="mt-4 text-base leading-7 text-[#5d6f78]">One calm workspace for the catalogue, customers, commerce, content, translations, marketing, analytics and security.</p>
            </div>
            <nav className="flex flex-wrap gap-2" aria-label="Admin shortcuts">
              <Link href="/" className="inline-flex min-h-10 items-center rounded-full border border-[#c8b57f] bg-[#fffaf0] px-4 text-sm font-bold text-[#17354a] hover:border-[#b8862f]">View storefront</Link>
              <Link href="/full-book" className="inline-flex min-h-10 items-center rounded-full bg-[#b8862f] px-4 text-sm font-bold text-white shadow-sm hover:brightness-105">Review catalogue</Link>
            </nav>
          </div>
        </header>

        <section className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#dccfae] bg-[#dccfae] sm:grid-cols-4" aria-label="Store overview">
          {[["06", "Current books"], ["04", "Buyer categories"], ["03", "Book formats"], ["EN-US", "Canonical source"]].map(([value, label]) => (
            <div key={label} className="bg-[#fffaf0] px-4 py-5 text-center">
              <strong className="block font-serif text-2xl text-[#9b6e19] sm:text-3xl">{value}</strong>
              <span className="mt-1 block text-xs text-[#6d7c82] sm:text-sm">{label}</span>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Administration modules">
          {modules.map(([title, description, href], index) => (
            <Link href={href} key={title} className="group rounded-xl border border-[#dccfae] bg-[#fffaf0] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b8862f] hover:shadow-md">
              <span className="text-xs font-bold tracking-[0.16em] text-[#b8862f]">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 font-serif text-xl font-semibold text-[#17354a]">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#5d6f78]">{description}</p>
              <span className="mt-4 inline-block text-xs font-bold text-[#8a671f] group-hover:underline">Open module →</span>
            </Link>
          ))}
        </section>

        <section className="mt-6 grid gap-5 rounded-2xl border border-[#dccfae] bg-[#f6efdf] p-5 sm:p-7 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#a97820]">Editorial workflow</p>
            <h2 className="font-serif text-2xl font-semibold text-[#17354a] sm:text-3xl">Plan → Change → Test → Review → Commit → Deploy</h2>
          </div>
          <p className="text-sm leading-6 text-[#5d6f78]">AI can prepare drafts, suggestions and analysis. Payment, refunds, entitlement, private asset access and role changes remain deterministic application operations protected by the appropriate staff permissions.</p>
        </section>
      </Container>
    </main>
  );
}
