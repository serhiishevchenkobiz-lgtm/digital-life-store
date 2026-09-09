import Link from "next/link";
import { getCategories } from "@/lib/catalog";

const groups = [
  { title: "Popular Categories", items: ["Mind", "Lifestyle", "Productivity", "Home"] },
  { title: "Formats", items: ["eBooks", "Audiobooks", "Bundles", "Free Reads"] },
];

export function StoreSidebar() {
  const categories = getCategories();

  return (
    <aside className="store-sidebar" aria-label="Shop categories">
      <section className="sidebar-panel sidebar-newsletter">
        <div className="sidebar-icon" aria-hidden>✉</div>
        <h2>Sign up for our newsletter</h2>
        <p>New titles, free reads and occasional offers.</p>
        <Link href="/free-library" className="sidebar-button">Get a free read</Link>
      </section>

      {groups.map((group) => (
        <section key={group.title} className="sidebar-panel">
          <h2 className="sidebar-heading">{group.title}</h2>
          <nav aria-label={group.title}>
            {group.items.map((item) => {
              const category = categories.find((entry) => entry.name === item);
              const href = category ? `/categories/${category.slug}` : item === "Audiobooks" ? "/audio" : item === "Free Reads" ? "/free-library" : "/books";
              return <Link key={item} href={href} className="sidebar-link">{item}</Link>;
            })}
          </nav>
        </section>
      ))}

      <section className="sidebar-panel">
        <h2 className="sidebar-heading">All Categories</h2>
        <nav aria-label="All categories">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="sidebar-link">
              {category.name}
            </Link>
          ))}
        </nav>
      </section>
    </aside>
  );
}
