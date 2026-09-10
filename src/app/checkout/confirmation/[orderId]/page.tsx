import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/data";
import { memoryOrders } from "@/lib/order-store";
import type { Order } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getOrder(id: string): Promise<Order | null> {
  if (supabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", id)
        .single();
      return (data as Order) ?? null;
    } catch {
      return null;
    }
  }
  return memoryOrders.get(id);
}

export default async function ConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await getOrder(params.orderId);

  if (!order) {
    return (
      <div className="container section text-center">
        <h1 className="text-3xl font-bold">Order received</h1>
        <p className="mt-3 text-muted">
          Thanks for your order. If you need details, contact our support team and
          quote your order reference.
        </p>
        <Link href="/shop" className={cn(buttonVariants(), "mt-6")}>
          Continue shopping
        </Link>
      </div>
    );
  }

  const addr = order.shipping_address;

  return (
    <div className="container section max-w-2xl">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
        <h1 className="mt-4 text-3xl font-bold">Thank you for your order!</h1>
        <p className="mt-2 text-muted">
          Order <strong className="text-ink">{order.order_number}</strong> has been
          reserved. A confirmation has been sent to {order.email}.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold">Payment status</h2>
          <Badge variant="soft">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted">
          Payment integration is coming soon. Our team will contact you with payment
          details (bank transfer or a secure card link). You haven&apos;t been charged.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-border p-6">
        <h2 className="font-display font-semibold">Order summary</h2>
        <ul className="mt-4 divide-y divide-border">
          {order.order_items?.map((i) => (
            <li key={i.id} className="flex justify-between py-3 text-sm">
              <span className="text-muted">
                {i.title} × {i.quantity}
              </span>
              <span>{formatPrice(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount</span>
              <span>−{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted">Shipping</span>
            <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {addr && (
        <div className="mt-6 rounded-2xl border border-border p-6">
          <h2 className="font-display font-semibold">Shipping address</h2>
          <p className="mt-2 text-sm text-muted">
            {addr.fullName}
            <br />
            {addr.line1}
            {addr.line2 ? <>, {addr.line2}</> : null}
            <br />
            {addr.city}, {addr.postcode}
            <br />
            {addr.country}
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/shop" className={buttonVariants()}>
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
