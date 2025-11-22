-- SIMPLE FIX: Delete all images and add one working image per product
-- Run this in your Supabase SQL Editor

-- Step 1: Delete all existing product images
DELETE FROM product_images;

-- Step 2: Add one working image for EVERY product
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
  p.id,
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  p.name,
  0,
  true
FROM products p;

-- Step 3: Verify the images were added
SELECT COUNT(*) as total_images FROM product_images;
