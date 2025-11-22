-- Update product images with more varied Unsplash images
-- Run this in your Supabase SQL Editor

-- First, delete all existing product images
DELETE FROM product_images;

-- Insert varied images for each product
-- We'll use different Unsplash image IDs to ensure variety

-- Electronics products (varied tech images)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY random()) = 1 THEN 
            CASE (random() * 10)::int % 10
                WHEN 0 THEN 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&q=80&w=600'
            END
    END as image_url,
    p.name,
    0,
    true
FROM products p
WHERE p.category_id IN (SELECT id FROM categories WHERE slug = 'electronics');

-- Fashion products (varied clothing/accessories)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY random()) = 1 THEN 
            CASE (random() * 10)::int % 10
                WHEN 0 THEN 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600'
            END
    END as image_url,
    p.name,
    0,
    true
FROM products p
WHERE p.category_id IN (SELECT id FROM categories WHERE slug = 'fashion');

-- Home & Living products (varied home decor)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY random()) = 1 THEN 
            CASE (random() * 10)::int % 10
                WHEN 0 THEN 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=600'
            END
    END as image_url,
    p.name,
    0,
    true
FROM products p
WHERE p.category_id IN (SELECT id FROM categories WHERE slug = 'home-living');

-- Sports & Outdoors products (varied sports equipment)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY random()) = 1 THEN 
            CASE (random() * 10)::int % 10
                WHEN 0 THEN 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600'
            END
    END as image_url,
    p.name,
    0,
    true
FROM products p
WHERE p.category_id IN (SELECT id FROM categories WHERE slug = 'sports-outdoors');

-- Books & Media products (varied books/media)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY random()) = 1 THEN 
            CASE (random() * 10)::int % 10
                WHEN 0 THEN 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600'
            END
    END as image_url,
    p.name,
    0,
    true
FROM products p
WHERE p.category_id IN (SELECT id FROM categories WHERE slug = 'books-media');

-- Beauty & Health products (varied beauty/cosmetics)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY random()) = 1 THEN 
            CASE (random() * 10)::int % 10
                WHEN 0 THEN 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600'
            END
    END as image_url,
    p.name,
    0,
    true
FROM products p
WHERE p.category_id IN (SELECT id FROM categories WHERE slug = 'beauty-health');

-- Toys & Games products (varied toys)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY random()) = 1 THEN 
            CASE (random() * 10)::int % 10
                WHEN 0 THEN 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=600'
            END
    END as image_url,
    p.name,
    0,
    true
FROM products p
WHERE p.category_id IN (SELECT id FROM categories WHERE slug = 'toys-games');

-- Accessories products (varied accessories)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY random()) = 1 THEN 
            CASE (random() * 10)::int % 10
                WHEN 0 THEN 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1509941943102-10c232535736?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1624823183493-ed5832f48f18?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600'
            END
    END as image_url,
    p.name,
    0,
    true
FROM products p
WHERE p.category_id IN (SELECT id FROM categories WHERE slug = 'accessories');

-- Food & Beverages products (varied food items)
INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY random()) = 1 THEN 
            CASE (random() * 10)::int % 10
                WHEN 0 THEN 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'
            END
    END as image_url,
    p.name,
    0,
    true
FROM products p
WHERE p.category_id IN (SELECT id FROM categories WHERE slug = 'food-beverages');
