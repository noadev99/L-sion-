'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({ name: '', email: '', message: '' })
        }, 3000)
    }

    return (
        <>
            <Header />

            <main className="pt-20 min-h-screen bg-white">

                {/* Hero */}
                <section className="bg-neutral-100 py-16 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl"
                        >
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact</h1>
                            <p className="text-lg text-neutral-600">
                                Une question, une collaboration, ou simplement envie d'échanger ? Nous sommes là.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16">

                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-2xl font-bold mb-8">Informations</h2>

                                <div className="space-y-8">
                                    <div>
                                        <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">Email</p>
                                        <a href="mailto:contact@lesion.fr" className="text-xl font-medium hover:underline">
                                            contact@lesion.fr
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">Presse & Collaborations</p>
                                        <a href="mailto:presse@lesion.fr" className="text-xl font-medium hover:underline">
                                            presse@lesion.fr
                                        </a>
                                    </div>

                                    <div>
                                        <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">Adresse</p>
                                        <p className="text-xl font-medium">Paris, France</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-neutral-500 uppercase tracking-wide mb-2">Réseaux</p>
                                        <div className="flex gap-4">
                                            <a href="#" className="text-xl font-medium hover:underline">Instagram</a>
                                            <a href="#" className="text-xl font-medium hover:underline">TikTok</a>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ preview */}
                                <div className="mt-16">
                                    <h3 className="text-xl font-bold mb-6">Questions fréquentes</h3>
                                    <div className="space-y-4">
                                        {[
                                            'Quels sont les délais de livraison ?',
                                            'Comment retourner un article ?',
                                            'Comment trouver ma taille ?',
                                        ].map((q, i) => (
                                            <a
                                                key={i}
                                                href="#"
                                                className="flex justify-between items-center py-4 border-b border-neutral-200 group"
                                            >
                                                <span className="group-hover:underline">{q}</span>
                                                <span className="text-neutral-400">→</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-2xl font-bold mb-8">Envoyez-nous un message</h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Nom complet
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-4 rounded-lg border border-neutral-300 focus:border-black focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-4 rounded-lg border border-neutral-300 focus:border-black focus:outline-none transition-colors"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-4 rounded-lg border border-neutral-300 focus:border-black focus:outline-none transition-colors resize-none"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors"
                                    >
                                        {isSubmitted ? '✓ Message envoyé' : 'Envoyer'}
                                    </button>
                                </form>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="py-16 bg-black text-white">
                    <div className="max-w-2xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Restez informé</h2>
                            <p className="text-neutral-400 mb-8">
                                Inscrivez-vous pour recevoir les dernières nouveautés et offres exclusives.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Adresse email"
                                    className="flex-1 px-6 py-4 rounded-full bg-white text-black focus:outline-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors"
                                >
                                    S'inscrire
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
