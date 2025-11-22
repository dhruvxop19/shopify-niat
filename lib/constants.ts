/**
 * Application Constants
 */

export const APP_NAME = 'Shopify'
export const APP_DESCRIPTION = 'The Future of Commerce'

export const ROUTES = {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
    CATEGORY: (slug: string) => `/category/${slug}`,
    SEARCH: '/search',
    CART: '/cart',
    CHECKOUT: '/checkout',
    CHECKOUT_SUCCESS: '/checkout/success',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ACCOUNT: '/account',
    ORDERS: '/account/orders',
    WISHLIST: '/account/wishlist',
    ADMIN: '/admin',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_CATEGORIES: '/admin/categories',
    ADMIN_INVENTORY: '/admin/inventory',
} as const

export const ORDER_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
} as const

export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
} as const

export const SORT_OPTIONS = [
    { label: 'Newest', value: 'created_at-desc' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating: High to Low', value: 'rating_average-desc' },
    { label: 'Name: A to Z', value: 'name-asc' },
] as const

export const ITEMS_PER_PAGE = 12

export const TAX_RATE = 0.08 // 8%
export const SHIPPING_COST = 9.99
export const FREE_SHIPPING_THRESHOLD = 50
