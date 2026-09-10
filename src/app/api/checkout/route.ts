import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createServiceClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/data";
import { computeTotals, generateOrderNumber } from "@/lib/utils";
import { createPayment } from "@/lib/payments";
import { memoryOrders } from "@/lib/order-store";
import type { CartItem, Order } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, shipping_address, items } = body as {
      email: string;
      shipping_address: Order["shipping_address"];
      items: (Pick<CartItem, "productId" | "title" | "price" | "quantity"> & {
        image?: string;
      })[];
    };

    if (!email || !items?.length) {
      return NextResponse.json({ error: "Missing email or items." }, { status: 400 });
    }

    // Recompute totals server-side (never trust the client).
    const totals = computeTotals(
      items.map((i) => ({
        ...i,
        slug: "",
        image: i.image ?? "",
        stock: 99,
      })) as CartItem[]
    );

    const orderNumber = generateOrderNumber();

    if (supabaseConfigured()) {
      const supabase = createServiceClient();
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          email,
          status: "pending_payment",
          payment_method: "pending",
          subtotal: totals.subtotal,
          shipping: totals.shipping,
          discount: totals.discount,
          total: totals.total,
          shipping_address,
        })
        .select()
        .single();

      if (error || !order) {
        return NextResponse.json(
          { error: error?.message || "Failed to create order." },
          { status: 500 }
        );
      }

      const orderItems = items.map((i) => ({
        order_id: order.id,
        product_id: i.productId,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        image_url: i.image ?? null,
      }));
      await supabase.from("order_items").insert(orderItems);

      await createPayment(order as Order);

      return NextResponse.json({ orderId: order.id, orderNumber });
    }

    // Fallback: in-memory (demo without Supabase)
    const id = randomUUID();
    const order: Order = {
      id,
      order_number: orderNumber,
      email,
      status: "pending_payment",
      payment_method: "pending",
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      total: totals.total,
      shipping_address,
      created_at: new Date().toISOString(),
      order_items: items.map((i, idx) => ({
        id: `${id}-${idx}`,
        order_id: id,
        product_id: i.productId,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        image_url: i.image ?? null,
      })),
    };
    await createPayment(order);
    memoryOrders.set(order);
    return NextResponse.json({ orderId: id, orderNumber });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
