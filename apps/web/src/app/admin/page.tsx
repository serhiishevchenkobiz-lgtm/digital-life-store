import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Central management area for the digital bookstore.",
};

const modules = [
  ["Catalog", "Books, authors, categories, sections, topics and collections."],
  ["Orders & customers", "Orders, payments, purchases, entitlements and download activity."],
  ["Gifts & promotions", "Gift products, coupons, campaigns and bundles."],
  ["Content studio", "Landing pages, blog, editorial content and media."],
  ["Translations", "Locale content, translation status and EN-US source content."],
  ["SEO & social", "Metadata, structured content, social drafts and publishing review."],
  ["Email & analytics", "Reader communications, campaigns and site performance."],
  ["Access & security", "Roles, permissions, audit log and security controls."],
] as const;

export default function AdminPage() {
  return (
    <main className="min-h-[70vh] bg-slate-50 py-8 text-blue-deep">
      <Container>
        <header className="rounded-2xl border border-sky-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Administration</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Store control centre</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate">One place to manage the catalogue, customers, commerce, content, translations, marketing, analytics and security. This first screen is the navigation foundation; production access will be protected by staff roles before deployment.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/books" className="rounded-lg border border-sky-200 px-3 py-2 text-sm font-semibold hover:bg-sky-50">View storefront</Link>
            <Link href="/full-book" className="rounded-lg border border-sky-200 px-3 py-2 text-sm font-semibold hover:bg-sky-50">Review catalogue structure</Link>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Administration modules">
          {modules.map(([title, description]) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-5 text-slate">{description}</p>
              <button type="button" className="mt-4 text-xs font-bold text-sky-700">Open module →</button>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold">Security boundary</h2>
          <p className="mt-1 text-sm leading-5 text-slate">AI may prepare drafts, recommendations and analysis. Payment, refunds, entitlement, private asset access and role changes remain deterministic application operations and require the appropriate staff permissions.</p>
        </section>
      </Container>
    </main>
  );
}
