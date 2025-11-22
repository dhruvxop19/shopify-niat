'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function OrderSuccessPage() {
    const params = useParams()
    const router = useRouter()
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            console.log('Success Page Params:', params)
            if (!params.id) {
                console.log('No ID in params')
                return
            }

            const supabase = createClient()
            const { data, error } = await supabase
                .from('orders')
                .select(`
          *,
          order_items (*)
        `)
                .eq('id', params.id)
                .single()

            if (error) {
                console.error('Error fetching order:', error)
                router.push(ROUTES.HOME)
                return
            }

            setOrder(data)
            setLoading(false)
        }

        fetchOrder()
    }, [params.id, router])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    if (!order) return null

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="glass-card p-8 md:p-12 rounded-3xl text-center mb-8 animate-fade-in-up">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
                        <p className="text-gray-400 text-lg mb-8">
                            Thank you for your purchase. Your order has been received and is being processed.
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-gray-300">
                            <span className="text-gray-500">Order Number:</span>
                            <span className="font-mono font-bold text-white">{order.order_number}</span>
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-2xl animate-fade-in-up animate-delay-100">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Package className="w-5 h-5 text-indigo-400" /> Order Details
                        </h2>

                        <div className="space-y-6">
                            {/* Order Items */}
                            <div className="space-y-4 border-b border-white/10 pb-6">
                                {order.order_items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden relative flex-shrink-0">
                                            {/* We don't have image URL in order_items, would need to join products or store it */}
                                            {/* For now, show a placeholder or try to fetch product image if needed, but keeping it simple */}
                                            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                                                <Package className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white font-medium">{item.product_name}</h4>
                                            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-medium">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Shipping Address</h3>
                                    <p className="text-white font-medium">{order.shipping_name}</p>
                                    <p className="text-gray-300">{order.shipping_address_line1}</p>
                                    {order.shipping_address_line2 && <p className="text-gray-300">{order.shipping_address_line2}</p>}
                                    <p className="text-gray-300">{order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}</p>
                                    <p className="text-gray-300">{order.shipping_country}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(order.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Shipping</span>
                                        <span>{formatPrice(order.shipping)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Tax</span>
                                        <span>{formatPrice(order.tax)}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-3 flex justify-between text-xl font-bold text-white">
                                        <span>Total</span>
                                        <span>{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animate-delay-200">
                        <Link href={ROUTES.HOME}>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                <Home className="w-4 h-4 mr-2" /> Return Home
                            </Button>
                        </Link>
                        <Link href={ROUTES.PRODUCTS}>
                            <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 border-0">
                                Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
