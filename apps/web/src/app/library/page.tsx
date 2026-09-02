import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { BookCover } from "@/components/book-cover";
import {
  getSupabaseRouteHandler,
  isSupabaseConfigured,
} from "@/lib/supabase";
import { signOut } from "@/app/account/actions";
import { getSignedDownloadUrl } from "@/app/library/actions";

export const metadata: Metadata = {
  title: "My Library",
  description:
    "Your purchased books, audio editions and reading progress. Sign in to access your library.",
};

interface LibraryItem {
  product_id: string;
  format: "ebook" | "audio" | "bundle" | "worksheet";
  granted_at: string;
  book: {
    slug: string;
    title: string;
    cover: { palette: string; spineLabel: string; motif: string };
  } | null;
}

export default async function LibraryPage() {
  if (!isSupabaseConfigured()) {
    return <NotConfigured />;
  }

  const supabase = await getSupabaseRouteHandler();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account/sign-in?next=/library");

  const { data, error } = await supabase
    .from("purchases")
    .select(
      "product_id, granted_at, products:products ( format, books:books ( slug, title, cover ) )",
    )
    .eq("user_id", user.id)
    .order("granted_at", { ascending: false });

  const items = ((data ?? []) as unknown) as Array<{
    product_id: string;
    granted_at: string;
    products: {
      format: LibraryItem["format"];
      books: {
        slug: string;
        title: string;
        cover: { palette: string; spineLabel: string; motif: string };
      } | null;
    } | null;
  }>;

  return (
    <Container className="py-14 md:py-24">
      <header className="flex flex-wrap items-end justify-between gap-4 max-w-3xl">
        <div>
          <p className="eyebrow">My Library</p>
          <h1 className="mt-4 font-display text-display-xl text-balance">
            Welcome back.
          </h1>
          <p className="mt-3 text-ink-soft">
            Signed in as <span className="text-ink">{user.email}</span>.
          </p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="ghost">
            Sign out
          </Button>
        </form>
      </header>

      {error && (
        <p role="alert" className="mt-8 text-sm text-accent">
          Could not load your library: {error.message}
        </p>
      )}

      {!error && items.length === 0 && <EmptyState />}

      {items.length > 0 && (
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((item) => {
            const book = item.products?.books ?? null;
            const format = item.products?.format ?? "ebook";
            return (
              <li key={item.product_id} className="flex flex-col gap-4">
                {book ? (
                  <>
                    <div className="w-40">
                      <BookCover
                        palette={book.cover.palette as never}
                        motif={book.cover.motif as never}
                        spineLabel={book.cover.spineLabel}
                        title={book.title}
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                        {format}
                      </p>
                      <p className="mt-1 font-display text-2xl leading-tight">
                        {book.title}
                      </p>
                      <p className="mt-1 text-sm text-ink-muted tabular">
                        Acquired {new Date(item.granted_at).toLocaleDateString()}
                      </p>
                    </div>
                    <DownloadButton productId={item.product_id} />
                  </>
                ) : (
                  <p className="text-sm text-ink-muted">
                    Product {item.product_id} (no linked book record).
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}

function NotConfigured() {
  return (
    <Container className="py-14 md:py-24 max-w-3xl">
      <p className="eyebrow">My Library</p>
      <h1 className="mt-4 font-display text-display-xl text-balance">
        Sign in to see your books.
      </h1>
      <p className="mt-4 text-lg text-ink-soft leading-relaxed">
        Your library is where every Digital Life Press purchase lives — the
        eBook, the audio, the worksheets. Sign in with the email you used at
        checkout and we&apos;ll send you a one-tap magic link.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/account/sign-in">Sign in</Button>
        <Button href="/books" variant="outline">
          Browse the catalogue
        </Button>
      </div>

      <div className="rule mt-16" />

      <section className="mt-10">
        <p className="eyebrow">What you&apos;ll find here</p>
        <ul className="mt-6 space-y-3 text-ink-soft">
          {[
            "Download EPUB, PDF, MP3 and M4B — regenerable at any time.",
            "Reading progress and bookmark sync across devices.",
            "Companion worksheets for every title you own.",
          ].map((line) => (
            <li key={line} className="flex gap-3">
              <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-ink-muted">
          Don&apos;t have an account yet?{" "}
          <Link href="/books" className="underline underline-offset-4">
            Pick something from the catalogue
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 rounded-xl border border-muted-line bg-paper-bright p-8 md:p-10 max-w-2xl">
      <p className="eyebrow">Nothing here yet</p>
      <h2 className="mt-3 font-display text-2xl text-balance">
        Your library will fill up here after your first purchase.
      </h2>
      <p className="mt-3 text-ink-soft leading-relaxed">
        Browse the catalogue to find something to read, or open the Free
        Library for a few opening chapters.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/books">Browse books</Button>
        <Button href="/free-library" variant="outline">
          Free Library
        </Button>
      </div>
    </div>
  );
}

function DownloadButton({ productId }: { productId: string }) {
  async function download() {
    "use server";
    const result = await getSignedDownloadUrl(productId);
    if (!result.ok) {
      // Surface the error in the URL so the page can render it on next load.
      redirect(`/library?error=${encodeURIComponent(result.error)}`);
    }
    // Redirect to the short-lived signed URL — the browser will follow it
    // and the storage service will stream the file with the correct
    // Content-Disposition header.
    redirect(result.url);
  }
  return (
    <form action={download}>
      <Button type="submit" variant="outline" className="px-4 py-2">
        Download
      </Button>
    </form>
  );
}