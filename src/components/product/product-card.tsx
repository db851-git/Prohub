"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const image = product.product_images?.[0]?.url ?? "/placeholder.svg";
  const onSale = product.compare_at_price && product.compare_at_price > product.price;

  function add(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.in_stock) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image,
      stock: product.stock,
    });
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={product.product_images?.[0]?.alt ?? product.title}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
          }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {product.is_new && <Badge variant="new">New</Badge>}
          {onSale && <Badge variant="sale">Sale</Badge>}
        </div>
        {!product.in_stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
              Sold out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-medium text-ink line-clamp-2">{product.title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-display font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          {onSale && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.compare_at_price!)}
            </span>
          )}
        </div>
        <button
          onClick={add}
          disabled={!product.in_stock}
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-surface py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingBag className="h-4 w-4" />
          {product.in_stock ? "Add to cart" : "Sold out"}
        </button>
      </div>
    </Link>
  );
}
