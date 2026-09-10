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
    <main className="admin-page">
      <Container>
        <header className="admin-hero">
          <div>
            <p className="store-kicker">Administration</p>
            <h1>Bookhaven control centre.</h1>
            <p>One calm workspace for the catalogue, customers, commerce, content, translations, marketing, analytics and security.</p>
          </div>
          <nav className="admin-hero-actions" aria-label="Admin shortcuts">
            <Link href="/" className="secondary-action">View storefront</Link>
            <Link href="/full-book" className="primary-action">Review catalogue</Link>
          </nav>
        </header>

        <section className="admin-summary-grid" aria-label="Store overview">
          <div><strong>{"06"}</strong><span>Current books</span></div>
          <div><strong>04</strong><span>Buyer categories</span></div>
          <div><strong>03</strong><span>Book formats</span></div>
          <div><strong>EN-US</strong><span>Canonical source</span></div>
        </section>

        <section className="admin-module-grid" aria-label="Administration modules">
          {modules.map(([title, description, href], index) => (
            <Link href={href} key={title} className="admin-module-card">
              <span className="admin-module-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{description}</p>
              <span className="admin-open">Open module →</span>
            </Link>
          ))}
        </section>

        <section className="admin-workflow">
          <div>
            <p className="store-kicker">Editorial workflow</p>
            <h2>Plan → Change → Test → Review → Commit → Deploy</h2>
          </div>
          <p>AI can prepare drafts, suggestions and analysis. Payment, refunds, entitlement, private asset access and role changes remain deterministic application operations protected by the appropriate staff permissions.</p>
        </section>
      </Container>
    </main>
  );
}
