import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants'
import { ArrowRight, CheckCircle, Truck, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008060]/20 border border-[#008060]/30 text-[#008060] mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[#008060] animate-pulse" />
            <span className="text-sm font-medium text-white">The Future of Commerce</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight animate-fade-in-up animate-delay-100">
            Build your dream <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008060] to-[#00b386]">business today.</span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Join millions of businesses worldwide using Shopify to sell online, offline, and everywhere in between.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            <Link href={ROUTES.PRODUCTS}>
              <Button size="lg" className="h-14 px-8 text-lg bg-[#008060] hover:bg-[#006e52] text-white border-0 rounded-full">
                Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href={ROUTES.REGISTER}>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 rounded-full">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Global Shipping",
                description: "We ship to over 200 countries with tracked delivery."
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description: "Your transactions are protected by industry-leading encryption."
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Our team is available around the clock to help you."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-black border border-white/5 hover:border-[#008060]/50 transition-colors group">
                <div className="w-12 h-12 bg-[#008060]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#008060] transition-colors">
                  <feature.icon className="w-6 h-6 text-[#008060] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Shop by Category</h2>
              <p className="text-gray-400">Explore our curated collections</p>
            </div>
            <Link href={ROUTES.PRODUCTS} className="text-[#008060] hover:text-[#00b386] font-medium flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=600', count: '120+ Products' },
              { name: 'Clothing', slug: 'clothing', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600', count: '350+ Products' },
              { name: 'Home & Garden', slug: 'home-garden', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=600', count: '80+ Products' },
              { name: 'Sports & Outdoors', slug: 'sports-outdoors', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=600', count: '200+ Products' }
            ].map((category, i) => (
              <Link
                key={i}
                href={`/category/${category.slug}`}
                className="group relative h-80 rounded-2xl overflow-hidden block"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-300">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#008060]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start shopping?</h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied customers and experience the future of online shopping today.
          </p>
          <Link href={ROUTES.REGISTER}>
            <Button size="lg" className="h-14 px-8 text-lg bg-white text-[#008060] hover:bg-gray-100 border-0 rounded-full font-bold">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
