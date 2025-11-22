import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartSidebar from '@/components/cart/CartSidebar'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: {
    template: '%s | Shopify',
    default: 'Shopify - The Future of Commerce',
  },
  description: APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-indigo-500 selection:text-white`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black"></div>
        <Header />
        <main className="flex-1 relative">{children}</main>
        <Footer />
        <CartSidebar />
      </body>
    </html>
  )
}
