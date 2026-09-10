export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  name: string | null;
  value: string | null;
  price_delta: number;
  stock: number;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  specifications: Record<string, string> | null;
  category_id: string | null;
  brand: string;
  price: number;
  compare_at_price: number | null;
  currency: string;
  sku: string | null;
  stock: number;
  in_stock: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  is_featured: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  // joined
  category?: Category | null;
  product_images?: ProductImage[];
  product_variants?: ProductVariant[];
};

export type CartItem = {
  productId: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  stock: number;
};

export type OrderStatus = "pending_payment" | "paid" | "shipped" | "cancelled";

export type ShippingAddress = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string;
};

export type Order = {
  id: string;
  order_number: string;
  email: string;
  status: OrderStatus;
  payment_method: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shipping_address: ShippingAddress | null;
  created_at: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  title: string;
  price: number;
  quantity: number;
  image_url: string | null;
};
