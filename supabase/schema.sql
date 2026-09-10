-- ProHub Technologies — database schema
-- Run in the Supabase SQL editor (or via the CLI) in this order:
--   1. schema.sql   2. rls.sql   3. seed.sql

-- CATEGORIES
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- PRODUCTS
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  specifications jsonb,
  category_id uuid references categories(id),
  brand text default 'ProHub',
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  currency text default 'GBP',
  sku text,
  stock int default 0,
  in_stock boolean generated always as (stock > 0) stored,
  is_new boolean default false,
  is_bestseller boolean default false,
  is_featured boolean default false,
  rating numeric(2,1) default 5.0,
  review_count int default 0,
  created_at timestamptz default now()
);

-- PRODUCT IMAGES
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int default 0
);

-- PRODUCT VARIANTS
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  name text,
  value text,
  price_delta numeric(10,2) default 0,
  stock int default 0
);

-- PROFILES
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz default now()
);

-- ADDRESSES
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  line1 text, line2 text, city text, postcode text, country text default 'United Kingdom',
  is_default boolean default false
);

-- ORDERS
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid references auth.users(id),
  email text not null,
  status text default 'pending_payment',
  payment_method text default 'pending',
  subtotal numeric(10,2) not null,
  shipping numeric(10,2) default 0,
  discount numeric(10,2) default 0,
  total numeric(10,2) not null,
  shipping_address jsonb,
  created_at timestamptz default now()
);

-- ORDER ITEMS
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  title text, price numeric(10,2), quantity int, image_url text
);

-- NEWSLETTER
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

-- CONTACT / COMPLAINTS
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  type text default 'contact',
  name text, email text, subject text, message text,
  created_at timestamptz default now()
);

-- DISTRIBUTOR APPLICATIONS
create table if not exists distributor_applications (
  id uuid primary key default gen_random_uuid(),
  business_name text, contact_name text, email text, phone text, website text, message text,
  created_at timestamptz default now()
);
