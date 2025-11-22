/**
 * Cart Store - Zustand State Management
 * Handles both guest (localStorage) and authenticated (database) carts
 */

'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createClient } from '@/lib/supabase/client'
import type { CartState, GuestCartItem, CartItemWithProduct } from '@/types'

const GUEST_CART_KEY = 'guest-cart'

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            guestItems: [],
            isOpen: false,

            // Add item to cart
            addItem: async (productId: string, quantity: number = 1) => {
                const supabase = createClient()
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (user) {
                    // Authenticated user - add to database
                    const { data: cart } = await supabase
                        .from('carts')
                        .select('id')
                        .eq('user_id', user.id)
                        .single()

                    if (cart) {
                        // Check if item already exists
                        const { data: existingItem } = await supabase
                            .from('cart_items')
                            .select('*')
                            .eq('cart_id', cart.id)
                            .eq('product_id', productId)
                            .single()

                        if (existingItem) {
                            // Update quantity
                            await supabase
                                .from('cart_items')
                                .update({ quantity: existingItem.quantity + quantity })
                                .eq('id', existingItem.id)
                        } else {
                            // Insert new item
                            await supabase.from('cart_items').insert({
                                cart_id: cart.id,
                                product_id: productId,
                                quantity,
                            })
                        }

                        // Reload cart
                        await get().loadCart()
                    }
                } else {
                    // Guest user - add to localStorage
                    const guestItems = get().guestItems
                    const existingIndex = guestItems.findIndex(
                        (item) => item.product_id === productId
                    )

                    if (existingIndex >= 0) {
                        const updatedItems = [...guestItems]
                        updatedItems[existingIndex].quantity += quantity
                        set({ guestItems: updatedItems })
                    } else {
                        set({ guestItems: [...guestItems, { product_id: productId, quantity }] })
                    }
                }
            },

            // Remove item from cart
            removeItem: async (productId: string) => {
                const supabase = createClient()
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (user) {
                    const { data: cart } = await supabase
                        .from('carts')
                        .select('id')
                        .eq('user_id', user.id)
                        .single()

                    if (cart) {
                        await supabase
                            .from('cart_items')
                            .delete()
                            .eq('cart_id', cart.id)
                            .eq('product_id', productId)

                        await get().loadCart()
                    }
                } else {
                    const guestItems = get().guestItems.filter(
                        (item) => item.product_id !== productId
                    )
                    set({ guestItems })
                }
            },

            // Update item quantity
            updateQuantity: async (productId: string, quantity: number) => {
                if (quantity <= 0) {
                    await get().removeItem(productId)
                    return
                }

                const supabase = createClient()
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (user) {
                    const { data: cart } = await supabase
                        .from('carts')
                        .select('id')
                        .eq('user_id', user.id)
                        .single()

                    if (cart) {
                        await supabase
                            .from('cart_items')
                            .update({ quantity })
                            .eq('cart_id', cart.id)
                            .eq('product_id', productId)

                        await get().loadCart()
                    }
                } else {
                    const guestItems = get().guestItems.map((item) =>
                        item.product_id === productId ? { ...item, quantity } : item
                    )
                    set({ guestItems })
                }
            },

            // Clear cart
            clearCart: async () => {
                const supabase = createClient()
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (user) {
                    const { data: cart } = await supabase
                        .from('carts')
                        .select('id')
                        .eq('user_id', user.id)
                        .single()

                    if (cart) {
                        await supabase.from('cart_items').delete().eq('cart_id', cart.id)
                        set({ items: [] })
                    }
                } else {
                    set({ guestItems: [] })
                }
            },

            // Toggle cart sidebar
            toggleCart: () => {
                set({ isOpen: !get().isOpen })
            },

            // Load cart from database
            loadCart: async () => {
                const supabase = createClient()
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (user) {
                    const { data: cart } = await supabase
                        .from('carts')
                        .select('id')
                        .eq('user_id', user.id)
                        .single()

                    if (cart) {
                        const { data: cartItems } = await supabase
                            .from('cart_items')
                            .select(
                                `
                *,
                products (
                  *,
                  product_images (*)
                )
              `
                            )
                            .eq('cart_id', cart.id)

                        set({ items: (cartItems as any) || [] })
                    }
                }
            },

            // Merge guest cart into user cart on login
            mergeGuestCart: async () => {
                const guestItems = get().guestItems
                if (guestItems.length === 0) return

                const supabase = createClient()
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (user) {
                    // Call RPC function to merge carts
                    await supabase.rpc('merge_guest_cart', {
                        p_user_id: user.id,
                        p_guest_cart_items: guestItems,
                    })

                    // Clear guest cart and reload
                    set({ guestItems: [] })
                    await get().loadCart()
                }
            },

            // Get total item count
            getItemCount: () => {
                const { items, guestItems } = get()
                if (items.length > 0) {
                    return items.reduce((sum, item) => sum + item.quantity, 0)
                }
                return guestItems.reduce((sum, item) => sum + item.quantity, 0)
            },

            // Get cart subtotal
            getSubtotal: () => {
                const { items } = get()
                return items.reduce(
                    (sum, item) => sum + item.products.price * item.quantity,
                    0
                )
            },
        }),
        {
            name: GUEST_CART_KEY,
            partialize: (state) => ({ guestItems: state.guestItems }),
        }
    )
)
