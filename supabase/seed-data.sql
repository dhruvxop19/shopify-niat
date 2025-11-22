-- ============================================
-- SEED DATA - SIMPLIFIED VERSION
-- ============================================
-- This version uses gen_random_uuid() to avoid UUID format issues

-- ============================================
-- CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description, display_order, is_active) VALUES
('Electronics', 'electronics', 'Computers, phones, and electronic devices', 1, true),
('Clothing', 'clothing', 'Fashion and apparel for all', 2, true),
('Books', 'books', 'Physical and digital books', 3, true),
('Home & Garden', 'home-garden', 'Home improvement and garden supplies', 4, true),
('Sports & Outdoors', 'sports-outdoors', 'Sports equipment and outdoor gear', 5, true),
('Toys & Games', 'toys-games', 'Toys, games, and entertainment', 6, true),
('Beauty & Health', 'beauty-health', 'Beauty products and health items', 7, true),
('Automotive', 'automotive', 'Car parts and accessories', 8, true),
('Food & Grocery', 'food-grocery', 'Food items and groceries', 9, true),
('Pet Supplies', 'pet-supplies', 'Everything for your pets', 10, true);

-- ============================================
-- PRODUCTS
-- ============================================
-- Get category IDs for reference
DO $$
DECLARE
  electronics_id UUID;
  clothing_id UUID;
  books_id UUID;
  home_id UUID;
  sports_id UUID;
