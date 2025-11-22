import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default async function ProductsPage() {
    const supabase = await createClient()

    const { data: products } = await supabase
        .from('products')
        .select(`
      *,
      product_images (*),
      categories (name, slug)
    `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen pt-10 pb-20">
            {/* Header */}
            <div className="container mx-auto px-4 mb-12">
                <div className="glass-card p-8 rounded-2xl bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-white/5">
                    <h1 className="text-4xl font-bold mb-3 text-white">All Products</h1>
                    <p className="text-gray-400">Browse our complete collection of premium items</p>
                    <p className="text-sm text-indigo-400 mt-2 font-medium">
                        {products?.length || 0} products available
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products?.map((product, index) => {
                        const primaryImage = (product.product_images as any[])?.find(
                            (img: any) => img.is_primary
                        )

                        return (
                            <Link
                                key={product.id}
                                href={ROUTES.PRODUCT_DETAIL(product.slug)}
                                className="group glass-card rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="aspect-square bg-gray-800 relative overflow-hidden">
                                    {primaryImage?.image_url && (
                                        <img
                                            src={primaryImage.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {product.compare_at_price && product.compare_at_price > product.price && (
                                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                                            SALE
                                        </div>
                                    )}
                                </div>

                                <div className="p-5">
                                    <div className="text-xs text-indigo-400 font-medium mb-2 uppercase tracking-wider">
                                        {(product.categories as any)?.name}
                                    </div>

                                    <h3 className="font-semibold mb-2 text-gray-200 group-hover:text-white transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-white">
                                                {formatPrice(product.price)}
                                            </span>
                                            {product.compare_at_price && product.compare_at_price > product.price && (
                                                <span className="text-sm text-gray-500 line-through">
                                                    {formatPrice(product.compare_at_price)}
                                                </span>
                                            )}
                                        </div>

                                        {product.rating_average > 0 && (
                                            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                <span className="text-xs font-medium text-gray-300">
                                                    {product.rating_average.toFixed(1)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <Button size="sm" className="w-full rounded-lg bg-white/10 hover:bg-indigo-600 text-white border-0">
                                        View Details
                                    </Button>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
