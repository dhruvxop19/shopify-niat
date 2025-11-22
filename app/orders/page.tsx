'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { createClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants'
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

interface Order {
    id: string
    order_number: string
    status: string
    total: number
    created_at: string
    order_items: {
        product_name: string
        quantity: number
        price: number
    }[]
}

export default function OrdersPage() {
    const { user } = useAuthStore()
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            router.push(ROUTES.LOGIN + '?redirect=/orders')
            return
        }

        loadOrders()
    }, [user, router])

    const loadOrders = async () => {
        if (!user) return

        const supabase = createClient()
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (
          product_name,
          quantity,
          price
        )
      `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (!error && data) {
            setOrders(data as Order[])
        }
        setIsLoading(false)
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />
            case 'processing':
                return <Package className="w-5 h-5 text-blue-500" />
            case 'shipped':
                return <Truck className="w-5 h-5 text-purple-500" />
            case 'delivered':
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-500" />
            default:
                return <Package className="w-5 h-5 text-gray-500" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
            case 'processing':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
            case 'shipped':
                return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
            case 'delivered':
                return 'bg-green-500/10 text-green-500 border-green-500/20'
            case 'cancelled':
                return 'bg-red-500/10 text-red-500 border-red-500/20'
            default:
                return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black pt-24 pb-12 flex items-center justify-center">
                <div className="text-white">Loading orders...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>

                    {orders.length === 0 ? (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
                            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-white mb-2">No orders yet</h2>
                            <p className="text-gray-400 mb-6">Start shopping to see your orders here!</p>
                            <Link
                                href={ROUTES.PRODUCTS}
                                className="inline-block px-6 py-3 bg-[#008060] hover:bg-[#006e52] text-white rounded-lg font-medium transition-colors"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-[#008060]/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                {getStatusIcon(order.status)}
                                                <h3 className="text-lg font-semibold text-white">
                                                    Order #{order.order_number}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-white mb-2">
                                                {formatPrice(order.total)}
                                            </div>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t border-zinc-800 pt-4">
                                        <h4 className="text-sm font-medium text-gray-400 mb-3">Items:</h4>
                                        <div className="space-y-2">
                                            {order.order_items.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span className="text-gray-300">
                                                        {item.quantity}x {item.product_name}
                                                    </span>
                                                    <span className="text-white font-medium">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-zinc-800">
                                        <Link
                                            href={`/checkout/success/${order.id}`}
                                            className="text-[#008060] hover:text-[#00b386] text-sm font-medium transition-colors"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
