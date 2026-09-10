"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Minus, Plus, ShieldCheck, Lock, RotateCcw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { useCart } from "@/context/cart-context";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const images = product.product_images?.length
    ? product.product_images
    : [{ id: "x", url: "/placeholder.svg", alt: product.title, product_id: product.id, sort_order: 0 }];
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const variants = product.product_variants ?? [];
  const [variant, setVariant] = useState<string | undefined>(variants[0]?.value ?? undefined);

  const onSale = product.compare_at_price && product.compare_at_price > product.price;

  function buildItem() {
    return {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: images[0].url,
      stock: product.stock,
      variant,
    };
  }

  function add() {
    if (!product.in_stock) return;
    addItem(buildItem(), qty);
  }

  function buyNow() {
    if (!product.in_stock) return;
    addItem(buildItem(), qty);
    router.push("/checkout");
  }

  const specs = product.specifications ?? {};

  const accordionItems = [
    {
      title: "Description",
      content: <p className="leading-relaxed">{product.description}</p>,
    },
    {
      title: "Specifications",
      content: (
        <table className="w-full text-sm">
          <tbody>
            {Object.entries(specs).map(([k, v]) => (
              <tr key={k} className="border-b border-border last:border-0">
                <td className="py-2 pr-4 font-medium text-ink">{k}</td>
                <td className="py-2 text-muted">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      title: "What's in the box",
      content: (
        <ul className="list-inside list-disc space-y-1">
          <li>1 × {product.title}</li>
          <li>Quick-start guide</li>
          <li>ProHub 2-year warranty card</li>
        </ul>
      ),
    },
    {
      title: "Shipping & Returns",
      content: (
        <p>
          Free UK delivery on orders over £50. Standard dispatch within 1 working day.
          Easy 30-day returns — see our{" "}
          <a href="/policies/shipping" className="text-brand underline">
            shipping
          </a>{" "}
          and{" "}
          <a href="/policies/refund" className="text-brand underline">
            refund
          </a>{" "}
          policies.
        </p>
      ),
    },
    {
      title: "Warranty",
      content: <p>Backed by the ProHub 2-year limited warranty against manufacturing defects.</p>,
    },
  ];

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active].url}
              alt={images[active].alt ?? product.title}
              className="aspect-square w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-20 w-20 overflow-hidden rounded-lg border-2",
                    i === active ? "border-brand" : "border-transparent"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt ?? ""} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy box */}
        <div>
          <div className="flex items-center gap-2">
            {product.is_new && <Badge variant="new">New</Badge>}
            {onSale && <Badge variant="sale">Sale</Badge>}
          </div>
          <h1 className="mt-3 text-3xl font-bold">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn("h-4 w-4", i < Math.round(product.rating) ? "fill-brand" : "fill-none text-border")}
                />
              ))}
            </div>
            <span className="text-sm text-muted">
              {product.rating} ({product.review_count} reviews)
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="font-display text-2xl font-bold">{formatPrice(product.price)}</span>
            {onSale && (
              <span className="text-lg text-muted line-through">
                {formatPrice(product.compare_at_price!)}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted">Tax included. Shipping calculated at checkout.</p>

          <p className="mt-4 text-sm text-muted">{product.description}</p>

          <p className="mt-4 text-sm font-medium">
            {product.in_stock ? (
              <span className="text-success">● In stock</span>
            ) : (
              <span className="text-sale">● Sold out</span>
            )}
          </p>

          {variants.length > 0 && (
            <div className="mt-5">
              <span className="text-sm font-medium">{variants[0].name ?? "Option"}</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariant(v.value ?? undefined)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-sm",
                      variant === v.value ? "border-brand bg-brand-soft text-brand" : "border-border"
                    )}
                  >
                    {v.value}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + actions */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-border">
              <button aria-label="Decrease" className="px-3 py-2.5" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button aria-label="Increase" className="px-3 py-2.5" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button className="flex-1" disabled={!product.in_stock} onClick={add}>
              Add to cart
            </Button>
          </div>
          <Button
            variant="dark"
            className="mt-3 w-full"
            disabled={!product.in_stock}
            onClick={buyNow}
          >
            Buy now
          </Button>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6 text-center">
            {[
              { icon: Lock, label: "Secure checkout" },
              { icon: ShieldCheck, label: "2-year warranty" },
              { icon: RotateCcw, label: "30-day returns" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <Icon className="h-5 w-5 text-brand" />
                <span className="text-xs text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-3xl">
        <Accordion items={accordionItems} />
      </div>
    </>
  );
}
