'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import CartSidebar from './CartSidebar'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const { totalItems, setIsCartOpen } = useCart()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { href: '/', label: 'Accueil' },
        { href: '/vetements', label: 'Nos vêtements', hasDropdown: true },
        { href: '/accessoires', label: 'Nos accessoires' },
        { href: '/a-propos', label: 'Notre histoire' },
    ]

    const collections = [
        {
            id: 'nouvelle-renaissance',
            name: 'Nouvelle Renaissance',
            camoImage: '/images/camo-pink.svg'
        },
        {
            id: 'souvenir-bleu',
            name: 'Souvenir Bleu',
            camoImage: '/images/camo-blue.svg'
        },
        {
            id: 'floraison',
            name: 'Floraison',
            camoImage: '/images/camo-green.svg'
        },
    ]

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm'
                    : 'py-4 bg-white'
                    }`}
            >
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                    <div className="flex items-center justify-between">

                        {/* Left - Logo */}
                        <Link href="/" className="text-2xl font-bold tracking-tight uppercase">
                            Lésion
                        </Link>

                        {/* Center - Navigation Links */}
                        <nav className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

                                if (link.hasDropdown) {
                                    return (
                                        <div key={link.href} className="relative group">
                                            <Link
                                                href={link.href}
                                                className={`relative text-sm font-medium transition-colors pb-1 flex items-center gap-1 ${isActive
                                                    ? 'text-black'
                                                    : 'text-neutral-700 hover:text-black'
                                                    }`}
                                            >
                                                {link.label}
                                                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                                <span
                                                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'
                                                        }`}
                                                />
                                            </Link>
                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                                <div className="bg-white rounded-xl shadow-xl border border-neutral-100 py-2 min-w-[240px] overflow-hidden">
                                                    <Link
                                                        href="/vetements"
                                                        className="block px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-black transition-colors"
                                                    >
                                                        Toutes les collections
                                                    </Link>
                                                    <div className="h-px bg-neutral-100 mx-3 my-1" />
                                                    {collections.map((collection) => (
                                                        <Link
                                                            key={collection.id}
                                                            href={`/vetements?collection=${collection.id}`}
                                                            className="block px-4 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-md mx-2 my-1 rounded-lg"
                                                            style={{
                                                                backgroundImage: `url(${collection.camoImage})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                textShadow: '0 1px 4px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.3)'
                                                            }}
                                                        >
                                                            {collection.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative text-sm font-medium transition-colors pb-1 ${isActive
                                            ? 'text-black'
                                            : 'text-neutral-700 hover:text-black'
                                            }`}
                                    >
                                        {link.label}
                                        <span
                                            className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                                }`}
                                        />
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Right - Actions */}
                        <div className="flex items-center gap-6">
                            {/* Account */}
                            <Link
                                href="/compte"
                                className="hidden lg:flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-black transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>Compte</span>
                            </Link>

                            {/* Cart */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-black transition-colors"
                            >
                                <div className="relative">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className={`absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full transition-transform ${totalItems > 0 ? 'scale-100' : 'scale-0'}`}>
                                        {totalItems}
                                    </span>
                                </div>
                                <span className="hidden lg:inline">Panier</span>
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="lg:hidden w-10 h-10 flex items-center justify-center"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Menu"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <motion.span
                                        className="block w-6 h-0.5 bg-black"
                                        animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                    />
                                    <motion.span
                                        className="block w-6 h-0.5 bg-black"
                                        animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                    />
                                    <motion.span
                                        className="block w-6 h-0.5 bg-black"
                                        animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-white pt-24"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <nav className="flex flex-col p-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {(() => {
                                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                                        return (
                                            <>
                                                <Link
                                                    href={link.href}
                                                    className={`block py-4 text-2xl font-medium border-b ${isActive
                                                        ? 'text-black border-black'
                                                        : 'text-neutral-600 border-neutral-100'
                                                        }`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </Link>
                                                {link.hasDropdown && (
                                                    <div className="pl-4 border-l-2 border-neutral-100 ml-2 mb-2">
                                                        {collections.map((col) => (
                                                            <Link
                                                                key={col.id}
                                                                href={`/vetements?collection=${col.id}`}
                                                                className="block py-2 text-base text-neutral-500 hover:text-black transition-colors"
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                            >
                                                                {col.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )
                                    })()}
                                </motion.div>
                            ))}
                            <div className="mt-8 space-y-4">
                                <Link href="/compte" className="flex items-center gap-3 text-lg text-neutral-600">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Mon compte
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
            <CartSidebar />
        </>
    )
}
