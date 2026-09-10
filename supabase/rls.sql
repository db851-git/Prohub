-- ProHub Technologies — Row Level Security policies
-- Run AFTER schema.sql.

-- Enable RLS
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table newsletter_subscribers enable row level security;
alter table contact_messages enable row level security;
alter table distributor_applications enable row level security;

-- Public read on catalogue tables
create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);
create policy "public read product_images" on product_images for select using (true);
create policy "public read product_variants" on product_variants for select using (true);

-- Public insert on lead / order tables (guest checkout & forms)
create policy "public insert newsletter" on newsletter_subscribers for insert with check (true);
create policy "public insert contact" on contact_messages for insert with check (true);
create policy "public insert distributor" on distributor_applications for insert with check (true);
create policy "public insert orders" on orders for insert with check (true);
create policy "public insert order_items" on order_items for insert with check (true);

-- Orders: users can read their own (matched by user_id OR email).
create policy "read own orders" on orders for select using (
  auth.uid() = user_id or email = auth.jwt() ->> 'email'
);
create policy "read own order_items" on order_items for select using (
  exists (
    select 1 from orders o
    where o.id = order_items.order_id
      and (o.user_id = auth.uid() or o.email = auth.jwt() ->> 'email')
  )
);

-- Profiles: users read/update only their own.
create policy "read own profile" on profiles for select using (auth.uid() = id);
create policy "insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "update own profile" on profiles for update using (auth.uid() = id);

-- Addresses: users manage only their own.
create policy "read own addresses" on addresses for select using (auth.uid() = user_id);
create policy "insert own addresses" on addresses for insert with check (auth.uid() = user_id);
create policy "update own addresses" on addresses for update using (auth.uid() = user_id);
create policy "delete own addresses" on addresses for delete using (auth.uid() = user_id);

-- NOTE: the server uses the service-role key for checkout + form writes,
-- which bypasses RLS. The public insert policies above also allow the
-- anon key to work if you prefer client-side inserts.
