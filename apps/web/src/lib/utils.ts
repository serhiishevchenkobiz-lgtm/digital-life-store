import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(cents: number, currency: string = "USD", locale: string = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function readingTimeMinutes(words: number, wpm: number = 230): number {
  return Math.max(1, Math.round(words / wpm));
}