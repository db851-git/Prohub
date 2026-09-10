"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "bestselling", label: "Best selling" },
  { value: "price-asc", label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
  { value: "newest", label: "Newest" },
  { value: "az", label: "A–Z" },
];

export function ShopToolbar({
  count,
  categories,
}: {
  count: number;
  categories: { name: string; slug: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
      next.delete("page");
      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router]
  );

  const activeFilters: { key: string; label: string }[] = [];
  if (params.get("availability")) activeFilters.push({ key: "availability", label: params.get("availability") === "in" ? "In stock" : "Out of stock" });
  if (params.get("min")) activeFilters.push({ key: "min", label: `Min £${params.get("min")}` });
  if (params.get("max")) activeFilters.push({ key: "max", label: `Max £${params.get("max")}` });

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">{count} products</p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-muted">
            Sort by
          </label>
          <select
            id="sort"
            value={params.get("sort") ?? "featured"}
            onChange={(e) => setParam("sort", e.target.value)}
            className="h-10 rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={params.get("availability") ?? ""}
          onChange={(e) => setParam("availability", e.target.value || null)}
          className="h-10 rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <option value="">All availability</option>
          <option value="in">In stock</option>
          <option value="out">Out of stock</option>
        </select>

        <input
          type="number"
          placeholder="Min £"
          defaultValue={params.get("min") ?? ""}
          onBlur={(e) => setParam("min", e.target.value || null)}
          className="h-10 w-24 rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <input
          type="number"
          placeholder="Max £"
          defaultValue={params.get("max") ?? ""}
          onBlur={(e) => setParam("max", e.target.value || null)}
          className="h-10 w-24 rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />

        {activeFilters.length > 0 && (
          <>
            {activeFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setParam(f.key, null)}
                className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand"
              >
                {f.label}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              onClick={() => router.push(pathname)}
              className="text-xs font-medium text-muted underline"
            >
              Clear all
            </button>
          </>
        )}
      </div>
    </div>
  );
}
