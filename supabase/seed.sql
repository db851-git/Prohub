-- ProHub Technologies — seed data
-- Run AFTER schema.sql (and rls.sql). Safe to re-run: conflicts are ignored.

-- CATEGORIES
insert into categories (name, slug, description, sort_order) values
  ('Charging Cables', 'charging-cables', 'Fast, braided and durable cables for every device.', 1),
  ('Wall & Car Chargers', 'wall-car-chargers', 'GaN wall chargers and car adapters that charge fast and stay cool.', 2),
  ('Power Banks', 'power-banks', 'Portable power for phones, tablets and laptops.', 3),
  ('Audio', 'audio', 'Speakers and earphones tuned for everyday listening.', 4),
  ('Mounts & Holders', 'mounts-holders', 'Keep your devices steady at the desk and on the road.', 5),
  ('Hubs & Adapters', 'hubs-adapters', 'Expand your ports and connect everything.', 6),
  ('Smart Accessories', 'smart-accessories', 'Smart gadgets that make life easier.', 7)
on conflict (slug) do nothing;

-- PRODUCTS
-- helper: category_id via subselect on slug
insert into products (title, slug, description, specifications, category_id, price, compare_at_price, sku, stock, is_new, is_bestseller, is_featured, rating, review_count)
values
  ('USB-C to USB-C 100W Cable 2m', 'usb-c-to-usb-c-100w-cable-2m', 'Charge laptops and phones at full speed with this 100W rated 2m cable.', '{"Power":"100W","Length":"2m","Connector":"USB-C to USB-C","Warranty":"2 years"}', (select id from categories where slug='charging-cables'), 14.99, 19.99, 'USBC100W2M', 120, false, true, false, 4.7, 214),
  ('Lightning to USB-C Fast Cable 1.2m', 'lightning-to-usb-c-fast-cable-1-2m', 'Fast, MFi-style charging for iPhone with a durable 1.2m cable.', '{"Length":"1.2m","Connector":"Lightning to USB-C","Warranty":"2 years"}', (select id from categories where slug='charging-cables'), 12.99, null, 'LTGC12M', 80, true, false, false, 4.6, 98),
  ('Braided USB-C to USB-A 1m', 'braided-usb-c-to-usb-a-1m', 'Everyday braided cable built to last.', '{"Length":"1m","Connector":"USB-C to USB-A","Warranty":"2 years"}', (select id from categories where slug='charging-cables'), 7.99, 9.99, 'BRCA1M', 200, false, false, false, 4.5, 320),
  ('Nylon USB-C to USB-C 0.3m (2-Pack)', 'nylon-usb-c-to-usb-c-0-3m-2-pack', 'Short cables, perfect for power banks and travel. Two in a pack.', '{"Length":"0.3m","Pack":"2","Warranty":"2 years"}', (select id from categories where slug='charging-cables'), 9.99, null, 'NYLC03M2', 0, false, false, false, 4.4, 60),
  ('20W USB-C Wall Charger (UK)', '20w-usb-c-wall-charger-uk', 'Compact 20W fast charger with a UK plug.', '{"Power":"20W","Ports":"1x USB-C","Plug":"UK","Warranty":"2 years"}', (select id from categories where slug='wall-car-chargers'), 16.99, null, 'WC20WUK', 150, false, true, false, 4.7, 180),
  ('65W GaN Dual-Port Charger', '65w-gan-dual-port-charger', 'Tiny GaN charger that powers a laptop and phone at once.', '{"Power":"65W","Ports":"USB-C + USB-A","Tech":"GaN","Warranty":"2 years"}', (select id from categories where slug='wall-car-chargers'), 39.99, 49.99, 'GAN65W', 60, true, false, true, 4.8, 142),
  ('3.4A Dual Car Charger', '3-4a-dual-car-charger', 'Charge two devices on the move.', '{"Output":"3.4A","Ports":"2x USB-A","Warranty":"2 years"}', (select id from categories where slug='wall-car-chargers'), 13.99, null, 'CAR34A', 90, false, false, false, 4.5, 75),
  ('100W GaN 4-Port Desktop Charger', '100w-gan-4-port-desktop-charger', 'One charger for your whole desk.', '{"Power":"100W","Ports":"3x USB-C + 1x USB-A","Tech":"GaN","Warranty":"2 years"}', (select id from categories where slug='wall-car-chargers'), 59.99, 69.99, 'GAN100W4', 25, false, false, false, 4.8, 54),
  ('10,000mAh Power Bank', '10-000mah-power-bank', 'Reliable everyday power bank with fast output.', '{"Capacity":"10000mAh","Output":"18W","Warranty":"2 years"}', (select id from categories where slug='power-banks'), 24.99, 29.99, 'PB10K', 140, false, true, false, 4.6, 260),
  ('10,000mAh Wireless MagCharge Bank', '10-000mah-wireless-magcharge-bank', 'Magnetic wireless charging on the go.', '{"Capacity":"10000mAh","Wireless":"15W MagSafe-compatible","Warranty":"2 years"}', (select id from categories where slug='power-banks'), 39.99, null, 'PBMAG10K', 70, true, false, false, 4.7, 88),
  ('5,000mAh Slim Power Bank', '5-000mah-slim-power-bank', 'Pocket-sized top-up power.', '{"Capacity":"5000mAh","Output":"15W","Warranty":"2 years"}', (select id from categories where slug='power-banks'), 19.99, null, 'PB5K', 110, false, false, false, 4.5, 130),
  ('20,000mAh 65W Laptop Power Bank', '20-000mah-65w-laptop-power-bank', 'Laptop-class power you can carry.', '{"Capacity":"20000mAh","Output":"65W","Warranty":"2 years"}', (select id from categories where slug='power-banks'), 64.99, 79.99, 'PB20K65W', 0, false, false, true, 4.8, 77),
  ('Bubble Bluetooth Speaker', 'bubble-bluetooth-speaker', 'Big sound from a compact, splash-resistant speaker.', '{"Connectivity":"Bluetooth 5.3","Battery":"12h","Warranty":"2 years"}', (select id from categories where slug='audio'), 34.99, 44.99, 'SPKBUB', 55, false, true, false, 4.6, 150),
  ('Compact TWS Earbuds', 'compact-tws-earbuds', 'True wireless earbuds with a comfortable fit.', '{"Connectivity":"Bluetooth 5.3","Battery":"24h w/ case","Warranty":"2 years"}', (select id from categories where slug='audio'), 29.99, null, 'TWSEAR', 95, true, false, false, 4.5, 110),
  ('Wired Earphones with Mic', 'wired-earphones-with-mic', 'Dependable wired earphones with in-line mic.', '{"Connector":"3.5mm","Mic":"Yes","Warranty":"2 years"}', (select id from categories where slug='audio'), 9.99, 12.99, 'WIRED35', 180, false, false, false, 4.3, 210),
  ('Over-Ear ANC Headphones', 'over-ear-anc-headphones', 'Active noise cancelling for focus and travel.', '{"ANC":"Yes","Battery":"40h","Warranty":"2 years"}', (select id from categories where slug='audio'), 89.99, 99.99, 'ANCHP', 20, false, false, true, 4.7, 64),
  ('Universal Car Vent Mount', 'universal-car-vent-mount', 'Secure your phone to any air vent.', '{"Mount":"Air vent","Fit":"Universal","Warranty":"2 years"}', (select id from categories where slug='mounts-holders'), 11.99, null, 'MNTVENT', 130, false, false, false, 4.4, 95),
  ('MagSafe Desk Stand', 'magsafe-desk-stand', 'Magnetic desk stand for wireless charging.', '{"Mount":"Magnetic","Wireless":"15W","Warranty":"2 years"}', (select id from categories where slug='mounts-holders'), 22.99, 27.99, 'MNTMAG', 65, true, false, false, 4.6, 72),
  ('Adjustable Aluminium Phone Stand', 'adjustable-aluminium-phone-stand', 'Sturdy aluminium stand with adjustable angles.', '{"Material":"Aluminium","Adjustable":"Yes","Warranty":"2 years"}', (select id from categories where slug='mounts-holders'), 14.99, null, 'MNTALU', 100, false, false, false, 4.5, 88),
  ('Dashboard Suction Mount', 'dashboard-suction-mount', 'Strong suction mount for your dashboard.', '{"Mount":"Suction","Fit":"Universal","Warranty":"2 years"}', (select id from categories where slug='mounts-holders'), 9.99, null, 'MNTDASH', 0, false, false, false, 4.3, 45),
  ('4-in-1 USB-C Hub', '4-in-1-usb-c-hub', 'Add HDMI, USB-A and more from a single port.', '{"Ports":"HDMI, 2x USB-A, USB-C PD","Warranty":"2 years"}', (select id from categories where slug='hubs-adapters'), 27.99, 34.99, 'HUB4IN1', 75, false, true, false, 4.6, 120),
  ('USB-C to HDMI Adapter', 'usb-c-to-hdmi-adapter', 'Mirror or extend to a 4K display.', '{"Output":"4K HDMI","Connector":"USB-C","Warranty":"2 years"}', (select id from categories where slug='hubs-adapters'), 15.99, null, 'ADPHDMI', 85, false, false, false, 4.5, 70),
  ('7-in-1 USB-C Docking Hub', '7-in-1-usb-c-docking-hub', 'A complete docking solution for your laptop.', '{"Ports":"HDMI, 3x USB-A, SD, microSD, USB-C PD","Warranty":"2 years"}', (select id from categories where slug='hubs-adapters'), 44.99, 54.99, 'HUB7IN1', 40, false, false, true, 4.7, 58),
  ('USB-C to Ethernet Adapter', 'usb-c-to-ethernet-adapter', 'Reliable wired networking on the go.', '{"Speed":"Gigabit","Connector":"USB-C","Warranty":"2 years"}', (select id from categories where slug='hubs-adapters'), 17.99, null, 'ADPETH', 60, false, false, false, 4.5, 49),
  ('Universal Stylus Pen', 'universal-stylus-pen', 'Precise stylus for tablets and phones.', '{"Compatibility":"Universal","Tip":"Fine","Warranty":"2 years"}', (select id from categories where slug='smart-accessories'), 18.99, 24.99, 'STYLUS', 90, true, false, false, 4.5, 66),
  ('Smartwatch Charging Cable', 'smartwatch-charging-cable', 'Magnetic charging cable for popular smartwatches.', '{"Type":"Magnetic","Length":"1m","Warranty":"2 years"}', (select id from categories where slug='smart-accessories'), 12.99, null, 'SWCABLE', 110, false, false, false, 4.4, 54),
  ('Wireless Video Doorbell', 'wireless-video-doorbell', 'See who''s at the door from anywhere.', '{"Video":"1080p","Connectivity":"Wi-Fi","Warranty":"2 years"}', (select id from categories where slug='smart-accessories'), 79.99, 99.99, 'DOORBELL', 15, false, true, true, 4.6, 40),
  ('Smart Wi-Fi Plug (2-Pack)', 'smart-wi-fi-plug-2-pack', 'Control your devices from your phone.', '{"Connectivity":"Wi-Fi","Pack":"2","Warranty":"2 years"}', (select id from categories where slug='smart-accessories'), 21.99, null, 'WIFIPLUG2', 70, false, false, false, 4.5, 82)
