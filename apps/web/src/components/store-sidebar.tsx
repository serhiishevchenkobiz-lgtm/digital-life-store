import Link from "next/link";
import { getCategories } from "@/lib/catalog";

const groups = [
  { title: "Shop", items: ["Home", "All Books", "Categories", "Full Book", "Bestsellers", "New Titles", "Free Library", "My Library", "Wishlist"] },
  { title: "Formats", items: ["eBooks", "Audiobooks", "Bundles"] },
];

export function StoreSidebar() {
  const categories = getCategories();

  return (
    <aside className="store-sidebar" aria-label="Shop navigation">
      {groups.map((group) => (
        <section key={group.title} className="sidebar-panel">
          <h2 className="sidebar-heading">{group.title}</h2>
          <nav aria-label={group.title}>
            {group.items.map((item) => {
              const category = categories.find((entry) => entry.name === item);
              const href =
                item === "Home" ? "/" :
                item === "All Books" ? "/books" :
                item === "Categories" ? "/categories" :
                item === "Full Book" ? "/full-book" :
                item === "Bestsellers" ? "/books?q=bestseller" :
                item === "New Titles" ? "/books?q=new" :
                item === "Free Library" ? "/free-library" :
                item === "My Library" ? "/library" :
                item === "Wishlist" ? "/wishlist" :
                category ? `/categories/${category.slug}` :
                item === "Audiobooks" ? "/audio" :
                "/books";

              return <Link key={item} href={href} className="sidebar-link">{item}</Link>;
            })}
          </nav>
        </section>
      ))}

      <section className="sidebar-panel">
        <h2 className="sidebar-heading">Categories</h2>
        <nav aria-label="Book categories">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="sidebar-link sidebar-category-link">
              <span>{category.name}</span><small>{category.books.length}</small>
            </Link>
          ))}
        </nav>
      </section>

      <section className="sidebar-panel sidebar-help-panel">
        <h2 className="sidebar-heading">Information</h2>
        <Link className="sidebar-link" href="/gifts">Gift Certificates</Link>
        <Link className="sidebar-link" href="/blog">Blog</Link>
        <Link className="sidebar-link" href="/contact">Contact</Link>
        <Link className="sidebar-link" href="/help">Help & Support</Link>
      </section>
    </aside>
  );
}
