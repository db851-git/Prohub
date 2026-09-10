"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, totals, clear } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    line1: "",
    line2: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          shipping_address: {
            fullName: form.fullName,
            line1: form.line1,
            line2: form.line2,
            city: form.city,
            postcode: form.postcode,
            country: form.country,
          },
          items: items.map((i) => ({
            productId: i.productId,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      clear();
      router.push(`/checkout/confirmation/${data.orderId}`);
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container section text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Link href="/shop" className={cn(buttonVariants(), "mt-6")}>
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">Checkout</h1>
      <form onSubmit={placeOrder} className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 font-display text-lg font-semibold">Contact</h2>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
          </section>

          <section>
            <h2 className="mb-4 font-display text-lg font-semibold">Shipping address</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="line1">Address line 1</Label>
                <Input id="line1" required value={form.line1} onChange={(e) => update("line1", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="line2">Address line 2 (optional)</Label>
                <Input id="line2" value={form.line2} onChange={(e) => update("line2", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required value={form.city} onChange={(e) => update("city", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" required value={form.postcode} onChange={(e) => update("postcode", e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={form.country} onChange={(e) => update("country", e.target.value)} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-lg font-semibold">Delivery method</h2>
            <div className="rounded-xl border border-border p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {totals.shipping === 0 ? "Free next-day delivery" : "Standard delivery"}
                </span>
                <span>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</span>
              </div>
            </div>
          </section>

          {/* Payment — pending */}
          <section>
            <h2 className="mb-4 font-display text-lg font-semibold">Payment</h2>
            {/* TODO: integrate payment provider (Stripe/PayPal) — see lib/payments.ts */}
            <div className="rounded-xl border border-brand/30 bg-brand-soft p-4 text-sm text-ink">
              <p className="font-medium">Payment integration is coming soon.</p>
              <p className="mt-1 text-muted">
                Your order will be reserved — our team will contact you with payment
                details (bank transfer / secure card link). You won&apos;t be charged now.
              </p>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-semibold">Review</h2>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={`${i.productId}-${i.variant ?? ""}`} className="flex justify-between text-sm">
                <span className="pr-2 text-muted">
                  {i.title} × {i.quantity}
                </span>
                <span>{formatPrice(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>−{formatPrice(totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(totals.total)}</span>
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-sale">{error}</p>}

          <Button type="submit" className="mt-5 w-full" disabled={submitting}>
            <Lock className="h-4 w-4" />
            {submitting ? "Placing order…" : "Place order"}
          </Button>
          <p className="mt-2 text-center text-xs text-muted">
            By placing your order you agree to our{" "}
            <Link href="/policies/terms" className="underline">
              terms
            </Link>
            .
          </p>
        </aside>
      </form>
    </div>
  );
}
