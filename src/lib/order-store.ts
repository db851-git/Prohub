import type { Order } from "./types";

/**
 * Best-effort in-memory order store used ONLY when Supabase is not configured,
 * so the checkout → confirmation flow works in the demo. Not durable across
 * server restarts or multiple instances — real persistence is Supabase.
 */
const store = new Map<string, Order>();

export const memoryOrders = {
  set(order: Order) {
    store.set(order.id, order);
  },
  get(id: string) {
    return store.get(id) ?? null;
  },
};
