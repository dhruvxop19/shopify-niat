import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import { Facebook, Twitter, Instagram, Github } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-[#020617] border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">S</span>
                            </div>
                            <span className="text-xl font-bold text-white">{APP_NAME}</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your premium destination for quality products. Experience the future of online shopping with us.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Shop</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/products" className="hover:text-indigo-400 transition-colors">All Products</Link></li>
                            <li><Link href="/category/electronics" className="hover:text-indigo-400 transition-colors">Electronics</Link></li>
                            <li><Link href="/category/clothing" className="hover:text-indigo-400 transition-colors">Clothing</Link></li>
                            <li><Link href="/category/books" className="hover:text-indigo-400 transition-colors">Books</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/account" className="hover:text-indigo-400 transition-colors">My Account</Link></li>
                            <li><Link href="/account/orders" className="hover:text-indigo-400 transition-colors">Order History</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for latest updates and offers.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
                            />
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
