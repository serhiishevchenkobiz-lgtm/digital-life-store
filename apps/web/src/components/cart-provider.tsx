"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Book } from "@/lib/catalog";

export interface CartItem {
  id: string;
  book: Book;
  format: "ebook" | "audio" | "bundle";
  priceCents: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotalCents: number;
  discountCents: number;
  totalCents: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "dlp-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try { setItems(JSON.parse(stored) as CartItem[]); } catch { window.localStorage.removeItem(storageKey); }
    }
  }, []);

  useEffect(() => { window.localStorage.setItem(storageKey, JSON.stringify(items)); }, [items]);

  const value = useMemo(() => {
    const subtotalCents = items.reduce((total, item) => total + item.priceCents, 0);
    const discountCents = items.length >= 3 ? Math.round(subtotalCents * 0.1) : 0;
    return {
      items,
      addItem: (item: CartItem) => setItems((current) => current.some((entry) => entry.id === item.id) ? current : [...current, item]),
      removeItem: (id: string) => setItems((current) => current.filter((item) => item.id !== id)),
      clearCart: () => setItems([]),
      subtotalCents,
      discountCents,
      totalCents: subtotalCents - discountCents,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
