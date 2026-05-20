'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartSidebar() {
    const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart()

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Sidebar Container */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Votre Panier</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <p className="text-neutral-500">Votre panier est vide</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-6 text-sm font-bold underline"
                                    >
                                        Continuer mes achats
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => {
                                    const displayPrice = item.customPrice ?? parseFloat(item.product.price.replace(' €', '').replace(',', '.'))
                                    const packConfigKey = item.packConfig ? `${item.packConfig.vetement.id}-${item.packConfig.accessoire.id}` : ''

                                    return (
                                        <div key={`${item.product.id}-${item.size}-${packConfigKey}`} className="flex gap-4">
                                            <div className="relative w-20 h-20 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-100">
                                                <Image
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between gap-2">
                                                        <h3 className="text-sm font-bold leading-tight">{item.product.name}</h3>
                                                        <p className="text-sm font-medium">{displayPrice} €</p>
                                                    </div>
                                                    {item.packConfig && (
                                                        <p className="text-xs text-neutral-500 mt-1">
                                                            {item.packConfig.vetement.name} + {item.packConfig.accessoire.name}
                                                        </p>
                                                    )}
                                                    {item.size && (
                                                        <p className="text-xs text-neutral-500 mt-1">Taille: {item.size}</p>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-100 rounded-full px-2 py-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, packConfigKey)}
                                                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                            </svg>
                                                        </button>
                                                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, packConfigKey)}
                                                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id, item.size, packConfigKey)}
                                                        className="text-xs text-neutral-400 hover:text-black transition-colors"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-neutral-100 bg-neutral-50/50">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-neutral-500">Sous-total</span>
                                    <span className="text-xl font-bold">{totalPrice.toFixed(2)} €</span>
                                </div>
                                <div className="space-y-3">
                                    <Link
                                        href="/panier"
                                        onClick={() => setIsCartOpen(false)}
                                        className="block w-full py-4 bg-black text-white text-center font-bold rounded-full hover:bg-neutral-800 transition-colors"
                                    >
                                        Voir le panier
                                    </Link>
                                    <p className="text-[10px] text-center text-neutral-400">
                                        Frais de port offerts dès 100€ d'achat.
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
