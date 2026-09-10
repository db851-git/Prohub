import { ProductCard } from "./product-card";
import type { Product } from "@/lib/types";

export function ProductRow({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
      {products.map((p) => (
        <div key={p.id} className="w-[70%] shrink-0 md:w-auto">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
