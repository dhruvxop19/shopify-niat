-- ============================================
-- RPC FUNCTIONS
-- ============================================
-- Database functions for complex operations

-- ============================================
-- CREATE ORDER TRANSACTION
-- ============================================
-- Atomically create an order and reduce inventory
CREATE OR REPLACE FUNCTION create_order_transaction(
  p_user_id UUID,
  p_order_data JSONB,
  p_order_items JSONB[]
)
RETURNS UUID AS $$
DECLARE
  v_order_id UUID;
  v_order_number TEXT;
  v_item JSONB;
  v_product_id UUID;
  v_quantity INTEGER;
  v_current_inventory INTEGER;
BEGIN
  -- Generate unique order number
  v_order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  
  -- Insert order
  INSERT INTO orders (
    user_id,
    order_number,
    status,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    shipping_name,
    shipping_email,
    shipping_phone,
    shipping_address_line1,
    shipping_address_line2,
    shipping_city,
    shipping_state,
    shipping_postal_code,
    shipping_country,
    payment_method,
    payment_status
  ) VALUES (
    p_user_id,
    v_order_number,
    COALESCE(p_order_data->>'status', 'pending'),
    (p_order_data->>'subtotal')::DECIMAL,
    COALESCE((p_order_data->>'tax')::DECIMAL, 0),
    COALESCE((p_order_data->>'shipping')::DECIMAL, 0),
    COALESCE((p_order_data->>'discount')::DECIMAL, 0),
    (p_order_data->>'total')::DECIMAL,
    p_order_data->>'shipping_name',
    p_order_data->>'shipping_email',
    p_order_data->>'shipping_phone',
    p_order_data->>'shipping_address_line1',
    p_order_data->>'shipping_address_line2',
    p_order_data->>'shipping_city',
    p_order_data->>'shipping_state',
    p_order_data->>'shipping_postal_code',
    p_order_data->>'shipping_country',
    COALESCE(p_order_data->>'payment_method', 'card'),
    COALESCE(p_order_data->>'payment_status', 'paid')
  ) RETURNING id INTO v_order_id;
  
  -- Process each order item
  FOREACH v_item IN ARRAY p_order_items
  LOOP
    v_product_id := (v_item->>'product_id')::UUID;
    v_quantity := (v_item->>'quantity')::INTEGER;
    
    -- Check inventory
    SELECT inventory_quantity INTO v_current_inventory
    FROM products
    WHERE id = v_product_id;
    
    IF v_current_inventory < v_quantity THEN
      RAISE EXCEPTION 'Insufficient inventory for product %', v_product_id;
    END IF;
    
    -- Insert order item
    INSERT INTO order_items (
      order_id,
      product_id,
      product_name,
      product_sku,
      price,
      quantity,
      subtotal
    ) VALUES (
      v_order_id,
      v_product_id,
      v_item->>'product_name',
      v_item->>'product_sku',
      (v_item->>'price')::DECIMAL,
      v_quantity,
      (v_item->>'subtotal')::DECIMAL
    );
    
    -- Reduce inventory
    UPDATE products
    SET inventory_quantity = inventory_quantity - v_quantity
    WHERE id = v_product_id;
  END LOOP;
  
  -- Clear user's cart
  DELETE FROM cart_items
  WHERE cart_id IN (
    SELECT id FROM carts WHERE user_id = p_user_id
  );
  
  RETURN v_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- MERGE GUEST CART
-- ============================================
-- Merge guest cart items into user cart on login
CREATE OR REPLACE FUNCTION merge_guest_cart(
  p_user_id UUID,
  p_guest_cart_items JSONB[]
)
RETURNS VOID AS $$
DECLARE
  v_cart_id UUID;
  v_item JSONB;
  v_product_id UUID;
  v_quantity INTEGER;
  v_existing_quantity INTEGER;
