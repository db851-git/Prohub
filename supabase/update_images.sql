-- ProHub — fix product images that were seeded with the old single placeholder.
-- Run this in the Supabase SQL Editor. It updates EVERY product's image to the
-- category-matched illustration shipped in /public/products.
-- Safe to run more than once.

update product_images pi
set url = case c.slug
    when 'charging-cables'    then '/products/charging-cables.svg'
    when 'wall-car-chargers'  then '/products/wall-car-chargers.svg'
    when 'power-banks'        then '/products/power-banks.svg'
    when 'audio'              then '/products/audio.svg'
    when 'mounts-holders'     then '/products/mounts-holders.svg'
    when 'hubs-adapters'      then '/products/hubs-adapters.svg'
    when 'smart-accessories'  then '/products/smart-accessories.svg'
    else '/placeholder.svg'
  end
from products p
join categories c on c.id = p.category_id
where pi.product_id = p.id;
