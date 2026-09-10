import type { Order } from "./types";

export type PaymentResult = {
  status: "pending" | "paid" | "failed";
  reference?: string;
  message?: string;
};

/**
 * Payment module stub.
 *
 * The store currently reserves orders without taking payment. This function
 * is the single integration boundary — swap the body for Stripe / PayPal /
 * a bank-transfer link generator and the rest of the app will not need to
 * change.
 *
 * // TODO: integrate Stripe/PayPal here
 * Example (Stripe):
 *   const session = await stripe.checkout.sessions.create({ ... });
 *   return { status: "pending", reference: session.id };
 */
export async function createPayment(order: Order): Promise<PaymentResult> {
  return {
    status: "pending",
    message:
      "Payment integration is coming soon. Your order has been reserved — our team will contact you with payment details.",
    reference: order.order_number,
  };
}
