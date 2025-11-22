
-- ============================================
-- UPDATE PRODUCT IMAGES (LOCAL)
-- ============================================
DELETE FROM product_images;

INSERT INTO product_images (product_id, image_url, is_primary, alt_text)
SELECT 
  p.id,
  CASE 
    WHEN c.slug = 'electronics' THEN 
      (ARRAY[
        '/images/products/electronics-1.jpg',
        '/images/products/electronics-2.jpg',
        '/images/products/electronics-3.jpg',
        '/images/products/electronics-4.jpg',
        '/images/products/electronics-5.jpg',
        '/images/products/electronics-6.jpg',
        '/images/products/electronics-7.jpg',
        '/images/products/electronics-8.jpg'
      ])[floor(random() * 8 + 1)]
    
    WHEN c.slug = 'clothing' THEN 
      (ARRAY[
        '/images/products/clothing-1.jpg',
        '/images/products/clothing-2.jpg',
        '/images/products/clothing-3.jpg',
        '/images/products/clothing-4.jpg',
        '/images/products/clothing-5.jpg'
      ])[floor(random() * 5 + 1)]
      
    WHEN c.slug = 'books' THEN 
      (ARRAY[
        '/images/products/books-1.jpg',
        '/images/products/books-2.jpg',
        '/images/products/books-3.jpg'
      ])[floor(random() * 3 + 1)]

    WHEN c.slug = 'home-garden' THEN 
      (ARRAY[
        '/images/products/home-garden-1.jpg',
        '/images/products/home-garden-2.jpg',
        '/images/products/home-garden-3.jpg'
      ])[floor(random() * 3 + 1)]

    ELSE 
      (ARRAY[
        '/images/products/default-1.jpg',
        '/images/products/default-2.jpg',
        '/images/products/default-3.jpg'
      ])[floor(random() * 3 + 1)]
  END as image_url,
  true as is_primary,
  p.name as alt_text
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
