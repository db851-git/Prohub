"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function SearchOverlay({
  open,
  onClose,
  products,
}: {
  open: boolean;
  onClose: () => void;
  products: Product[];
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category?.name.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, products]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative mx-auto mt-20 w-[92%] max-w-2xl rounded-2xl bg-white p-5 shadow-soft animate-fade-up">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-muted" />
          <Input
            autoFocus
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-base"
          />
          <button aria-label="Close search" onClick={onClose}>
            <X className="h-5 w-5 text-muted" />
          </button>
        </div>

        {query && (
          <div className="mt-4 border-t border-border pt-3">
            {results.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">
                No products match “{query}”.
              </p>
            ) : (
              <ul className="space-y-1">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-surface"
                    >
                      <span className="text-sm font-medium text-ink">{p.title}</span>
                      <span className="text-sm text-muted">{formatPrice(p.price)}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="block px-3 py-2 text-sm font-medium text-brand hover:underline"
                  >
                    See all results for “{query}” →
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
