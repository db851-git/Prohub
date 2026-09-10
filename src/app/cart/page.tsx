"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQty, removeItem, totals } = useCart();
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");

  if (items.length === 0) {
    return (
      <div className="container section text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-muted">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" className={cn(buttonVariants(), "mt-6")}>
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Your cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-border border-t border-b border-border">
          {items.map((item) => (
            <div key={`${item.productId}-${item.variant ?? ""}`} className="flex gap-4 py-5">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <Link href={`/product/${item.slug}`} className="font-medium hover:text-brand">
                  {item.title}
                </Link>
                {item.variant && <span className="text-sm text-muted">{item.variant}</span>}
                <span className="text-sm text-muted">{formatPrice(item.price)}</span>
                <div className="mt-auto flex items-center gap-4">
                  <div className="flex items-center rounded-lg border border-border">
                    <button aria-label="Decrease" className="px-2.5 py-1.5" onClick={() => updateQty(item.productId, item.quantity - 1, item.variant)}>
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button aria-label="Increase" className="px-2.5 py-1.5" onClick={() => updateQty(item.productId, item.quantity + 1, item.variant)}>
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.productId, item.variant)} className="text-muted hover:text-sale" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount (20% over £50)</span>
                <span>−{formatPrice(totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="Promo code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="bg-white"
              />
              <Button
                variant="outline"
                onClick={() =>
                  setPromoMsg(promo ? "Promo codes aren't active yet — discounts apply automatically." : "")
                }
              >
                Apply
              </Button>
            </div>
            {promoMsg && <p className="mt-2 text-xs text-muted">{promoMsg}</p>}
          </div>

          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(totals.total)}</span>
          </div>
          <p className="mt-1 text-xs text-muted">Tax included.</p>

          <Link href="/checkout" className={cn(buttonVariants(), "mt-5 w-full")}>
            Proceed to checkout
          </Link>
          <Link href="/shop" className={cn(buttonVariants({ variant: "ghost" }), "mt-2 w-full")}>
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
