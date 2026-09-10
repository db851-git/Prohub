"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/lib/types";
import { computeTotals } from "@/lib/utils";

const STORAGE_KEY = "prohub-cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQty: (productId: string, qty: number, variant?: string) => void;
  clear: () => void;
  totals: ReturnType<typeof computeTotals>;
};

const CartContext = createContext<CartContextValue | null>(null);

function keyFor(productId: string, variant?: string) {
  return `${productId}::${variant ?? ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, qty = 1) => {
      setItems((prev) => {
        const k = keyFor(item.productId, item.variant);
        const existing = prev.find((i) => keyFor(i.productId, i.variant) === k);
        if (existing) {
          return prev.map((i) =>
            keyFor(i.productId, i.variant) === k
              ? { ...i, quantity: Math.min(i.quantity + qty, i.stock || 99) }
              : i
          );
        }
        return [...prev, { ...item, quantity: qty }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, variant?: string) => {
    const k = keyFor(productId, variant);
    setItems((prev) => prev.filter((i) => keyFor(i.productId, i.variant) !== k));
  }, []);

  const updateQty = useCallback(
    (productId: string, qty: number, variant?: string) => {
      const k = keyFor(productId, variant);
      setItems((prev) =>
        prev
          .map((i) =>
            keyFor(i.productId, i.variant) === k
              ? { ...i, quantity: Math.max(0, qty) }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    []
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      updateQty,
      clear,
      totals: computeTotals(items),
    }),
    [items, isOpen, addItem, removeItem, updateQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
