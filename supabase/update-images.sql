-- ============================================
-- UPDATE PRODUCT IMAGES
-- ============================================
-- This script updates all product images with high-quality Unsplash URLs
-- It bypasses RLS by running directly in the SQL Editor

-- 1. Clear existing images
DELETE FROM product_images;

-- 2. Insert new images based on category
INSERT INTO product_images (product_id, image_url, is_primary, alt_text)
SELECT 
  p.id,
  CASE 
    WHEN c.slug = 'electronics' THEN 
      (ARRAY[
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600', -- Mouse
        'https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&q=80&w=600', -- Keyboard
        'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=600', -- Laptop
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', -- Headphones
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600', -- Headphones 2
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600', -- Laptop 2
        'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=600', -- Monitor
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=600'  -- Laptop 3
      ])[floor(random() * 8 + 1)]
    
    WHEN c.slug = 'clothing' THEN 
      (ARRAY[
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600', -- T-shirt
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600', -- Shirt
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600', -- Jacket
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600', -- Shoes
        'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=600'  -- Clothes rack
      ])[floor(random() * 5 + 1)]
      
    WHEN c.slug = 'books' THEN 
      (ARRAY[
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600', -- Book
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600', -- Book open
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600'  -- Books pile
      ])[floor(random() * 3 + 1)]

    WHEN c.slug = 'home-garden' THEN 
      (ARRAY[
        'https://images.unsplash.com/photo-1583847661884-3883d81a6157?auto=format&fit=crop&q=80&w=600', -- Chair
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600', -- Room
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600'  -- Furniture
      ])[floor(random() * 3 + 1)]

    ELSE 
      (ARRAY[
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600', -- Watch
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', -- Headphones
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600'  -- Sunglasses
      ])[floor(random() * 3 + 1)]
  END as image_url,
  true as is_primary,
  p.name as alt_text
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
