import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BULK_DISCOUNT_RATE,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_SHIPPING,
} from "./constants";
import type { CartItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
  }).format(amount);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

/**
 * Promo logic: orders over the free-delivery threshold get free shipping
 * AND a 20% discount, applied automatically.
 */
export function computeTotals(items: CartItem[]) {
  const subtotal = cartSubtotal(items);
  const qualifies = subtotal >= FREE_DELIVERY_THRESHOLD;
  const discount = qualifies ? +(subtotal * BULK_DISCOUNT_RATE).toFixed(2) : 0;
  const shipping = qualifies || subtotal === 0 ? 0 : STANDARD_SHIPPING;
  const total = +(subtotal - discount + shipping).toFixed(2);
  return { subtotal, discount, shipping, total, qualifies };
}

export function generateOrderNumber() {
  const year = new Date().getFullYear();
  const n = Math.floor(100000 + Math.random() * 900000);
  return `PH-${year}-${String(n).padStart(6, "0")}`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
