-- COMPREHENSIVE IMAGE UPDATE SCRIPT
-- This assigns unique, relevant images to each product based on product name keywords
-- Run this in your Supabase SQL Editor

-- First, delete all existing product images
DELETE FROM product_images;

-- Insert specific images for each product based on their actual names
-- We'll use Unsplash's topic-specific collections for better relevance

-- ELECTRONICS PRODUCTS
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id, 
  CASE name
    WHEN 'Wireless Bluetooth Headphones' THEN 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
    WHEN 'Smart Watch Pro' THEN 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
    WHEN 'USB-C Fast Charger 65W' THEN 'https://images.unsplash.com/photo-1591290619762-d4c0e1a5e089?auto=format&fit=crop&q=80&w=600'
    WHEN 'Mechanical Gaming Keyboard' THEN 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600'
    WHEN 'Wireless Mouse Ergonomic' THEN 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600'
    WHEN '4K Webcam with Microphone' THEN 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=600'
    WHEN 'Portable SSD 1TB' THEN 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=600'
    WHEN 'Bluetooth Speaker Waterproof' THEN 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600'
    WHEN 'Laptop Stand Aluminum' THEN 'https://images.unsplash.com/photo-1625948515291-69613efd103f?auto=format&fit=crop&q=80&w=600'
    WHEN 'Phone Case Protective' THEN 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=600'
    ELSE 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&q=80&w=600'
  END,
  name, 0, true
FROM products
WHERE category_id IN (SELECT id FROM categories WHERE slug = 'electronics');

-- CLOTHING PRODUCTS
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id,
  CASE name
    WHEN 'Cotton T-Shirt Classic' THEN 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600'
    WHEN 'Denim Jeans Slim Fit' THEN 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600'
    WHEN 'Leather Jacket Premium' THEN 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600'
    WHEN 'Running Shoes Athletic' THEN 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600'
    WHEN 'Hoodie Pullover Warm' THEN 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600'
    WHEN 'Dress Shirt Formal' THEN 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600'
    WHEN 'Sneakers Casual White' THEN 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600'
    WHEN 'Winter Coat Insulated' THEN 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=600'
    WHEN 'Polo Shirt Cotton' THEN 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=600'
    WHEN 'Chino Pants Khaki' THEN 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600'
    ELSE 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600'
  END,
  name, 0, true
FROM products
WHERE category_id IN (SELECT id FROM categories WHERE slug = 'clothing');

-- BOOKS PRODUCTS
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id,
  CASE name
    WHEN 'Fiction Novel Bestseller' THEN 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'
    WHEN 'Programming Guide Advanced' THEN 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600'
    WHEN 'Cookbook Healthy Recipes' THEN 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600'
    WHEN 'Self-Help Motivation' THEN 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=600'
    WHEN 'Mystery Thriller Novel' THEN 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=600'
    WHEN 'Science Textbook College' THEN 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600'
    WHEN 'Biography Historical' THEN 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600'
    WHEN 'Children Story Book' THEN 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600'
    WHEN 'Art Design Portfolio' THEN 'https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=600'
    WHEN 'Business Strategy Guide' THEN 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
    ELSE 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600'
  END,
  name, 0, true
FROM products
WHERE category_id IN (SELECT id FROM categories WHERE slug = 'books');

-- HOME & GARDEN PRODUCTS
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id,
  CASE name
    WHEN 'Coffee Maker Automatic' THEN 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=600'
    WHEN 'Vacuum Cleaner Robot' THEN 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=600'
    WHEN 'Bed Sheets Cotton Set' THEN 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600'
    WHEN 'Kitchen Knife Set' THEN 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&q=80&w=600'
    WHEN 'Garden Tools Kit' THEN 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&q=80&w=600'
    WHEN 'Throw Pillows Decorative' THEN 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=600'
    WHEN 'Wall Art Canvas Print' THEN 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600'
    WHEN 'Table Lamp Modern' THEN 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600'
    WHEN 'Storage Bins Organizer' THEN 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600'
    WHEN 'Curtains Blackout Thermal' THEN 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600'
    ELSE 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600'
  END,
  name, 0, true
FROM products
WHERE category_id IN (SELECT id FROM categories WHERE slug = 'home-garden');

-- SPORTS & OUTDOORS PRODUCTS
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT id,
  CASE name
    WHEN 'Yoga Mat Non-Slip' THEN 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=600'
    WHEN 'Dumbbell Set Adjustable' THEN 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600'
    WHEN 'Camping Tent 4-Person' THEN 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600'
    WHEN 'Bicycle Mountain Bike' THEN 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=600'
    WHEN 'Water Bottle Insulated' THEN 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600'
    WHEN 'Backpack Hiking 50L' THEN 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600'
    WHEN 'Running Shorts Athletic' THEN 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=600'
    WHEN 'Resistance Bands Set' THEN 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=600'
    WHEN 'Soccer Ball Professional' THEN 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?auto=format&fit=crop&q=80&w=600'
    WHEN 'Fishing Rod Telescopic' THEN 'https://images.unsplash.com/photo-1545450660-7c0d5a9d1e7c?auto=format&fit=crop&q=80&w=600'
    ELSE 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600'
  END,
  name, 0, true
FROM products
WHERE category_id IN (SELECT id FROM categories WHERE slug = 'sports-outdoors');

-- For any remaining products without images, assign category-appropriate defaults
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT p.id, 
  CASE c.slug
    WHEN 'electronics' THEN 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&q=80&w=600'
    WHEN 'clothing' THEN 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600'
    WHEN 'books' THEN 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600'
    WHEN 'home-garden' THEN 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600'
    WHEN 'sports-outdoors' THEN 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600'
    WHEN 'toys-games' THEN 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=600'
    WHEN 'beauty-health' THEN 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600'
    WHEN 'automotive' THEN 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600'
    WHEN 'food-grocery' THEN 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'
    WHEN 'pet-supplies' THEN 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=600'
    ELSE 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
  END,
  p.name, 0, true
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.id NOT IN (SELECT product_id FROM product_images);
