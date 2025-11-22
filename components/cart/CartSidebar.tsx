'use client'

import { useCartStore } from '@/store/cart-store'
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function CartSidebar() {
    const { isOpen, toggleCart, items, removeItem, updateQuantity, getSubtotal, loadCart } = useCartStore()

    useEffect(() => {
        loadCart()
    }, [loadCart])

    const subtotal = getSubtotal()
    const tax = subtotal * 0.08
    const shipping = subtotal > 50 ? 0 : 9.99
    const total = subtotal + tax + shipping

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
                onClick={toggleCart}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f172a] border-l border-white/10 shadow-2xl z-50 flex flex-col animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0f172a]/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <ShoppingBag className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                        <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">
                            {items.length} items
                        </span>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <ShoppingBag className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
                            <p className="text-gray-400 mb-8 max-w-[200px]">Looks like you haven't added anything to your cart yet.</p>
                            <Button
                                onClick={toggleCart}
                                variant="outline"
                                className="border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
                            >
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => {
                                const product = item.products
                                const primaryImage = (product.product_images as any[])?.find(
                                    (img: any) => img.is_primary
                                )

                                return (
                                    <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                        {/* Image */}
                                        <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                                            {primaryImage?.image_url && (
                                                <img
                                                    src={primaryImage.image_url}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-medium text-sm text-gray-200 line-clamp-1 mb-1">
                                                    {product.name}
                                                </h3>
                                                <p className="text-indigo-400 font-bold text-sm">
                                                    {formatPrice(product.price)}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(product.id, item.quantity - 1)}
                                                        className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-medium text-white w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(product.id, item.quantity + 1)}
                                                        className="w-6 h-6 rounded-md hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeItem(product.id)}
                                                    className="p-1.5 hover:bg-red-500/10 hover:text-red-400 text-gray-500 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-white/10 p-6 bg-[#0f172a]/50 backdrop-blur-md">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Subtotal</span>
                                <span className="font-medium text-gray-200">{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Tax (8%)</span>
                                <span className="font-medium text-gray-200">{formatPrice(tax)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Shipping</span>
                                <span className="font-medium text-gray-200">
                                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                                </span>
                            </div>
                            {subtotal < 50 && (
                                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-2 text-center">
                                    <p className="text-xs text-indigo-300">
                                        Add {formatPrice(50 - subtotal)} more for free shipping!
                                    </p>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-bold pt-4 border-t border-white/10">
                                <span className="text-white">Total</span>
                                <span className="text-indigo-400">{formatPrice(total)}</span>
                            </div>
                        </div>

                        <Link href={ROUTES.CHECKOUT} onClick={toggleCart}>
                            <Button size="lg" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 shadow-lg shadow-indigo-500/25">
                                Proceed to Checkout
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
