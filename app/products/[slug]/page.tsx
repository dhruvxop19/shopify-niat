import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/product/AddToCartButton'
import { Star, Truck, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'

interface ProductPageProps {
    params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: product } = await supabase
        .from('products')
        .select(`
      *,
      product_images (*),
      categories (name, slug)
    `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

    if (!product) {
        notFound()
    }

    const images = (product.product_images as any[]) || []
    const primaryImage = images.find((img: any) => img.is_primary) || images[0]

    return (
        <div className="min-h-screen pt-10 pb-20">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link href={ROUTES.HOME} className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={ROUTES.PRODUCTS} className="hover:text-white transition-colors">Products</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href={ROUTES.CATEGORY((product.categories as any)?.slug)} className="hover:text-white transition-colors">
                        {(product.categories as any)?.name}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-white truncate max-w-[200px]">{product.name}</span>
                </div>

                <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="bg-gray-800/50 p-8 lg:p-12 flex items-center justify-center relative">
                            <div className="aspect-square w-full max-w-lg relative rounded-2xl overflow-hidden shadow-2xl">
                                {primaryImage?.image_url && (
                                    <img
                                        src={primaryImage.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {product.compare_at_price && product.compare_at_price > product.price && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-10">
                                        SALE
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-8 lg:p-12 flex flex-col bg-[#0f172a]/80 backdrop-blur-sm">
                            <div className="text-sm text-indigo-400 font-bold mb-3 uppercase tracking-wider">
                                {(product.categories as any)?.name}
                            </div>

                            <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-white leading-tight">{product.name}</h1>

                            {/* Rating */}
                            {product.rating_average > 0 && (
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="font-bold text-white">
                                            {product.rating_average.toFixed(1)}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-400">
                                        Based on {product.rating_count} reviews
                                    </span>
                                </div>
                            )}

                            {/* Price */}
                            <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-end gap-4 mb-2">
                                    <p className="text-5xl font-bold text-white">
                                        {formatPrice(product.price)}
                                    </p>
                                    {product.compare_at_price && product.compare_at_price > product.price && (
                                        <div className="mb-2">
                                            <p className="text-xl text-gray-500 line-through">
                                                {formatPrice(product.compare_at_price)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {product.compare_at_price && product.compare_at_price > product.price && (
                                    <p className="text-green-400 text-sm font-medium">
                                        You save {formatPrice(product.compare_at_price - product.price)} ({Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%)
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold mb-3 text-white">Description</h2>
                                <p className="text-gray-400 leading-relaxed text-lg">
                                    {product.description || product.short_description}
                                </p>
                            </div>

                            {/* Stock Status */}
                            <div className="mb-8">
                                {product.inventory_quantity > 0 ? (
                                    <div className="flex items-center gap-2 text-green-400 font-medium bg-green-500/10 px-3 py-1.5 rounded-lg w-fit border border-green-500/20">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        In Stock ({product.inventory_quantity} available)
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-400 font-medium bg-red-500/10 px-3 py-1.5 rounded-lg w-fit border border-red-500/20">
                                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                        Out of Stock
                                    </div>
                                )}
                            </div>

                            {/* Add to Cart */}
                            <div className="mt-auto">
                                <AddToCartButton productId={product.id} disabled={product.inventory_quantity === 0} />
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                                <div className="text-center">
                                    <div className="w-10 h-10 mx-auto mb-2 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs text-gray-400">Fast Delivery</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-10 h-10 mx-auto mb-2 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs text-gray-400">Secure Payment</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-10 h-10 mx-auto mb-2 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400">
                                        <RefreshCw className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs text-gray-400">Easy Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
