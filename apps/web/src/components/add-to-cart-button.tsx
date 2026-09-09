"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@/lib/catalog";
import { useCart } from "@/components/cart-provider";

export function AddToCartButton({ book, format, priceCents }: { book: Book; format: "ebook" | "audio" | "bundle"; priceCents: number }) {
  const { addItem, items } = useCart();
  const router = useRouter();
  const id = `${book.slug}:${format}`;
  const isAdded = items.some((item) => item.id === id);
  const [message, setMessage] = useState("");

  function addToCart() {
    addItem({ id, book, format, priceCents });
    setMessage("Added to your basket.");
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={addToCart} className="inline-flex items-center justify-center bg-accent px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2">
        {isAdded ? "Added to basket" : "Add to basket"}
      </button>
      {isAdded && <button type="button" onClick={() => router.push("/checkout")} className="inline-flex items-center justify-center border border-ink px-5 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper">View basket</button>}
      <p role="status" className="text-sm text-ink-muted">{message}</p>
    </div>
  );
}
