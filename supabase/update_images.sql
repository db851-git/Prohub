-- ProHub — set every product image to a real, category-matched Monarch Gadgets photo.
-- Run this in the Supabase SQL Editor. Safe to run more than once.
-- Distinct images are assigned per category so products don't all repeat.

with ranked as (
  select pi.id,
         c.slug as cat,
         row_number() over (partition by c.slug order by p.created_at, p.id) - 1 as rn
  from product_images pi
  join products p on p.id = pi.product_id
  left join categories c on c.id = p.category_id
)
update product_images pi
set url = case ranked.cat
    when 'charging-cables'   then (array[
      'https://cdn.shopify.com/s/files/1/2220/0245/files/Z-SERIESUSB-CTOUSB-C1.2M.png?v=1690885714',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/1.2A-C.png?v=1691395700',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/Z-SERIESUSB-CTOIPHONE1.2M.png?v=1690885758',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/2mA-C.png?v=1691401185'])[(ranked.rn % 4) + 1]
    when 'wall-car-chargers' then (array[
      'https://cdn.shopify.com/s/files/1/2220/0245/files/G453CC-01_6.png?v=1701423026',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/G303CA-01_6.png?v=1701423670',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/TP205CQ-01_6.png?v=1701422712',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/PD30_aa1f361e-34da-4f59-b40d-1e924c6e0b6a.png?v=1690807608'])[(ranked.rn % 4) + 1]
    when 'power-banks'       then (array[
      'https://cdn.shopify.com/s/files/1/2220/0245/files/1031.839.png?v=1690798249',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230802174933.jpg?v=1690980750',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230802161901.jpg?v=1690975794',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230802162041.jpg?v=1690974880'])[(ranked.rn % 4) + 1]
    when 'audio'             then (array[
      'https://cdn.shopify.com/s/files/1/2220/0245/files/T90.jpg?v=1690184652',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230803153929.png?v=1691059342',
      'https://cdn.shopify.com/s/files/1/2220/0245/products/H3.png?v=1652159827',
      'https://cdn.shopify.com/s/files/1/2220/0245/products/lADPBbCc1UCLFxzNEsDNF3A_6000_4800.jpg?v=1571712841'])[(ranked.rn % 4) + 1]
    when 'mounts-holders'    then (array[
      'https://cdn.shopify.com/s/files/1/2220/0245/files/CarMount304.jpg?v=1690546193',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/C9-F6.374.png?v=1690540986',
      'https://cdn.shopify.com/s/files/1/2220/0245/products/14.png?v=1652159093',
      'https://cdn.shopify.com/s/files/1/2220/0245/products/819BK_10.jpg?v=1571712841'])[(ranked.rn % 4) + 1]
    when 'hubs-adapters'     then (array[
      'https://cdn.shopify.com/s/files/1/2220/0245/files/Image_20230707143728.jpg?v=1690277562',
      'https://cdn.shopify.com/s/files/1/2220/0245/products/06_2fbf809b-a6b9-4d73-a6e5-cc0d83e0c679.png?v=1652159178',
      'https://cdn.shopify.com/s/files/1/2220/0245/products/J1_3.png?v=1652159189',
      'https://cdn.shopify.com/s/files/1/2220/0245/products/03_3b85ebc4-54a4-4deb-a1f7-149cff003614.png?v=1652159193'])[(ranked.rn % 4) + 1]
    when 'smart-accessories' then (array[
      'https://cdn.shopify.com/s/files/1/2220/0245/files/wirelessDoorBellb.png?v=1691481136',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/1.jpg?v=1691058488',
      'https://cdn.shopify.com/s/files/1/2220/0245/files/smaeartwatchwithusb-C.jpg?v=1691489064',
      'https://cdn.shopify.com/s/files/1/2220/0245/products/IMG-20170504-WA0007.jpg?v=1571712839'])[(ranked.rn % 4) + 1]
    else pi.url
  end
from ranked
where ranked.id = pi.id;
