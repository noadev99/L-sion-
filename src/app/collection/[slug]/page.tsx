'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sizes = ['XS', 'S', 'M', 'L', 'XL']

const relatedProducts = [
    { id: 'tshirt-trace', name: 'T-shirt Trace', price: '85 €' },
    { id: 'pantalon-resonance', name: 'Pantalon Résonance', price: '190 €' },
    { id: 'hoodie-refuge', name: 'Hoodie Refuge', price: '145 €' },
    { id: 'chemise-petale', name: 'Chemise Pétale', price: '165 €' },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [activeImage, setActiveImage] = useState(0)

    return (
        <>
            <Header />

            <main className="pt-20">
                {/* Breadcrumb */}
                <div className="bg-white border-b border-neutral-100">
                    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
                        <nav className="text-sm text-neutral-500">
                            <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
                            {' / '}
                            <Link href="/collection" className="hover:text-black transition-colors">Collection</Link>
                            {' / '}
                            <span className="text-black">Veste Mémoire</span>
                        </nav>
                    </div>
                </div>

                {/* Product Detail */}
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">

                        {/* Product Images */}
                        <div className="space-y-4">
                            <motion.div
                                className="relative aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-[10rem] font-bold text-neutral-300">V</span>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-4 gap-2">
                                {[0, 1, 2, 3].map((i) => (
                                    <button
                                        key={i}
                                        className={`aspect-square rounded-lg overflow-hidden bg-neutral-100 transition-all ${activeImage === i ? 'ring-2 ring-black' : 'hover:opacity-80'
                                            }`}
                                        onClick={() => setActiveImage(i)}
                                    >
                                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <motion.div
                            className="lg:py-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="mb-6">
                                <p className="text-sm text-neutral-500 mb-2">Vestes</p>
                                <h1 className="text-3xl lg:text-4xl font-bold mb-2">Veste Mémoire</h1>
                                <p className="text-2xl">280 €</p>
                            </div>

                            <p className="text-neutral-600 mb-8 leading-relaxed">
                                La Veste Mémoire est née d'un geste répété : celui de la broderie à la main.
                                Chaque motif floral est unique, légèrement imparfait, profondément humain.
                                Coupe contemporaine, épaules tombantes. Une pièce qui habille sans contraindre.
                            </p>

                            {/* Size Selector */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="font-medium">Sélectionnez une taille</p>
                                    <button className="text-sm text-neutral-500 underline">Guide des tailles</button>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`py-4 text-center font-medium rounded-lg border transition-all ${selectedSize === size
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-neutral-200 hover:border-black'
                                                }`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="space-y-3 mb-8">
                                <button
                                    className={`w-full py-4 text-lg font-medium rounded-full transition-all ${selectedSize
                                            ? 'bg-black text-white hover:bg-neutral-800'
                                            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                        }`}
                                    disabled={!selectedSize}
                                >
                                    Ajouter au panier
                                </button>
                                <button className="w-full py-4 text-lg font-medium rounded-full border border-neutral-300 hover:border-black transition-colors">
                                    ♡ Ajouter aux favoris
                                </button>
                            </div>

                            {/* Accordion details */}
                            <div className="border-t border-neutral-200">
                                {[
                                    { title: 'Description', content: 'Broderie main, fil de coton. Coupe oversize légère.' },
                                    { title: 'Matière', content: '100% coton épais. Fabrication France.' },
                                    { title: 'Livraison & Retours', content: 'Livraison gratuite. Retours sous 14 jours.' },
                                ].map((item) => (
                                    <details key={item.title} className="border-b border-neutral-200 group">
                                        <summary className="flex justify-between items-center py-5 cursor-pointer list-none font-medium">
                                            {item.title}
                                            <span className="text-xl group-open:rotate-180 transition-transform">+</span>
                                        </summary>
                                        <div className="pb-5 text-neutral-600">
                                            {item.content}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Related Products */}
                <section className="py-16 bg-neutral-100">
                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                        <h2 className="text-2xl font-bold mb-8">Vous aimerez aussi</h2>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {relatedProducts.map((product, i) => (
                                <motion.article
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link href={`/collection/${product.id}`} className="group block">
                                        <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden mb-4">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-5xl font-bold text-neutral-300">{product.name.charAt(0)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-black group-hover:underline">{product.name}</h3>
                                            <p className="text-neutral-600">{product.price}</p>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
