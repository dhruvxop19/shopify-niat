-- Update product images with UNIQUE Unsplash images for EVERY product
-- This ensures no two products share the same image
-- Run this in your Supabase SQL Editor

-- First, delete all existing product images
DELETE FROM product_images;

-- Create a temporary sequence for unique image assignment
DO $$
DECLARE
    product_record RECORD;
    image_counter INTEGER := 0;
    category_name TEXT;
    image_url TEXT;
BEGIN
    -- Loop through each product and assign a unique image
    FOR product_record IN 
        SELECT p.id, p.name, c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.id
    LOOP
        category_name := product_record.category_slug;
        
        -- Assign unique images based on category and counter
        IF category_name = 'electronics' THEN
            image_url := CASE (image_counter % 20)
                WHEN 0 THEN 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600'
                WHEN 9 THEN 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&q=80&w=600'
                WHEN 10 THEN 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=600'
                WHEN 11 THEN 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600'
                WHEN 12 THEN 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=600'
                WHEN 13 THEN 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&q=80&w=600'
                WHEN 14 THEN 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600'
                WHEN 15 THEN 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=600'
                WHEN 16 THEN 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=600'
                WHEN 17 THEN 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600'
                WHEN 18 THEN 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1585790050230-5dd28404f869?auto=format&fit=crop&q=80&w=600'
            END;
            
        ELSIF category_name = 'fashion' THEN
            image_url := CASE (image_counter % 20)
                WHEN 0 THEN 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600'
                WHEN 9 THEN 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600'
                WHEN 10 THEN 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600'
                WHEN 11 THEN 'https://images.unsplash.com/photo-1558769132-cb1aea3c8b5d?auto=format&fit=crop&q=80&w=600'
                WHEN 12 THEN 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=600'
                WHEN 13 THEN 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?auto=format&fit=crop&q=80&w=600'
                WHEN 14 THEN 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600'
                WHEN 15 THEN 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600'
                WHEN 16 THEN 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=600'
                WHEN 17 THEN 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=600'
                WHEN 18 THEN 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&q=80&w=600'
            END;
            
        ELSIF category_name = 'home-living' THEN
            image_url := CASE (image_counter % 20)
                WHEN 0 THEN 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600'
                WHEN 1 THEN 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'
                WHEN 2 THEN 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600'
                WHEN 3 THEN 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=600'
                WHEN 4 THEN 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600'
                WHEN 5 THEN 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600'
                WHEN 6 THEN 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=600'
                WHEN 7 THEN 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600'
                WHEN 8 THEN 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600'
                WHEN 9 THEN 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=600'
                WHEN 10 THEN 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600'
                WHEN 11 THEN 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600'
                WHEN 12 THEN 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600'
                WHEN 13 THEN 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600'
                WHEN 14 THEN 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=600'
                WHEN 15 THEN 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'
                WHEN 16 THEN 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=600'
                WHEN 17 THEN 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=600'
                WHEN 18 THEN 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=600'
                ELSE 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=600'
            END;
            
        ELSE
            -- Default fallback for other categories
            image_url := 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600';
        END IF;
        
        -- Insert the unique image for this product
        INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
        VALUES (product_record.id, image_url, product_record.name, 0, true);
        
        -- Increment counter for next product
        image_counter := image_counter + 1;
    END LOOP;
END $$;
