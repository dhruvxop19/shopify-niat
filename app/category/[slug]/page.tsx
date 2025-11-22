import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

interface CategoryPageProps {
    params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params
    const supabase = await createClient()

    // Get category
    const { data: category } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

    if (!category) {
        notFound()
    }

    // Get products in this category
    const { data: products } = await supabase
        .from('products')
        .select(`
      *,
      product_images (*)
    `)
        .eq('category_id', category.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-black pt-24 pb-20">
            {/* Category Header */}
            <div className="container mx-auto px-4 mb-12">
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden">
                    <h1 className="text-4xl font-bold mb-3 text-white">{category.name}</h1>
                    {category.description && (
                        <p className="text-gray-400 max-w-2xl">{category.description}</p>
                    )}
                    <p className="text-sm text-[#008060] mt-4 font-medium inline-flex items-center px-3 py-1 rounded-full bg-[#008060]/10 border border-[#008060]/20">
                        {products?.length || 0} products found
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4">
                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => {
                            const primaryImage = (product.product_images as any[])?.find(
                                (img: any) => img.is_primary
                            ) || (product.product_images as any[])?.[0]

                            return (
                                <Link
                                    key={product.id}
                                    href={ROUTES.PRODUCT_DETAIL(product.slug)}
                                    className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-[#008060]/50 transition-all duration-300 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="aspect-square bg-zinc-800 relative overflow-hidden">
                                        {primaryImage?.image_url && (
                                            <Image
                                                src={primaryImage.image_url}
                                                alt={product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
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

                                        <Button size="sm" className="w-full rounded-lg bg-[#008060] hover:bg-[#006e52] text-white border-0">
                                            View Details
                                        </Button>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-2xl border-dashed border-2">
                        <p className="text-gray-400 text-lg">No products found in this category.</p>
                        <Link href={ROUTES.PRODUCTS} className="text-[#008060] hover:text-[#00b386] mt-4 inline-block font-medium">
                            Browse all products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
