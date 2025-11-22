'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'
import { ShoppingBag, Search, Menu, X, User, LogOut, Settings, Package } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ROUTES, APP_NAME } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const { getItemCount, toggleCart } = useCartStore()
    const { user, signOut, isAdmin } = useAuthStore()
    const router = useRouter()
    const itemCount = getItemCount()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSignOut = async () => {
        await signOut()
        setIsProfileOpen(false)
        router.push(ROUTES.HOME)
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
                        <div className="relative w-8 h-8">
                            <ShoppingBag className="w-8 h-8 text-[#008060]" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Shopify
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href={ROUTES.HOME} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href={ROUTES.PRODUCTS} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Products
                        </Link>
                        <Link href="/category/electronics" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Electronics
                        </Link>
                        <Link href="/category/clothing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Clothing
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        <button
                            onClick={toggleCart}
                            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {itemCount > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-[#008060] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#008060] to-[#004c3f] flex items-center justify-center text-white font-medium text-sm">
                                        {user.full_name?.[0] || user.email?.[0] || 'U'}
                                    </div>
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in-up">
                                        <div className="p-4 border-b border-white/10">
                                            <p className="text-sm font-medium text-white truncate">{user.full_name || 'User'}</p>
                                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                        </div>
                                        <div className="p-1">
                                            {isAdmin && (
                                                <Link
                                                    href="/admin"
                                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <Settings className="w-4 h-4" /> Admin Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <User className="w-4 h-4" /> Profile
                                            </Link>
                                            <Link
                                                href="/orders"
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <Package className="w-4 h-4" /> Orders
                                            </Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href={ROUTES.LOGIN}>
                                <Button variant="default" size="sm" className="hidden md:inline-flex bg-[#008060] hover:bg-[#006e52] text-white border-0">
                                    Sign In
                                </Button>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-300 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 p-4 animate-fade-in-up">
                    <nav className="flex flex-col gap-4">
                        <Link
                            href={ROUTES.HOME}
                            className="text-gray-300 hover:text-white py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href={ROUTES.PRODUCTS}
                            className="text-gray-300 hover:text-white py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            href="/category/electronics"
                            className="text-gray-300 hover:text-white py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Electronics
                        </Link>
                        <Link
                            href="/category/clothing"
                            className="text-gray-300 hover:text-white py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Clothing
                        </Link>
                        {!user && (
                            <Link
                                href={ROUTES.LOGIN}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Button className="w-full bg-[#008060]">Sign In</Button>
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}