BEGIN
  -- Get or create user cart
  SELECT id INTO v_cart_id
  FROM carts
  WHERE user_id = p_user_id;
  
  IF v_cart_id IS NULL THEN
    INSERT INTO carts (user_id)
    VALUES (p_user_id)
    RETURNING id INTO v_cart_id;
  END IF;
  
  -- Process each guest cart item
  FOREACH v_item IN ARRAY p_guest_cart_items
  LOOP
    v_product_id := (v_item->>'product_id')::UUID;
    v_quantity := (v_item->>'quantity')::INTEGER;
    
    -- Check if item already exists in user cart
    SELECT quantity INTO v_existing_quantity
    FROM cart_items
    WHERE cart_id = v_cart_id AND product_id = v_product_id;
    
    IF v_existing_quantity IS NOT NULL THEN
      -- Update existing item
      UPDATE cart_items
      SET quantity = quantity + v_quantity,
          updated_at = NOW()
      WHERE cart_id = v_cart_id AND product_id = v_product_id;
    ELSE
      -- Insert new item
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES (v_cart_id, v_product_id, v_quantity);
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- GET PRODUCT RATING
-- ============================================
-- Calculate and update product rating average
CREATE OR REPLACE FUNCTION update_product_rating(p_product_id UUID)
RETURNS VOID AS $$
DECLARE
  v_avg_rating DECIMAL(3, 2);
  v_count INTEGER;
BEGIN
  SELECT 
    COALESCE(AVG(rating), 0),
    COUNT(*)
  INTO v_avg_rating, v_count
  FROM reviews
  WHERE product_id = p_product_id;
  
  UPDATE products
  SET 
    rating_average = v_avg_rating,
    rating_count = v_count
  WHERE id = p_product_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update product rating when review is added/updated/deleted
CREATE OR REPLACE FUNCTION trigger_update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM update_product_rating(OLD.product_id);
  ELSE
    PERFORM update_product_rating(NEW.product_id);
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION trigger_update_product_rating();

-- ============================================
-- GET RELATED PRODUCTS
-- ============================================
-- Simple heuristic for product recommendations
CREATE OR REPLACE FUNCTION get_related_products(
  p_product_id UUID,
  p_limit INTEGER DEFAULT 4
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  price DECIMAL,
  rating_average DECIMAL,
  image_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.slug,
    p.price,
    p.rating_average,
    pi.image_url
  FROM products p
  LEFT JOIN LATERAL (
    SELECT image_url
    FROM product_images
    WHERE product_id = p.id AND is_primary = true
    LIMIT 1
  ) pi ON true
  WHERE 
    p.id != p_product_id
    AND p.is_active = true
    AND p.category_id = (
      SELECT category_id FROM products WHERE id = p_product_id
    )
  ORDER BY p.rating_average DESC, p.created_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEARCH PRODUCTS
-- ============================================
-- Full-text search for products
CREATE OR REPLACE FUNCTION search_products(
  p_query TEXT,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  short_description TEXT,
  price DECIMAL,
  rating_average DECIMAL,
  image_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.slug,
    p.short_description,
    p.price,
    p.rating_average,
    pi.image_url
  FROM products p
  LEFT JOIN LATERAL (
    SELECT image_url
    FROM product_images
    WHERE product_id = p.id AND is_primary = true
    LIMIT 1
  ) pi ON true
  WHERE 
    p.is_active = true
    AND (
      p.name ILIKE '%' || p_query || '%'
      OR p.description ILIKE '%' || p_query || '%'
      OR p.short_description ILIKE '%' || p_query || '%'
    )
  ORDER BY 
    CASE 
      WHEN p.name ILIKE p_query || '%' THEN 1
      WHEN p.name ILIKE '%' || p_query || '%' THEN 2
      ELSE 3
    END,
    p.rating_average DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- CHECK VERIFIED PURCHASE
-- ============================================
-- Check if user has purchased a product
CREATE OR REPLACE FUNCTION check_verified_purchase(
  p_user_id UUID,
  p_product_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_has_purchased BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    WHERE o.user_id = p_user_id
      AND oi.product_id = p_product_id
      AND o.payment_status = 'paid'
  ) INTO v_has_purchased;
  
  RETURN v_has_purchased;
END;
$$ LANGUAGE plpgsql;