BEGIN
  -- Get category IDs
  SELECT id INTO electronics_id FROM categories WHERE slug = 'electronics';
  SELECT id INTO clothing_id FROM categories WHERE slug = 'clothing';
  SELECT id INTO books_id FROM categories WHERE slug = 'books';
  SELECT id INTO home_id FROM categories WHERE slug = 'home-garden';
  SELECT id INTO sports_id FROM categories WHERE slug = 'sports-outdoors';

  -- Electronics Products
  INSERT INTO products (name, slug, description, short_description, category_id, price, compare_at_price, sku, inventory_quantity, is_active, is_featured) VALUES
  ('Wireless Bluetooth Headphones', 'wireless-bluetooth-headphones', 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.', 'Premium wireless headphones with ANC', electronics_id, 129.99, 199.99, 'ELEC-HEAD-001', 50, true, true),
  ('Smart Watch Pro', 'smart-watch-pro', 'Advanced fitness tracking, heart rate monitoring, GPS, and smartphone notifications. Water-resistant up to 50m.', 'Advanced fitness smartwatch', electronics_id, 299.99, 399.99, 'ELEC-WATCH-001', 30, true, true),
  ('USB-C Fast Charger 65W', 'usb-c-fast-charger-65w', 'Compact and powerful 65W USB-C charger with GaN technology.', 'Fast 65W USB-C charger', electronics_id, 39.99, 59.99, 'ELEC-CHRG-001', 100, true, false),
  ('Mechanical Gaming Keyboard', 'mechanical-gaming-keyboard', 'RGB backlit mechanical keyboard with customizable keys and tactile switches.', 'RGB mechanical gaming keyboard', electronics_id, 89.99, 129.99, 'ELEC-KEYB-001', 45, true, false),
  ('Wireless Mouse Ergonomic', 'wireless-mouse-ergonomic', 'Ergonomic wireless mouse with adjustable DPI and long battery life.', 'Ergonomic wireless mouse', electronics_id, 34.99, 49.99, 'ELEC-MOUS-001', 75, true, false),
  ('4K Webcam with Microphone', '4k-webcam-microphone', 'Professional 4K webcam with built-in dual microphones.', '4K webcam for streaming', electronics_id, 79.99, 119.99, 'ELEC-WCAM-001', 60, true, false),
  ('Portable SSD 1TB', 'portable-ssd-1tb', 'Ultra-fast portable SSD with USB 3.2 Gen 2 and 1TB storage.', 'Fast 1TB portable SSD', electronics_id, 119.99, 179.99, 'ELEC-SSD-001', 40, true, false),
  ('Bluetooth Speaker Waterproof', 'bluetooth-speaker-waterproof', 'Portable waterproof Bluetooth speaker with 360° sound and 20-hour battery.', 'Waterproof Bluetooth speaker', electronics_id, 59.99, 89.99, 'ELEC-SPKR-001', 80, true, true),
  ('Laptop Stand Aluminum', 'laptop-stand-aluminum', 'Adjustable aluminum laptop stand with ergonomic design.', 'Ergonomic laptop stand', electronics_id, 44.99, 69.99, 'ELEC-STND-001', 55, true, false),
  ('Phone Gimbal Stabilizer', 'phone-gimbal-stabilizer', '3-axis smartphone gimbal stabilizer for smooth video recording.', 'Smartphone gimbal stabilizer', electronics_id, 149.99, 229.99, 'ELEC-GMBL-001', 25, true, false);

  -- Clothing Products
  INSERT INTO products (name, slug, description, short_description, category_id, price, compare_at_price, sku, inventory_quantity, is_active, is_featured) VALUES
  ('Classic Cotton T-Shirt', 'classic-cotton-tshirt', 'Premium 100% organic cotton t-shirt, soft and breathable.', 'Organic cotton t-shirt', clothing_id, 24.99, 34.99, 'CLTH-TSHT-001', 200, true, false),
  ('Slim Fit Jeans', 'slim-fit-jeans', 'Modern slim fit jeans with stretch denim for comfort.', 'Comfortable slim fit jeans', clothing_id, 59.99, 89.99, 'CLTH-JEAN-001', 150, true, true),
  ('Hooded Sweatshirt', 'hooded-sweatshirt', 'Cozy fleece-lined hoodie with kangaroo pocket.', 'Fleece-lined hoodie', clothing_id, 44.99, 64.99, 'CLTH-HOOD-001', 120, true, false),
  ('Running Shoes Athletic', 'running-shoes-athletic', 'Lightweight running shoes with cushioned sole and breathable mesh.', 'Lightweight running shoes', clothing_id, 79.99, 119.99, 'CLTH-SHOE-001', 90, true, true),
  ('Winter Jacket Insulated', 'winter-jacket-insulated', 'Warm insulated winter jacket with water-resistant outer shell.', 'Insulated winter jacket', clothing_id, 129.99, 199.99, 'CLTH-JCKT-001', 60, true, false),
  ('Yoga Pants High Waist', 'yoga-pants-high-waist', 'High-waisted yoga pants with moisture-wicking fabric.', 'High-waist yoga pants', clothing_id, 39.99, 59.99, 'CLTH-YOGA-001', 180, true, false),
  ('Dress Shirt Formal', 'dress-shirt-formal', 'Classic formal dress shirt with wrinkle-resistant fabric.', 'Wrinkle-resistant dress shirt', clothing_id, 49.99, 74.99, 'CLTH-DRSS-001', 100, true, false),
  ('Leather Belt Classic', 'leather-belt-classic', 'Genuine leather belt with reversible design.', 'Genuine leather belt', clothing_id, 34.99, 49.99, 'CLTH-BELT-001', 140, true, false),
  ('Baseball Cap Adjustable', 'baseball-cap-adjustable', 'Classic baseball cap with adjustable strap.', 'Adjustable baseball cap', clothing_id, 19.99, 29.99, 'CLTH-CAP-001', 250, true, false),
  ('Socks Athletic 6-Pack', 'socks-athletic-6pack', 'Cushioned athletic socks with arch support. Pack of 6.', 'Athletic socks 6-pack', clothing_id, 24.99, 34.99, 'CLTH-SOCK-001', 300, true, false);

  -- Books
  INSERT INTO products (name, slug, description, short_description, category_id, price, compare_at_price, sku, inventory_quantity, is_active, is_featured) VALUES
  ('The Art of Programming', 'art-of-programming', 'Comprehensive guide to modern programming practices and design patterns.', 'Modern programming guide', books_id, 49.99, 69.99, 'BOOK-PROG-001', 80, true, true),
  ('Mystery Novel: Dark Waters', 'mystery-novel-dark-waters', 'Gripping mystery thriller set in a coastal town.', 'Gripping mystery thriller', books_id, 14.99, 19.99, 'BOOK-MYST-001', 150, true, false),
  ('Cookbook: Healthy Meals', 'cookbook-healthy-meals', '100+ delicious and nutritious recipes for busy people.', 'Healthy recipe cookbook', books_id, 29.99, 39.99, 'BOOK-COOK-001', 100, true, false),
  ('Science Fiction: Beyond Stars', 'scifi-beyond-stars', 'Epic space opera spanning galaxies.', 'Epic space opera novel', books_id, 16.99, 24.99, 'BOOK-SCIF-001', 120, true, false),
  ('Self-Help: Mindful Living', 'selfhelp-mindful-living', 'Practical guide to mindfulness and meditation.', 'Mindfulness guide', books_id, 19.99, 27.99, 'BOOK-SELF-001', 90, true, true),
  ('Children: Adventure Tales', 'children-adventure-tales', 'Illustrated adventure stories for children ages 6-10.', 'Children''s adventure book', books_id, 12.99, 17.99, 'BOOK-CHLD-001', 200, true, false),
  ('Biography: Great Leaders', 'biography-great-leaders', 'Inspiring biographies of history''s most influential leaders.', 'Inspiring biographies', books_id, 24.99, 34.99, 'BOOK-BIOG-001', 70, true, false),
  ('Gardening Guide Complete', 'gardening-guide-complete', 'Complete guide to gardening for beginners and experts.', 'Complete gardening guide', books_id, 34.99, 44.99, 'BOOK-GARD-001', 85, true, false),
  ('Photography Masterclass', 'photography-masterclass', 'Learn professional photography techniques and composition.', 'Photography techniques book', books_id, 39.99, 54.99, 'BOOK-PHOT-001', 60, true, false),
  ('History: Ancient Civilizations', 'history-ancient-civilizations', 'Fascinating exploration of ancient civilizations.', 'Ancient civilizations history', books_id, 29.99, 39.99, 'BOOK-HIST-001', 95, true, false);

  -- Home & Garden
  INSERT INTO products (name, slug, description, short_description, category_id, price, compare_at_price, sku, inventory_quantity, is_active, is_featured) VALUES
  ('LED Desk Lamp Adjustable', 'led-desk-lamp-adjustable', 'Modern LED desk lamp with adjustable brightness and USB charging.', 'Adjustable LED desk lamp', home_id, 39.99, 59.99, 'HOME-LAMP-001', 110, true, false),
  ('Throw Pillow Set 4-Pack', 'throw-pillow-set-4pack', 'Decorative throw pillows with soft covers. Set of 4.', 'Decorative throw pillows', home_id, 44.99, 64.99, 'HOME-PILL-001', 80, true, false),
  ('Kitchen Knife Set 15-Piece', 'kitchen-knife-set-15piece', 'Professional kitchen knife set with stainless steel blades.', 'Professional knife set', home_id, 89.99, 139.99, 'HOME-KNIF-001', 50, true, true),
  ('Bath Towel Set Luxury', 'bath-towel-set-luxury', 'Ultra-soft luxury bath towels made from 100% Egyptian cotton.', 'Luxury Egyptian cotton towels', home_id, 69.99, 99.99, 'HOME-TOWL-001', 70, true, false),
  ('Plant Pot Ceramic Set', 'plant-pot-ceramic-set', 'Beautiful ceramic plant pots with drainage holes. Set of 3.', 'Ceramic plant pot set', home_id, 34.99, 49.99, 'HOME-POT-001', 120, true, false),
  ('Area Rug Modern 5x7', 'area-rug-modern-5x7', 'Modern geometric area rug, stain-resistant. 5x7 feet.', 'Modern geometric area rug', home_id, 129.99, 199.99, 'HOME-RUG-001', 40, true, false),
  ('Wall Clock Silent', 'wall-clock-silent', 'Silent non-ticking wall clock with modern design.', 'Silent wall clock', home_id, 29.99, 44.99, 'HOME-CLCK-001', 90, true, false),
  ('Curtains Blackout Thermal', 'curtains-blackout-thermal', 'Thermal insulated blackout curtains. Set of 2 panels.', 'Blackout thermal curtains', home_id, 54.99, 79.99, 'HOME-CURT-001', 100, true, false),
  ('Storage Bins Collapsible', 'storage-bins-collapsible', 'Fabric storage bins with handles. Set of 6.', 'Collapsible storage bins', home_id, 39.99, 54.99, 'HOME-BIN-001', 130, true, false),
  ('Garden Tool Set 10-Piece', 'garden-tool-set-10piece', 'Complete garden tool set with ergonomic handles.', 'Complete garden tool set', home_id, 64.99, 94.99, 'HOME-TOOL-001', 55, true, false);

  -- Sports & Outdoors
  INSERT INTO products (name, slug, description, short_description, category_id, price, compare_at_price, sku, inventory_quantity, is_active, is_featured) VALUES
  ('Yoga Mat Extra Thick', 'yoga-mat-extra-thick', 'Premium yoga mat with extra cushioning and non-slip surface.', 'Extra thick yoga mat', sports_id, 34.99, 49.99, 'SPRT-YOGA-001', 150, true, true),
  ('Camping Tent 4-Person', 'camping-tent-4person', 'Waterproof 4-person camping tent with easy setup.', 'Waterproof 4-person tent', sports_id, 149.99, 229.99, 'SPRT-TENT-001', 35, true, false),
  ('Dumbbell Set Adjustable', 'dumbbell-set-adjustable', 'Adjustable dumbbell set from 5-52.5 lbs per dumbbell.', 'Adjustable dumbbell set', sports_id, 299.99, 449.99, 'SPRT-DUMB-001', 25, true, true),
  ('Bicycle Helmet Safety', 'bicycle-helmet-safety', 'Lightweight bicycle helmet with adjustable fit.', 'Safety bicycle helmet', sports_id, 44.99, 64.99, 'SPRT-HELM-001', 80, true, false),
  ('Water Bottle Insulated', 'water-bottle-insulated', 'Stainless steel insulated water bottle. 32oz capacity.', 'Insulated water bottle 32oz', sports_id, 29.99, 39.99, 'SPRT-BOTL-001', 200, true, false),
  ('Resistance Bands Set', 'resistance-bands-set', 'Exercise resistance bands set with 5 different levels.', 'Resistance bands workout set', sports_id, 24.99, 34.99, 'SPRT-BAND-001', 180, true, false),
  ('Hiking Backpack 40L', 'hiking-backpack-40l', 'Durable hiking backpack with 40L capacity and rain cover.', '40L hiking backpack', sports_id, 79.99, 119.99, 'SPRT-PACK-001', 60, true, false),
  ('Soccer Ball Official Size', 'soccer-ball-official-size', 'Official size 5 soccer ball with durable construction.', 'Official size soccer ball', sports_id, 24.99, 34.99, 'SPRT-SOCR-001', 120, true, false),
  ('Jump Rope Speed', 'jump-rope-speed', 'Professional speed jump rope with adjustable length.', 'Speed jump rope', sports_id, 14.99, 19.99, 'SPRT-JUMP-001', 220, true, false),
  ('Fishing Rod Combo', 'fishing-rod-combo', 'Complete fishing rod and reel combo for beginners.', 'Fishing rod and reel combo', sports_id, 89.99, 129.99, 'SPRT-FISH-001', 45, true, false);

END $$;

-- ============================================
-- PRODUCT IMAGES
-- ============================================
-- Add placeholder images for featured products
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order)
SELECT 
  p.id,
  'https://via.placeholder.com/800x800/' || 
  CASE 
    WHEN p.category_id = (SELECT id FROM categories WHERE slug = 'electronics') THEN '4F46E5'
    WHEN p.category_id = (SELECT id FROM categories WHERE slug = 'clothing') THEN '3B82F6'
    WHEN p.category_id = (SELECT id FROM categories WHERE slug = 'books') THEN 'F59E0B'
    WHEN p.category_id = (SELECT id FROM categories WHERE slug = 'home-garden') THEN 'EF4444'
    WHEN p.category_id = (SELECT id FROM categories WHERE slug = 'sports-outdoors') THEN '06B6D4'
    ELSE '6366F1'
  END || '/FFFFFF?text=' || REPLACE(p.name, ' ', '+'),
  p.name,
  true,
  1
FROM products p
WHERE p.is_featured = true;
