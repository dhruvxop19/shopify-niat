'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/Button'
import { ROUTES, APP_NAME } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Check, CreditCard, Truck, ShieldCheck, Package } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Mock steps
const STEPS = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: ShieldCheck },
]

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getSubtotal, clearCart } = useCartStore()
    const { user } = useAuthStore()
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    })

    const total = getSubtotal()
    const shipping = total > 50 ? 0 : 10
    const tax = total * 0.08 // 8% tax
    const grandTotal = total + shipping + tax

    useEffect(() => {
        if (items.length === 0) {
            router.push(ROUTES.CART)
        }
    }, [items, router])

    // Pre-fill email/name if user is logged in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                email: user.email || '',
                fullName: user.full_name || ''
            }))
        }
    }, [user])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleNext = () => {
        if (currentStep === 1) {
            // Validate Step 1
            if (!formData.fullName || !formData.email || !formData.address1 || !formData.city || !formData.state || !formData.zip || !formData.country) {
                setError('Please fill in all required shipping fields.')
                return
            }
        } else if (currentStep === 2) {
            // Validate Step 2
            if (!formData.cardNumber || !formData.expDate || !formData.cvv) {
                setError('Please fill in all payment details.')
                return
            }
        }

        setError('')
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1)
        } else {
            handleSubmitOrder()
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const handleSubmitOrder = async () => {
        if (!user) {
            setError('You must be logged in to place an order.')
            router.push(ROUTES.LOGIN + '?redirect=' + ROUTES.CHECKOUT)
            return
        }

        setIsLoading(true)
        setError('')

        try {
            const supabase = createClient()

            const orderData = {
                status: 'pending',
                subtotal: total,
                tax: tax,
                shipping: shipping,
                discount: 0,
                total: grandTotal,
                shipping_name: formData.fullName,
                shipping_email: formData.email,
                shipping_phone: formData.phone || '',
                shipping_address_line1: formData.address1,
                shipping_address_line2: formData.address2 || '',
                shipping_city: formData.city,
                shipping_state: formData.state,
                shipping_postal_code: formData.zip,
                shipping_country: formData.country,
                payment_method: 'card',
                payment_status: 'paid' // Mock payment success
            }

            console.log('Submitting order:', orderData)

            const orderItems = items.map(item => ({
                product_id: item.product_id,
                product_name: item.products.name,
                product_sku: item.products.sku || 'SKU-UNKNOWN',
                price: item.products.price,
                quantity: item.quantity,
                subtotal: item.products.price * item.quantity
            }))

            const { data: orderId, error: rpcError } = await supabase.rpc('create_order_transaction', {
                p_user_id: user.id,
                p_order_data: orderData,
                p_order_items: orderItems
            })

            if (rpcError) throw rpcError

            console.log('Order created successfully. ID:', orderId)

            // Clear local cart store
            clearCart()

            // Redirect to success page
            const successUrl = `/checkout/success/${orderId}`
            console.log('Redirecting to:', successUrl)
            router.push(successUrl)

        } catch (err: any) {
            console.error('Order creation failed:', err)
            setError(err.message || 'Failed to place order. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (items.length === 0) return null

    return (
        <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <Link href={ROUTES.CART} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors mb-4">
                            <ArrowLeft className="w-4 h-4" /> Back to Cart
                        </Link>
                        <h1 className="text-3xl font-bold text-white">Checkout</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Steps & Forms */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Steps Indicator */}
                            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex justify-between items-center relative overflow-hidden">
                                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-10"></div>
                                {STEPS.map((step) => {
                                    const isActive = step.id === currentStep
                                    const isCompleted = step.id < currentStep
                                    const Icon = step.icon

                                    return (
                                        <div key={step.id} className="flex flex-col items-center gap-2 bg-zinc-900 px-4 z-10">
                                            <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${isActive || isCompleted ? 'border-[#008060] bg-[#008060]/20 text-[#008060]' : 'border-zinc-700 bg-zinc-800 text-gray-500'}
                      `}>
                                                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                            </div>
                                            <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                                {step.name}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
                                    {error}
                                </div>
                            )}

                            {/* Step 1: Shipping Form */}
                            {currentStep === 1 && (
                                <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl animate-fade-in-up">
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-[#008060]" /> Shipping Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Address Line 1</label>
                                            <input
                                                type="text"
                                                name="address1"
                                                value={formData.address1}
                                                onChange={handleInputChange}
                                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                placeholder="123 Main St"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Address Line 2 (Optional)</label>
                                            <input
                                                type="text"
                                                name="address2"
                                                value={formData.address2}
                                                onChange={handleInputChange}
                                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                placeholder="Apt 4B"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                    placeholder="NY"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">ZIP</label>
                                                <input
                                                    type="text"
                                                    name="zip"
                                                    value={formData.zip}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                    placeholder="10001"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment Form */}
                            {currentStep === 2 && (
                                <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl animate-fade-in-up">
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-[#008060]" /> Payment Details
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="bg-[#008060]/10 border border-[#008060]/20 rounded-xl p-4 flex items-start gap-3">
                                            <ShieldCheck className="w-5 h-5 text-[#008060] mt-0.5" />
                                            <div>
                                                <h3 className="font-medium text-[#008060]">Secure Transaction</h3>
                                                <p className="text-sm text-[#008060]/80">Your payment information is encrypted and secure. This is a mock payment form for demonstration.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Cardholder Name</label>
                                            <input
                                                type="text"
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    name="expDate"
                                                    value={formData.expDate}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-2">CVV</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none transition-all"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Review */}
                            {currentStep === 3 && (
                                <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl animate-fade-in-up">
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-[#008060]" /> Review Order
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="border-b border-white/10 pb-6">
                                            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Shipping To</h3>
                                            <p className="text-white font-medium">{formData.fullName}</p>
                                            <p className="text-gray-300">{formData.address1}</p>
                                            {formData.address2 && <p className="text-gray-300">{formData.address2}</p>}
                                            <p className="text-gray-300">{formData.city}, {formData.state} {formData.zip}</p>
                                            <p className="text-gray-300">{formData.country}</p>
                                            <p className="text-gray-300 mt-2">{formData.phone}</p>
                                        </div>

                                        <div className="border-b border-white/10 pb-6">
                                            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Payment Method</h3>
                                            <div className="flex items-center gap-3 text-white">
                                                <CreditCard className="w-5 h-5 text-gray-400" />
                                                <span>Card ending in {formData.cardNumber.slice(-4) || '****'}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Order Items</h3>
                                            <div className="space-y-4">
                                                {items.map((item) => {
                                                    const imageUrl = item.products?.product_images?.[0]?.image_url

                                                    return (
                                                        <div key={item.id} className="flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden relative flex-shrink-0">
                                                                {imageUrl ? (
                                                                    <Image
                                                                        src={imageUrl}
                                                                        alt={item.products.name}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                                        <Package className="w-8 h-8" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-white font-medium line-clamp-1">{item.products.name}</h4>
                                                                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-white font-medium">{formatPrice(item.products.price * item.quantity)}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-4">
                                <Button
                                    variant="outline"
                                    onClick={handleBack}
                                    disabled={currentStep === 1 || isLoading}
                                    className="px-8 border-zinc-700 text-white hover:bg-zinc-800"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    isLoading={isLoading}
                                    className="px-8 bg-[#008060] hover:bg-[#006e52] text-white border-0"
                                >
                                    {currentStep === 3 ? 'Place Order' : 'Continue'}
                                </Button>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl sticky top-24">
                                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Tax (8%)</span>
                                        <span>{formatPrice(tax)}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold text-white">
                                        <span>Total</span>
                                        <span>{formatPrice(grandTotal)}</span>
                                    </div>
                                </div>

                                <div className="bg-[#008060]/10 rounded-xl p-4 text-sm text-[#008060]">
                                    <p className="mb-2 flex items-center gap-2">
                                        <Truck className="w-4 h-4" /> Free shipping on orders over $50
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" /> Secure checkout
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
