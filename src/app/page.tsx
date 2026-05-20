'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { allProducts, vetements, accessoires } from '@/data/products'

// Featured products for hero section - Floraison collection
const featuredCollection = allProducts.filter(p => p.collection === 'floraison')

export default function Home() {
    return (
        <>
            <Header />

            {/* Hero - Nouveaux Bobs Été */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
                {/* Subtle summer gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-white to-sky-50/30 pointer-events-none" />

                <div className="max-w-[1800px] mx-auto px-6 lg:px-10 w-full pt-28 pb-16 relative z-10">
                    {/* Top Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm uppercase tracking-[0.3em] text-neutral-400 mb-6">
                            Collection Été 2026
                        </p>
                        <h1 className="text-5xl sm:text-6xl lg:text-[7rem] font-bold text-black leading-none mb-6 tracking-tighter">
                            Nouveau<span className="italic">x</span> B<span className="italic">o</span>bs
                        </h1>
                        <p className="text-lg lg:text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed">
                            L'essentiel de l'été. Trois coloris pensés pour sublimer chaque tenue, du lever au coucher du soleil.
                        </p>
                    </motion.div>

                    {/* 3 Bob Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-14">
                        {[
                            { name: 'Bob Bleu Marine', color: 'Bleu', img: '/images/bob-bleu.png', accent: '#1e3a5f', href: '/accessoires' },
                            { name: 'Bob Kaki', color: 'Kaki', img: '/images/bob-kaki.png', accent: '#5c6b3c', href: '/accessoires' },
                            { name: 'Bob Noir', color: 'Noir', img: '/images/bob-noir.png', accent: '#1a1a1a', href: '/accessoires' },
                        ].map((bob, i) => (
                            <motion.div
                                key={bob.color}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                            >
                                <Link href={bob.href} className="group block">
                                    <div
                                        className="relative aspect-square bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2"
                                        style={{ borderBottomColor: bob.accent, borderBottomWidth: '3px' }}
                                    >
                                        {/* Product Image */}
                                        <div className="absolute inset-0 flex items-center justify-center p-6">
                                            <Image
                                                src={bob.img}
                                                alt={bob.name}
                                                fill
                                                className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Tag */}
                                        <div className="absolute top-5 left-5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full text-white"
                                            style={{ backgroundColor: bob.accent }}
                                        >
                                            Nouveau
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="mt-5 text-center">
                                        <h3 className="text-lg font-bold text-black group-hover:underline decoration-1 underline-offset-4">{bob.name}</h3>
                                        <p className="text-neutral-500 text-sm mt-1">25 €</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="flex flex-wrap gap-5 justify-center"
                    >
                        <Link
                            href="/accessoires"
                            className="px-10 py-5 bg-black text-white font-bold rounded-full hover:bg-neutral-800 transition-all hover:scale-105"
                        >
                            Découvrir les bobs
                        </Link>
                        <Link
                            href="/vetements"
                            className="px-10 py-5 bg-transparent text-black font-bold rounded-full border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                            Toute la collection
                        </Link>
                    </motion.div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 pointer-events-none opacity-[0.02]">
                    <span className="text-[40vw] font-black select-none">LÉSION</span>
                </div>
            </section>

            {/* Featured Collection - Toy Packaging Style */}
            <section className="py-24 bg-neutral-100">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-sm uppercase tracking-widest text-neutral-500 mb-2">Dernière collection</p>
                            <h2 className="text-3xl lg:text-4xl font-bold">Floraison</h2>
                        </div>
                        <Link href="/vetements" className="text-sm font-medium underline hover:no-underline">
                            Voir tout →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredCollection.map((product, i) => (
                            <motion.article
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <Link href={`/vetements/${product.id}`} className="block">
                                    {/* Toy Packaging Frame */}
                                    <div className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden">
                                        {/* Product Image */}
                                        <div className="absolute inset-0 flex items-center justify-center p-8">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Tag */}
                                        {!product.inStock && product.tag && (
                                            <div className="absolute top-6 left-6 px-4 py-2 text-white text-xs font-medium rounded-full z-20 bg-red-600">
                                                {product.tag}
                                            </div>
                                        )}

                                        {/* Info panel at bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm z-20 border-t border-neutral-100">
                                            <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                                            <p className="text-neutral-600">{product.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nos Vêtements */}
            <section className="py-24 bg-white">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold">Nos vêtements</h2>
                        <Link href="/vetements" className="text-sm font-medium underline hover:no-underline">
                            Voir tout →
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {vetements.map((product, i) => (
                            <motion.article
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/vetements/${product.id}`} className="group block">
                                    <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-4 border border-neutral-100">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {!product.inStock && product.tag && (
                                            <span className="absolute top-4 left-4 px-3 py-1.5 text-white text-xs font-medium rounded-full bg-red-600">
                                                {product.tag}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-500 mb-1">{product.collectionName}</p>
                                        <h3 className="font-medium group-hover:underline">{product.name}</h3>
                                        <p className="text-neutral-600">{product.price}</p>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nos Accessoires */}
            <section className="py-24 bg-neutral-100">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold">Nos accessoires</h2>
                        <Link href="/accessoires" className="text-sm font-medium underline hover:no-underline">
                            Voir tout →
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {accessoires.map((product, i) => (
                            <motion.article
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/accessoires/${product.id}`} className="group block">
                                    <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-4 border border-neutral-100">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {!product.inStock && product.tag && (
                                            <span className="absolute top-4 left-4 px-3 py-1.5 text-white text-xs font-medium rounded-full bg-red-600">
                                                {product.tag}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-500 mb-1">{product.collectionName}</p>
                                        <h3 className="font-medium group-hover:underline">{product.name}</h3>
                                        <p className="text-neutral-600">{product.price}</p>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Banner */}
            <section className="py-20 bg-black text-white">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">Rejoignez la communauté</h2>
                    <p className="text-neutral-400 mb-8">
                        Recevez en avant-première nos nouveautés et offres exclusives.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors"
                        >
                            S'inscrire
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    )
}
