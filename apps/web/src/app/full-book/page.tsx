import Link from "next/link";
import type { Metadata } from "next";
import { BookCard } from "@/components/book-card";
import { Container } from "@/components/container";
import { getFullBookTaxonomy } from "@/lib/catalog-taxonomy";

export const metadata: Metadata = {
  title: "Full Book Catalogue",
  description: "Browse the complete catalogue by category, section, topic and alphabetical shelf.",
};

export default function FullBookPage() {
  const categories = getFullBookTaxonomy();

  return (
    <main className="full-book-page">
      <Container>
        <header className="full-book-intro">
          <p className="store-kicker">Full Book</p>
          <h1>The complete bookshelf, carefully arranged.</h1>
          <p>
            Start with a category, open a section, choose a topic, then browse the shelf in alphabetical order.
            Editorial selections can appear elsewhere in the shop, but every title has a clear canonical home here.
          </p>
        </header>

        <nav className="full-book-index" aria-label="Catalogue categories">
          {categories.map((category) => (
            <a key={category.slug} href={`#${category.slug}`} className="full-book-index-link">{category.name}</a>
          ))}
        </nav>

        <div className="full-book-tree">
          {categories.map((category) => (
            <section key={category.slug} id={category.slug} className="taxonomy-category" aria-labelledby={`${category.slug}-title`}>
              <div className="taxonomy-category-heading">
                <div>
                  <p className="taxonomy-level">Category</p>
                  <h2 id={`${category.slug}-title`}>{category.name}</h2>
                </div>
                <span>{category.sections.length} sections</span>
              </div>

              {category.sections.map((section) => (
                <div key={section.slug} className="taxonomy-section">
                  <div className="taxonomy-section-heading">
                    <div>
                      <p className="taxonomy-level">Section</p>
                      <h3>{section.name}</h3>
                    </div>
                    <span>{section.topics.length} topics</span>
                  </div>

                  {section.topics.map((topic) => (
                    <div key={topic.slug} className="taxonomy-topic">
                      <div className="taxonomy-topic-heading">
                        <div>
                          <p className="taxonomy-level">Topic</p>
                          <h4>{topic.name}</h4>
                        </div>
                        <span>{topic.books.length} {topic.books.length === 1 ? "book" : "books"}</span>
                      </div>
                      <div className="shelf-grid compact-shelf">
                        {topic.books.map((book) => <BookCard key={book.slug} book={book} />)}
                      </div>
                      <Link href={`/books?q=${encodeURIComponent(topic.name)}`} className="taxonomy-more">See this topic shelf →</Link>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
