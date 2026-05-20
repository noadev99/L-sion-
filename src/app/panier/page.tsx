'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'

export default function PanierPage() {
    const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

    const handleCheckout = async () => {
        // TODO: Integrate with Stripe
        // This will create a Stripe Checkout session
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: items.map(item => ({
                        productId: item.product.id,
                        name: item.product.name,
                        price: parseFloat(item.product.price.replace(' €', '').replace(',', '.')),
                        quantity: item.quantity,
                        size: item.size,
                        image: item.product.images[0],
                    })),
                }),
            })

            const data = await response.json()

            if (data.url) {
                // Redirect to Stripe Checkout
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Checkout error:', error)
            alert('Erreur lors du paiement. Veuillez réessayer.')
        }
    }

    return (
        <>
            <Header />

            <main className="pt-20 min-h-screen bg-neutral-50">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">

                    {/* Header */}
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Votre panier</h1>
                        <p className="text-neutral-600">
                            {items.length === 0
                                ? 'Votre panier est vide'
                                : `${items.length} article${items.length > 1 ? 's' : ''} dans votre panier`
                            }
                        </p>
                    </motion.div>

                    {items.length === 0 ? (
                        /* Empty Cart */
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold mb-3">Votre panier est vide</h2>
                            <p className="text-neutral-600 mb-8">Découvrez nos collections et ajoutez vos articles préférés.</p>
                            <Link
                                href="/vetements"
                                className="inline-block px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors"
                            >
                                Découvrir nos produits
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-10">

                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                <AnimatePresence>
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={`${item.product.id}-${item.size}`}
                                            className="bg-white rounded-2xl p-6 shadow-sm"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <div className="flex gap-6">
                                                {/* Product Image */}
                                                <Link href={`/vetements/${item.product.id}`} className="shrink-0">
                                                    <div className="relative w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-xl overflow-hidden border border-neutral-100">
                                                        <Image
                                                            src={item.product.images[0]}
                                                            alt={item.product.name}
                                                            fill
                                                            className="object-contain p-2"
                                                        />
                                                    </div>
                                                </Link>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between gap-4">
                                                        <div>
                                                            <p className="text-xs text-neutral-500 mb-1">{item.product.collectionName}</p>
                                                            <Link href={`/vetements/${item.product.id}`}>
                                                                <h3 className="font-medium hover:underline">{item.product.name}</h3>
                                                            </Link>
                                                            {item.size && (
                                                                <p className="text-sm text-neutral-600 mt-1">Taille : {item.size}</p>
                                                            )}
                                                        </div>
                                                        <p className="font-medium whitespace-nowrap">{item.product.price}</p>
                                                    </div>

                                                    {/* Quantity & Remove */}
                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center gap-3 bg-neutral-100 rounded-full p-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                                </svg>
                                                            </button>
                                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.product.id, item.size)}
                                                            className="text-sm text-neutral-500 hover:text-red-600 transition-colors"
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Clear Cart */}
                                <button
                                    onClick={clearCart}
                                    className="text-sm text-neutral-500 hover:text-black transition-colors mt-4"
                                >
                                    Vider le panier
                                </button>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className="text-lg font-bold mb-6">Récapitulatif</h2>

                                    <div className="space-y-4 pb-6 border-b border-neutral-100">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Sous-total</span>
                                            <span className="font-medium">{totalPrice.toFixed(2)} €</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Livraison</span>
                                            <span className="font-medium text-green-600">Gratuite</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between py-6 border-b border-neutral-100">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-lg font-bold">{totalPrice.toFixed(2)} €</span>
                                    </div>

                                    {/* Promo Code */}
                                    <div className="py-6 border-b border-neutral-100">
                                        <label className="block text-sm font-medium mb-2">Code promo</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Entrez votre code"
                                                className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition-colors text-sm"
                                            />
                                            <button className="px-4 py-3 bg-neutral-100 rounded-xl text-sm font-medium hover:bg-neutral-200 transition-colors">
                                                Appliquer
                                            </button>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full py-4 mt-6 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Payer avec Stripe
                                    </button>

                                    {/* Security Info */}
                                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Paiement sécurisé
                                    </div>

                                    {/* Payment Methods */}
                                    <div className="mt-4 flex items-center justify-center gap-3">
                                        <div className="w-10 h-6 bg-neutral-100 rounded flex items-center justify-center text-xs font-bold text-neutral-500">VISA</div>
                                        <div className="w-10 h-6 bg-neutral-100 rounded flex items-center justify-center text-xs font-bold text-neutral-500">MC</div>
                                        <div className="w-10 h-6 bg-neutral-100 rounded flex items-center justify-center text-xs font-bold text-neutral-500">AMEX</div>
                                        <div className="w-10 h-6 bg-neutral-100 rounded flex items-center justify-center text-xs font-bold text-neutral-500">CB</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}
