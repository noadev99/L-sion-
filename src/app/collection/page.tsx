'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const products = [
    { id: 'veste-memoire', name: 'Veste Mémoire', price: '280 €', category: 'Vestes', tag: 'Nouveau' },
    { id: 'tshirt-trace', name: 'T-shirt Trace', price: '85 €', category: 'T-shirts', tag: null },
    { id: 'hoodie-refuge', name: 'Hoodie Refuge', price: '145 €', category: 'Sweats', tag: null },
    { id: 'pantalon-resonance', name: 'Pantalon Résonance', price: '190 €', category: 'Pantalons', tag: 'Best-seller' },
    { id: 'chemise-petale', name: 'Chemise Pétale', price: '165 €', category: 'Chemises', tag: null },
    { id: 'casquette-eclat', name: 'Casquette Éclat', price: '55 €', category: 'Accessoires', tag: 'Édition limitée' },
    { id: 'tote-bag-fragment', name: 'Tote Bag Fragment', price: '45 €', category: 'Accessoires', tag: null },
    { id: 'tshirt-silence', name: 'T-shirt Silence', price: '75 €', category: 'T-shirts', tag: null },
    { id: 'manteau-nuit', name: 'Manteau Nuit', price: '420 €', category: 'Vestes', tag: 'Premium' },
]

const categories = ['Tout', 'Vestes', 'T-shirts', 'Pantalons', 'Accessoires']

export default function CollectionPage() {
    return (
        <>
            <Header />

            {/* Hero Banner */}
            <section className="pt-20 bg-neutral-100">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold mb-4">Collection</h1>
                        <p className="text-lg text-neutral-600 max-w-xl">
                            Découvrez toutes nos pièces. Des vêtements qui racontent une histoire.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-16 z-30 bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${cat === 'Tout'
                                            ? 'bg-black text-white'
                                            : 'bg-neutral-100 text-black hover:bg-neutral-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <span className="text-sm text-neutral-500">{products.length} articles</span>
                            <select className="px-4 py-2 text-sm bg-neutral-100 rounded-full border-0 focus:outline-none">
                                <option>Trier par</option>
                                <option>Prix croissant</option>
                                <option>Prix décroissant</option>
                                <option>Nouveautés</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                        {products.map((product, i) => (
                            <motion.article
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/collection/${product.id}`} className="group block">
                                    <div className="relative aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden mb-4">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-6xl font-bold text-neutral-300">{product.name.charAt(0)}</span>
                                        </div>
                                        {product.tag && (
                                            <span className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                                                {product.tag}
                                            </span>
                                        )}
                                        {/* Quick action */}
                                        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <button className="w-full py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-neutral-100 transition-colors">
                                                Aperçu rapide
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-500 mb-1">{product.category}</p>
                                        <h3 className="font-medium text-black group-hover:underline">{product.name}</h3>
                                        <p className="text-neutral-600">{product.price}</p>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Load More */}
            <section className="py-12 text-center">
                <button className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors">
                    Voir plus
                </button>
            </section>

            <Footer />
        </>
    )
}