on conflict (slug) do nothing;

-- PRODUCT IMAGES — a distinct, category-relevant placeholder photo per product
-- (free stock imagery; replace with your own product photography before launch).
with ranked as (
  select p.id,
         c.slug as cat,
         row_number() over (partition by c.slug order by p.created_at, p.id) - 1 as rn
  from products p
  left join categories c on c.id = p.category_id
)
insert into product_images (product_id, url, alt, sort_order)
select r.id,
       case r.cat
         when 'charging-cables'   then (array[
           'https://cdn.shopify.com/s/files/1/2220/0245/files/Z-SERIESUSB-CTOUSB-C1.2M.png?v=1690885714',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/1.2A-C.png?v=1691395700',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/Z-SERIESUSB-CTOIPHONE1.2M.png?v=1690885758',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/2mA-C.png?v=1691401185'])[(r.rn % 4) + 1]
         when 'wall-car-chargers' then (array[
           'https://cdn.shopify.com/s/files/1/2220/0245/files/G453CC-01_6.png?v=1701423026',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/G303CA-01_6.png?v=1701423670',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/TP205CQ-01_6.png?v=1701422712',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/PD30_aa1f361e-34da-4f59-b40d-1e924c6e0b6a.png?v=1690807608'])[(r.rn % 4) + 1]
         when 'power-banks'       then (array[
           'https://cdn.shopify.com/s/files/1/2220/0245/files/1031.839.png?v=1690798249',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230802174933.jpg?v=1690980750',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230802161901.jpg?v=1690975794',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230802162041.jpg?v=1690974880'])[(r.rn % 4) + 1]
         when 'audio'             then (array[
           'https://cdn.shopify.com/s/files/1/2220/0245/files/T90.jpg?v=1690184652',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230803153929.png?v=1691059342',
           'https://cdn.shopify.com/s/files/1/2220/0245/products/H3.png?v=1652159827',
           'https://cdn.shopify.com/s/files/1/2220/0245/products/lADPBbCc1UCLFxzNEsDNF3A_6000_4800.jpg?v=1571712841'])[(r.rn % 4) + 1]
         when 'mounts-holders'    then (array[
           'https://cdn.shopify.com/s/files/1/2220/0245/files/CarMount304.jpg?v=1690546193',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/C9-F6.374.png?v=1690540986',
           'https://cdn.shopify.com/s/files/1/2220/0245/products/14.png?v=1652159093',
           'https://cdn.shopify.com/s/files/1/2220/0245/products/819BK_10.jpg?v=1571712841'])[(r.rn % 4) + 1]
         when 'hubs-adapters'     then (array[
           'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230707143728.jpg?v=1690277562',
           'https://cdn.shopify.com/s/files/1/2220/0245/products/06_2fbf809b-a6b9-4d73-a6e5-cc0d83e0c679.png?v=1652159178',
           'https://cdn.shopify.com/s/files/1/2220/0245/products/J1_3.png?v=1652159189',
           'https://cdn.shopify.com/s/files/1/2220/0245/products/03_3b85ebc4-54a4-4deb-a1f7-149cff003614.png?v=1652159193'])[(r.rn % 4) + 1]
         when 'smart-accessories' then (array[
           'https://cdn.shopify.com/s/files/1/2220/0245/files/wirelessDoorBellb.png?v=1691481136',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/1.jpg?v=1691058488',
           'https://cdn.shopify.com/s/files/1/2220/0245/files/smaeartwatchwithusb-C.jpg?v=1691489064',
           'https://cdn.shopify.com/s/files/1/2220/0245/products/IMG-20170504-WA0007.jpg?v=1571712839'])[(r.rn % 4) + 1]
         else '/placeholder.svg'
       end,
       p.title || ' product photo',
       0
from ranked r
join products p on p.id = r.id
where not exists (select 1 from product_images pi where pi.product_id = r.id);
