'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { accessoires, bobs } from '@/data/products'

const categories = ['Tout', 'Bobs', 'Casquettes', 'Bonnets', 'Box']

// Map filter label to product category value
const categoryMap: Record<string, string | null> = {
    'Tout': null,
    'Bobs': 'Bob',
    'Casquettes': 'Casquette',
    'Bonnets': 'Bonnet',
    'Box': 'Box',
}

export default function AccessoiresPage() {
    const [activeCategory, setActiveCategory] = useState('Tout')
    const [sortOption, setSortOption] = useState('default')

    const filteredProducts = useMemo(() => {
        const catValue = categoryMap[activeCategory]
        let products = catValue
            ? accessoires.filter(p => p.category === catValue)
            : accessoires

        switch (sortOption) {
            case 'price-asc':
                return [...products].sort((a, b) => {
                    const priceA = parseFloat(a.price.replace(' €', '').replace(',', '.'))
                    const priceB = parseFloat(b.price.replace(' €', '').replace(',', '.'))
                    return priceA - priceB
                })
            case 'price-desc':
                return [...products].sort((a, b) => {
                    const priceA = parseFloat(a.price.replace(' €', '').replace(',', '.'))
                    const priceB = parseFloat(b.price.replace(' €', '').replace(',', '.'))
                    return priceB - priceA
                })
            case 'availability':
                return [...products].sort((a, b) => {
                    if (a.inStock && !b.inStock) return -1
                    if (!a.inStock && b.inStock) return 1
                    return 0
                })
            default:
                return products
        }
    }, [activeCategory, sortOption])

    // Show the bobs featured section only on "Tout" or "Bobs"
    const showBobsSection = activeCategory === 'Tout' || activeCategory === 'Bobs'

    // For the bottom grid, when "Bobs" is selected we already show them in the featured section,
    // so the grid shows the same filtered list. When "Tout", the grid shows everything.
    const gridProducts = filteredProducts

    return (
        <>
            <Header />

            {/* Hero */}
            <section className="pt-24 pb-12 bg-white">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Nos accessoires</h1>
                        <p className="text-lg text-neutral-600 max-w-xl">
                            Complétez votre style avec nos accessoires uniques, conçus avec le même soin que nos vêtements.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-16 z-30 bg-white border-b border-neutral-200">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                    <div className="flex items-center justify-between py-4 overflow-x-auto">
                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${activeCategory === cat
                                        ? 'bg-black text-white'
                                        : 'bg-neutral-100 text-black hover:bg-neutral-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="hidden lg:flex items-center gap-4">
                            <span className="text-sm text-neutral-500">{filteredProducts.length} article{filteredProducts.length > 1 ? 's' : ''}</span>
                            <select
                                className="px-4 py-2 text-sm bg-neutral-100 rounded-full border-0 focus:outline-none cursor-pointer"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="default">Trier par</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                                <option value="availability">Disponibilité</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nouveaux Bobs - Section dédiée (visible on Tout or Bobs) */}
            <AnimatePresence>
                {showBobsSection && (
                    <motion.section
                        key="bobs-section"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden bg-white"
                    >
                        <div className="py-16">
                            <div className="max-w-[1800px] mx-auto px-6 lg:px-10">

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                    {bobs.map((bob, i) => {
                                        const accents: Record<string, string> = {
                                            'bob-bleu-marine': '#1e3a5f',
                                            'bob-kaki': '#5c6b3c',
                                            'bob-noir': '#1a1a1a',
                                        }
                                        const accent = accents[bob.id] || '#000'
                                        return (
                                            <motion.article
                                                key={bob.id}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <Link href={`/accessoires/${bob.id}`} className="group block">
                                                    <div
                                                        className="relative aspect-square bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2"
                                                        style={{ borderBottomColor: accent, borderBottomWidth: '3px' }}
                                                    >
                                                        <Image
                                                            src={bob.images[0]}
                                                            alt={bob.name}
                                                            fill
                                                            className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <span
                                                            className="absolute top-5 left-5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full text-white"
                                                            style={{ backgroundColor: accent }}
                                                        >
                                                            Nouveau
                                                        </span>
                                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                            <button className="w-full py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-100 transition-colors shadow-lg">
                                                                Voir le produit
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 text-center">
                                                        <p className="text-xs text-neutral-400 mb-1">{bob.collectionName}</p>
                                                        <h3 className="text-lg font-bold text-black group-hover:underline decoration-1 underline-offset-4">{bob.name}</h3>
                                                        <p className="text-neutral-500 mt-1">{bob.price}</p>
                                                    </div>
                                                </Link>
                                            </motion.article>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Divider - only when showing all */}
                        {activeCategory === 'Tout' && (
                            <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                                <hr className="border-neutral-200" />
                            </div>
                        )}
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Products Grid - shows filtered results (skip bobs when Bobs filter since they're in featured section) */}
            <section className="py-12 bg-neutral-50">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                    {/* When Bobs filter is active, the featured section above already shows them, so hide grid */}
                    {activeCategory === 'Bobs' ? (
                        null
                    ) : gridProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-lg text-neutral-600">Aucun accessoire dans cette catégorie.</p>
                            <button
                                onClick={() => setActiveCategory('Tout')}
                                className="mt-4 inline-block text-black underline"
                            >
                                Voir tous les accessoires
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                            {gridProducts.map((product, i) => (
                                <motion.article
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.03 }}
                                    layout
                                >
                                    <Link href={`/accessoires/${product.id}`} className="group block">
                                        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-4 border border-neutral-100">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {product.tag && (
                                                <span className={`absolute top-4 left-4 px-3 py-1.5 text-white text-xs font-medium rounded-full ${
                                                    product.inStock ? 'bg-green-600' : 'bg-red-600'
                                                }`}>
                                                    {product.tag}
                                                </span>
                                            )}
                                            <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                <button className="w-full py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-100 transition-colors shadow-lg">
                                                    Aperçu rapide
                                                </button>
                                            </div>
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
                    )}
                </div>
            </section>

            <Footer />
        </>
    )
}
