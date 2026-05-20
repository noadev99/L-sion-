'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'

const trackingSteps = [
    { icon: '✓', label: 'Confirmée', desc: 'Paiement reçu', active: true },
    { icon: '📦', label: 'En préparation', desc: 'Sous 24-48h', active: true },
    { icon: '🚚', label: 'Expédiée', desc: 'Suivi par email', active: false },
    { icon: '🏠', label: 'Livrée', desc: 'Chez vous', active: false },
]

export default function MerciPage() {
    const { clearCart } = useCart()
    const [cleared, setCleared] = useState(false)
    const [truckPosition, setTruckPosition] = useState(0)

    // Clear the cart after successful payment
    useEffect(() => {
        if (!cleared) {
            clearCart()
            setCleared(true)
        }
    }, [cleared, clearCart])

    // Animate truck
    useEffect(() => {
        const interval = setInterval(() => {
            setTruckPosition(prev => {
                if (prev >= 35) return 35
                return prev + 0.5
            })
        }, 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <Header />

            <main className="pt-20 min-h-screen bg-white">
                <div className="max-w-3xl mx-auto px-6 py-16">

                    {/* Success Icon */}
                    <motion.div
                        className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    >
                        <motion.svg
                            className="w-10 h-10 text-green-500"
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
                        className="text-3xl lg:text-4xl font-bold mb-3 tracking-tight text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Merci pour votre commande !
                    </motion.h1>

                    <motion.p
                        className="text-neutral-500 mb-10 text-center max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Votre paiement a été confirmé. Un email de confirmation vous a été envoyé.
                    </motion.p>

                    {/* === TRACKING TIMELINE === */}
                    <motion.div
                        className="bg-neutral-50 rounded-3xl p-8 lg:p-10 mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-8 text-center">
                            Suivi de votre commande
                        </h2>

                        {/* Steps */}
                        <div className="relative">
                            {/* Progress bar background */}
                            <div className="absolute top-6 left-[12%] right-[12%] h-[3px] bg-neutral-200 rounded-full" />
                            
                            {/* Progress bar filled */}
                            <motion.div
                                className="absolute top-6 left-[12%] h-[3px] bg-black rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: '28%' }}
                                transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                            />

                            {/* Animated truck on the progress bar */}
                            <motion.div
                                className="absolute top-[14px] text-xl z-10"
                                initial={{ left: '12%', opacity: 0 }}
                                animate={{ left: `${12 + truckPosition}%`, opacity: 1 }}
                                transition={{ opacity: { delay: 0.8, duration: 0.3 } }}
                            >
                                🚛
                            </motion.div>

                            <div className="relative flex justify-between">
                                {trackingSteps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex flex-col items-center text-center flex-1"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + i * 0.15 }}
                                    >
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg mb-3 relative z-10 
                                                ${step.active 
                                                    ? 'bg-black text-white shadow-lg shadow-black/20' 
                                                    : 'bg-neutral-200 text-neutral-400'
                                                }`}
                                        >
                                            {step.icon}
                                        </div>
                                        <p className={`text-xs font-semibold uppercase tracking-wide mb-1 
                                            ${step.active ? 'text-black' : 'text-neutral-400'}`}>
                                            {step.label}
                                        </p>
                                        <p className={`text-[11px] ${step.active ? 'text-neutral-500' : 'text-neutral-300'}`}>
                                            {step.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Info Cards */}
                    <motion.div
                        className="grid sm:grid-cols-2 gap-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📬</span>
                                <div>
                                    <h3 className="font-semibold text-sm mb-1 text-green-900">Email de confirmation envoyé</h3>
                                    <p className="text-xs text-green-700 leading-relaxed">
                                        Vérifiez votre boîte mail (et les spams). Vous avez reçu le récapitulatif de votre commande.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📦</span>
                                <div>
                                    <h3 className="font-semibold text-sm mb-1 text-blue-900">Suivi du colis</h3>
                                    <p className="text-xs text-blue-700 leading-relaxed">
                                        Vous recevrez un email avec le numéro de suivi dès que votre colis sera expédié.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <Link
                            href="/vetements"
                            className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-all hover:scale-105 text-center"
                        >
                            Continuer le shopping
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-4 bg-transparent text-black font-medium rounded-full border-2 border-neutral-200 hover:border-black transition-all text-center"
                        >
                            Retour à l'accueil
                        </Link>
                    </motion.div>

                    {/* Brand Touch */}
                    <motion.p
                        className="mt-14 text-sm text-neutral-400 uppercase tracking-[0.3em] text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        LÉSION — Merci de votre confiance
                    </motion.p>
                </div>
            </main>

            <Footer />
        </>
    )
}
