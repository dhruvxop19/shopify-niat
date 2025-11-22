/**
 * Application Type Definitions
 */

import { Database } from './database.types'

// Type helpers
export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row']

export type Inserts<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Insert']

export type Updates<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Update']

// Application types
export type Profile = Tables<'profiles'>
export type Category = Tables<'categories'>
export type Product = Tables<'products'>
export type ProductImage = Tables<'product_images'>
export type Review = Tables<'reviews'>
export type Cart = Tables<'carts'>
export type CartItem = Tables<'cart_items'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type Wishlist = Tables<'wishlist'>
export type Coupon = Tables<'coupons'>

// Extended types with relations
export interface ProductWithImages extends Product {
    product_images: ProductImage[]
    category: Category | null
}

export interface ProductWithDetails extends ProductWithImages {
    reviews: ReviewWithUser[]
    in_wishlist?: boolean
}

export interface ReviewWithUser extends Review {
    profiles: Pick<Profile, 'id' | 'full_name' | 'avatar_url'>
}

export interface CartItemWithProduct extends CartItem {
    products: ProductWithImages
}

export interface OrderWithItems extends Order {
    order_items: OrderItemWithProduct[]
}

export interface OrderItemWithProduct extends OrderItem {
    products: Pick<Product, 'id' | 'name' | 'slug' | 'price'> | null
}

// Cart state types
export interface GuestCartItem {
    product_id: string
    quantity: number
}

export interface CartState {
    items: CartItemWithProduct[]
    guestItems: GuestCartItem[]
    isOpen: boolean
    addItem: (productId: string, quantity?: number) => Promise<void>
    removeItem: (productId: string) => Promise<void>
    updateQuantity: (productId: string, quantity: number) => Promise<void>
    clearCart: () => Promise<void>
    toggleCart: () => void
    loadCart: () => Promise<void>
    mergeGuestCart: () => Promise<void>
    getItemCount: () => number
    getSubtotal: () => number
}

// Auth state types
export interface AuthState {
    user: Profile | null
    isLoading: boolean
    isAdmin: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, fullName: string) => Promise<void>
    signOut: () => Promise<void>
    loadUser: () => Promise<void>
}

// Filter and sort types
export interface ProductFilters {
    category?: string
    minPrice?: number
    maxPrice?: number
    minRating?: number
    search?: string
}

export interface ProductSort {
    field: 'price' | 'rating_average' | 'created_at' | 'name'
    direction: 'asc' | 'desc'
}

// Checkout types
export interface ShippingAddress {
    name: string
    email: string
    phone: string
    address_line1: string
    address_line2?: string
    city: string
    state: string
    postal_code: string
    country: string
}

export interface CheckoutData extends ShippingAddress {
    payment_method: string
}
