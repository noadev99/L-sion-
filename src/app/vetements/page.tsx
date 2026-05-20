'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { vetements, allProducts, Product, collections } from '@/data/products'

function VetementsContent() {
    const searchParams = useSearchParams()
    const collectionFilter = searchParams.get('collection')
    const [sortOption, setSortOption] = useState<string>('default')

    // When filtering by collection, show ALL products from that collection (including accessories)
    // When showing "Tout", only show vetements
    const baseProducts = collectionFilter
        ? allProducts.filter(p => p.collection === collectionFilter)
        : vetements

    // Apply sorting
    const filteredProducts = useMemo(() => {
        const products = [...baseProducts]

        switch (sortOption) {
            case 'price-asc':
                return products.sort((a, b) => {
                    const priceA = parseFloat(a.price.replace(' €', '').replace(',', '.'))
                    const priceB = parseFloat(b.price.replace(' €', '').replace(',', '.'))
                    return priceA - priceB
                })
            case 'price-desc':
                return products.sort((a, b) => {
                    const priceA = parseFloat(a.price.replace(' €', '').replace(',', '.'))
                    const priceB = parseFloat(b.price.replace(' €', '').replace(',', '.'))
                    return priceB - priceA
                })
            case 'availability':
                // Show available products first
                return products.sort((a, b) => {
                    if (a.inStock && !b.inStock) return -1
                    if (!a.inStock && b.inStock) return 1
                    return 0
                })
            default:
                return products
        }
    }, [baseProducts, sortOption])

    // Get collection info for title
    const currentCollection = collectionFilter && collections[collectionFilter as keyof typeof collections]

    const collectionsList = [
        { id: null, name: 'Tout' },
        { id: 'nouvelle-renaissance', name: 'Nouvelle Renaissance' },
        { id: 'souvenir-bleu', name: 'Souvenir Bleu' },
        { id: 'floraison', name: 'Floraison' },
    ]

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
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            {currentCollection ? currentCollection.name : 'Nos vêtements'}
                        </h1>
                        <p className="text-lg text-neutral-600 max-w-xl">
                            {currentCollection
                                ? currentCollection.description
                                : 'Des pièces uniques qui portent une histoire. Fabriquées avec soin en France.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-16 z-30 bg-white border-b border-neutral-200">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                    <div className="flex items-center justify-between py-4 overflow-x-auto">
                        <div className="flex gap-2">
                            {collectionsList.map((col) => {
                                const isActive = collectionFilter === col.id || (!collectionFilter && col.id === null)
                                return (
                                    <Link
                                        key={col.id || 'all'}
                                        href={col.id ? `/vetements?collection=${col.id}` : '/vetements'}
                                        className={`px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${isActive
                                            ? 'bg-black text-white'
                                            : 'bg-neutral-100 text-black hover:bg-neutral-200'
                                            }`}
                                    >
                                        {col.name}
                                    </Link>
                                )
                            })}
                        </div>
                        <div className="hidden lg:flex items-center gap-4">
                            <span className="text-sm text-neutral-500">{filteredProducts.length} articles</span>
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

            {/* Products Grid */}
            <section className="py-12 bg-neutral-50">
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-lg text-neutral-600">Aucun vêtement dans cette collection.</p>
                            <Link href="/vetements" className="mt-4 inline-block text-black underline">
                                Voir tous les vêtements
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                            {filteredProducts.map((product, i) => {
                                // Configurable packs have their own page
                                const productUrl = product.isConfigurable
                                    ? `/vetements/${product.id}`
                                    : `/vetements/${product.id}`

                                return (
                                    <motion.article
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.03 }}
                                    >
                                        <Link href={productUrl} className="group block">
                                            <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-4 border border-neutral-100">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {product.isConfigurable && (
                                                    <span className="absolute top-4 left-4 px-3 py-1.5 text-white text-xs font-medium rounded-full bg-blue-600">
                                                        Personnalisable
                                                    </span>
                                                )}
                                                {!product.inStock && !product.isConfigurable && product.tag && (
                                                    <span className="absolute top-4 left-4 px-3 py-1.5 text-white text-xs font-medium rounded-full bg-red-600">
                                                        {product.tag}
                                                    </span>
                                                )}
                                                {product.sizes && product.sizes.length > 0 && (
                                                    <span className="absolute top-4 right-4 px-3 py-1.5 bg-black text-white text-xs font-medium rounded-full">
                                                        {product.sizes.join(', ')}
                                                    </span>
                                                )}
                                                <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                    <button className="w-full py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-100 transition-colors shadow-lg">
                                                        {product.isConfigurable ? 'Composer le pack' : 'Aperçu rapide'}
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-500 mb-1">{product.collectionName}</p>
                                                <h3 className="font-medium group-hover:underline">{product.name}</h3>
                                                <p className="text-neutral-600">
                                                    {product.isConfigurable ? `À partir de ${product.price}` : product.price}
                                                </p>
                                            </div>
                                        </Link>
                                    </motion.article>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    )
}

export default function VetementsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
        }>
            <VetementsContent />
        </Suspense>
    )
}
