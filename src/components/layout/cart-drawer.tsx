"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/constants";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, totals } = useCart();

  const progress = Math.min(100, (totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - totals.subtotal);

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-ink/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-white shadow-soft transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">
            Your cart ({items.reduce((n, i) => n + i.quantity, 0)})
          </h2>
          <button aria-label="Close cart" onClick={closeCart}>
            <X className="h-5 w-5 text-muted" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-muted/50" />
            <p className="text-muted">Your cart is empty.</p>
            <Link href="/shop" onClick={closeCart} className={buttonVariants()}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-5 py-3">
              {remaining > 0 ? (
                <p className="text-sm text-muted">
                  You&apos;re <strong className="text-ink">{formatPrice(remaining)}</strong>{" "}
                  away from free delivery + 20% off.
                </p>
              ) : (
                <p className="text-sm font-medium text-success">
                  🎉 Free delivery + 20% off unlocked!
                </p>
              )}
              <div className="mt-2 h-1.5 w-full rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={`${item.productId}-${item.variant ?? ""}`} className="flex gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="text-sm font-medium text-ink hover:text-brand"
                      >
                        {item.title}
                      </Link>
                      {item.variant && (
                        <span className="text-xs text-muted">{item.variant}</span>
                      )}
                      <span className="mt-0.5 text-sm text-muted">
                        {formatPrice(item.price)}
                      </span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            aria-label="Decrease quantity"
                            className="px-2 py-1"
                            onClick={() =>
                              updateQty(item.productId, item.quantity - 1, item.variant)
                            }
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm">{item.quantity}</span>
                          <button
                            aria-label="Increase quantity"
                            className="px-2 py-1"
                            onClick={() =>
                              updateQty(item.productId, item.quantity + 1, item.variant)
                            }
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          aria-label="Remove item"
                          onClick={() => removeItem(item.productId, item.variant)}
                          className="text-muted hover:text-sale"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-5 py-4">
              {totals.discount > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>Discount (20%)</span>
                  <span>−{formatPrice(totals.discount)}</span>
                </div>
              )}
              <div className="mt-1 flex justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(totals.subtotal - totals.discount)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Tax included. Shipping calculated at checkout.
              </p>
              <div className="mt-4 space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className={cn(buttonVariants(), "w-full")}
                >
                  Checkout
                </Link>
                <Button variant="ghost" className="w-full" onClick={closeCart}>
                  Continue shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
