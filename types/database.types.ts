/**
 * Database Type Definitions
 * These types represent the database schema
 */

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    phone: string | null
                    is_admin: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    is_admin?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    is_admin?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    parent_id: string | null
                    image_url: string | null
                    display_order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    parent_id?: string | null
                    image_url?: string | null
                    display_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    parent_id?: string | null
                    image_url?: string | null
                    display_order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            products: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    short_description: string | null
                    category_id: string | null
                    price: number
                    compare_at_price: number | null
                    cost_price: number | null
                    sku: string | null
                    barcode: string | null
                    inventory_quantity: number
                    track_inventory: boolean
                    allow_backorder: boolean
                    weight: number | null
                    dimensions: any | null
                    is_active: boolean
                    is_featured: boolean
                    rating_average: number
                    rating_count: number
                    view_count: number
                    metadata: any | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    short_description?: string | null
                    category_id?: string | null
                    price: number
                    compare_at_price?: number | null
                    cost_price?: number | null
                    sku?: string | null
                    barcode?: string | null
                    inventory_quantity?: number
                    track_inventory?: boolean
                    allow_backorder?: boolean
                    weight?: number | null
                    dimensions?: any | null
                    is_active?: boolean
                    is_featured?: boolean
                    rating_average?: number
                    rating_count?: number
                    view_count?: number
                    metadata?: any | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    short_description?: string | null
                    category_id?: string | null
                    price?: number
                    compare_at_price?: number | null
                    cost_price?: number | null
                    sku?: string | null
                    barcode?: string | null
                    inventory_quantity?: number
                    track_inventory?: boolean
                    allow_backorder?: boolean
                    weight?: number | null
                    dimensions?: any | null
                    is_active?: boolean
                    is_featured?: boolean
                    rating_average?: number
                    rating_count?: number
                    view_count?: number
                    metadata?: any | null
                    created_at?: string
                    updated_at?: string
                }
            }
            product_images: {
                Row: {
                    id: string
                    product_id: string
                    image_url: string
                    alt_text: string | null
                    display_order: number
                    is_primary: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    image_url: string
                    alt_text?: string | null
                    display_order?: number
                    is_primary?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    image_url?: string
                    alt_text?: string | null
                    display_order?: number
                    is_primary?: boolean
                    created_at?: string
                }
            }
            reviews: {
                Row: {
                    id: string
                    product_id: string
                    user_id: string
                    rating: number
                    title: string | null
                    comment: string | null
                    is_verified_purchase: boolean
                    helpful_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    product_id: string
                    user_id: string
                    rating: number
                    title?: string | null
                    comment?: string | null
                    is_verified_purchase?: boolean
                    helpful_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    product_id?: string
                    user_id?: string
                    rating?: number
                    title?: string | null
                    comment?: string | null
                    is_verified_purchase?: boolean
                    helpful_count?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            carts: {
                Row: {
                    id: string
                    user_id: string
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    created_at?: string
                    updated_at?: string
                }
            }
            cart_items: {
                Row: {
                    id: string
                    cart_id: string
                    product_id: string
                    quantity: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    cart_id: string
                    product_id: string
                    quantity: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    cart_id?: string
                    product_id?: string
                    quantity?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    user_id: string | null
                    order_number: string
                    status: string
                    subtotal: number
                    tax: number
                    shipping: number
                    discount: number
                    total: number
                    shipping_name: string
                    shipping_email: string
                    shipping_phone: string | null
                    shipping_address_line1: string
                    shipping_address_line2: string | null
                    shipping_city: string
                    shipping_state: string
                    shipping_postal_code: string
                    shipping_country: string
                    payment_method: string
                    payment_status: string
                    notes: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id?: string | null
                    order_number: string
                    status?: string
                    subtotal: number
                    tax?: number
                    shipping?: number
                    discount?: number
                    total: number
                    shipping_name: string
                    shipping_email: string
                    shipping_phone?: string | null
                    shipping_address_line1: string
                    shipping_address_line2?: string | null
                    shipping_city: string
                    shipping_state: string
                    shipping_postal_code: string
                    shipping_country: string
                    payment_method?: string
                    payment_status?: string
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string | null
                    order_number?: string
                    status?: string
                    subtotal?: number
                    tax?: number
                    shipping?: number
                    discount?: number
                    total?: number
                    shipping_name?: string
                    shipping_email?: string
                    shipping_phone?: string | null
                    shipping_address_line1?: string
                    shipping_address_line2?: string | null
                    shipping_city?: string
                    shipping_state?: string
                    shipping_postal_code?: string
                    shipping_country?: string
                    payment_method?: string
                    payment_status?: string
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            order_items: {
                Row: {
                    id: string
                    order_id: string
                    product_id: string | null
                    product_name: string
                    product_sku: string | null
                    price: number
                    quantity: number
                    subtotal: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    order_id: string
                    product_id?: string | null
                    product_name: string
                    product_sku?: string | null
                    price: number
                    quantity: number
                    subtotal: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    order_id?: string
                    product_id?: string | null
                    product_name?: string
                    product_sku?: string | null
                    price?: number
                    quantity?: number
                    subtotal?: number
                    created_at?: string
                }
            }
            wishlist: {
                Row: {
                    id: string
                    user_id: string
                    product_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    product_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    product_id?: string
                    created_at?: string
                }
            }
            coupons: {
                Row: {
                    id: string
                    code: string
                    description: string | null
                    discount_type: string
                    discount_value: number
                    min_purchase: number
                    max_discount: number | null
                    usage_limit: number | null
                    usage_count: number
                    is_active: boolean
                    valid_from: string
                    valid_until: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    code: string
                    description?: string | null
                    discount_type: string
                    discount_value: number
                    min_purchase?: number
                    max_discount?: number | null
                    usage_limit?: number | null
                    usage_count?: number
                    is_active?: boolean
                    valid_from?: string
                    valid_until?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    code?: string
                    description?: string | null
                    discount_type?: string
                    discount_value?: number
                    min_purchase?: number
                    max_discount?: number | null
                    usage_limit?: number | null
                    usage_count?: number
                    is_active?: boolean
                    valid_from?: string
                    valid_until?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
        }
        Views: {}
        Functions: {
            create_order_transaction: {
                Args: {
                    p_user_id: string
                    p_order_data: any
                    p_order_items: any[]
                }
                Returns: string
            }
            merge_guest_cart: {
                Args: {
                    p_user_id: string
                    p_guest_cart_items: any[]
                }
                Returns: void
            }
            update_product_rating: {
                Args: {
                    p_product_id: string
                }
                Returns: void
            }
            get_related_products: {
                Args: {
                    p_product_id: string
                    p_limit?: number
                }
                Returns: {
                    id: string
                    name: string
                    slug: string
                    price: number
                    rating_average: number
                    image_url: string
                }[]
            }
            search_products: {
                Args: {
                    p_query: string
                    p_limit?: number
                }
                Returns: {
                    id: string
                    name: string
                    slug: string
                    short_description: string
                    price: number
                    rating_average: number
                    image_url: string
                }[]
            }
            check_verified_purchase: {
                Args: {
                    p_user_id: string
                    p_product_id: string
                }
                Returns: boolean
            }
        }
        Enums: {}
    }
}
