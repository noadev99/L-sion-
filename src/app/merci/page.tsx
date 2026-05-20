'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'

export default function MerciPage() {
    const { clearCart } = useCart()
    const [cleared, setCleared] = useState(false)

    // Clear the cart after successful payment
    useEffect(() => {
        if (!cleared) {
            clearCart()
            setCleared(true)
        }
    }, [cleared, clearCart])

    return (
        <>
            <Header />

            <main className="pt-20 min-h-screen bg-white flex items-center justify-center">
                <div className="max-w-2xl mx-auto px-6 py-20 text-center">

                    {/* Success Icon */}
                    <motion.div
                        className="w-24 h-24 mx-auto mb-8 bg-green-50 rounded-full flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    >
                        <motion.svg
                            className="w-12 h-12 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                            />
                        </motion.svg>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Merci pour votre commande !
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl text-neutral-600 mb-4 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Votre paiement a été confirmé avec succès.
                    </motion.p>

                    <motion.p
                        className="text-neutral-500 mb-10 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Vous recevrez un email de confirmation avec les détails de votre commande et le suivi de livraison. Votre commande sera préparée et expédiée dans les plus brefs délais.
                    </motion.p>

                    {/* Divider */}
                    <motion.div
                        className="w-16 h-px bg-neutral-200 mx-auto mb-10"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6 }}
                    />

                    {/* Order Info Cards */}
                    <motion.div
                        className="grid sm:grid-cols-3 gap-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="bg-neutral-50 rounded-2xl p-6">
                            <div className="w-10 h-10 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium mb-1">Confirmation</p>
                            <p className="text-xs text-neutral-500">Par email dans quelques minutes</p>
                        </div>
                        <div className="bg-neutral-50 rounded-2xl p-6">
                            <div className="w-10 h-10 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium mb-1">Préparation</p>
                            <p className="text-xs text-neutral-500">Sous 24 à 48h ouvrées</p>
                        </div>
                        <div className="bg-neutral-50 rounded-2xl p-6">
                            <div className="w-10 h-10 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium mb-1">Livraison</p>
                            <p className="text-xs text-neutral-500">Gratuite en France</p>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Link
                            href="/vetements"
                            className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-all hover:scale-105"
                        >
                            Continuer le shopping
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-4 bg-transparent text-black font-medium rounded-full border-2 border-neutral-200 hover:border-black transition-all"
                        >
                            Retour à l'accueil
                        </Link>
                    </motion.div>

                    {/* Brand Touch */}
                    <motion.p
                        className="mt-16 text-sm text-neutral-400 uppercase tracking-[0.3em]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        LÉSION — Merci de votre confiance
                    </motion.p>
                </div>
            </main>

            <Footer />
        </>
    )
}
