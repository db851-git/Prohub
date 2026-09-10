"use client";

import { CartProvider } from "@/context/cart-context";
import { PromoBar } from "./promo-bar";
import { Header } from "./header";
import { Footer } from "./footer";
import { CartDrawer } from "./cart-drawer";
import type { Product } from "@/lib/types";

export function SiteChrome({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <PromoBar />
      <Header products={products} />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
