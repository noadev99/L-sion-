'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getProductById, accessoires } from '@/data/products'
import { useCart } from '@/context/CartContext'

export default function AccessoireProductPage({ params }: { params: { slug: string } }) {
    const product = getProductById(params.slug)
    const { addToCart, setIsCartOpen } = useCart()

    if (!product) {
        notFound()
    }

    const [activeImage, setActiveImage] = useState(0)
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = () => {
        if (!product) return

        setIsAdding(true)
        addToCart(product)

        setTimeout(() => {
            setIsAdding(false)
            setIsCartOpen(true)
        }, 500)
    }

    // Get related products
    const relatedProducts = accessoires
        .filter(p => p.id !== product.id)
        .slice(0, 4)

    return (
        <>
            <Header />

            <main className="pt-20 bg-white">
                {/* Breadcrumb */}
                <div className="border-b border-neutral-100">
                    <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-4">
                        <nav className="text-sm text-neutral-500">
                            <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
                            {' / '}
                            <Link href="/accessoires" className="hover:text-black transition-colors">Accessoires</Link>
                            {' / '}
                            <span className="text-black">{product.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Product Detail */}
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Product Images */}
                        <div>
                            <motion.div
                                className="relative aspect-square bg-white rounded-3xl overflow-hidden mb-4 border border-neutral-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Image
                                    src={product.images[activeImage] || product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8"
                                />
                            </motion.div>

                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {product.images.map((image, i) => (
                                        <button
                                            key={i}
                                            className={`aspect-square rounded-xl overflow-hidden bg-white border transition-all ${activeImage === i ? 'ring-2 ring-black ring-offset-2' : 'border-neutral-100 hover:border-neutral-300'
                                                }`}
                                            onClick={() => setActiveImage(i)}
                                        >
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={image}
                                                    alt={`${product.name} - vue ${i + 1}`}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <motion.div
                            className="lg:py-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="mb-8">
                                {!product.inStock && (
                                    <span className="inline-block px-3 py-1 text-white text-xs font-medium rounded-full mb-4 bg-red-600">
                                        {product.tag}
                                    </span>
                                )}
                                <p className="text-sm text-neutral-500 mb-2">{product.collectionName}</p>
                                <h1 className="text-3xl lg:text-4xl font-bold mb-3">{product.name}</h1>
                                <p className="text-2xl font-medium">{product.price}</p>
                            </div>

                            <p className="text-neutral-600 mb-10 leading-relaxed text-lg">
                                {product.description}
                            </p>

                            {/* Add to Cart */}
                            <div className="space-y-4 mb-10">
                                {product.inStock ? (
                                    <button
                                        onClick={handleAddToCart}
                                        className={`w-full py-5 text-lg font-medium rounded-full bg-black text-white hover:bg-neutral-800 transition-all ${isAdding ? 'opacity-70 scale-[0.98]' : ''}`}
                                        disabled={isAdding}
                                    >
                                        {isAdding ? 'Ajout...' : `Ajouter au panier — ${product.price}`}
                                    </button>
                                ) : (
                                    <button
                                        className="w-full py-5 text-lg font-medium rounded-full bg-neutral-200 text-neutral-500 cursor-not-allowed"
                                        disabled
                                    >
                                        Produit en rupture de stock
                                    </button>
                                )}
                                <button className="w-full py-5 text-lg font-medium rounded-full border-2 border-neutral-200 hover:border-black transition-colors flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Ajouter aux favoris
                                </button>
                            </div>

                            {/* Details Accordion */}
                            <div className="border-t border-neutral-200">
                                {[
                                    { title: 'Description', content: product.description || 'Description non disponible.' },
                                    { title: 'Matières', content: '100% coton. Broderie fil de coton. Finitions soignées.' },
                                    { title: 'Livraison & Retours', content: 'Livraison gratuite en France. Retours gratuits sous 30 jours.' },
                                ].map((item) => (
                                    <details key={item.title} className="border-b border-neutral-200 group">
                                        <summary className="flex justify-between items-center py-5 cursor-pointer list-none font-medium text-lg">
                                            {item.title}
                                            <span className="text-2xl font-light group-open:rotate-45 transition-transform">+</span>
                                        </summary>
                                        <div className="pb-6 text-neutral-600 leading-relaxed">
                                            {item.content}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Related Products */}
                <section className="py-20 bg-neutral-100">
                    <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-10">Vous aimerez aussi</h2>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {relatedProducts.map((relatedProduct, i) => (
                                <motion.article
                                    key={relatedProduct.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link href={`/accessoires/${relatedProduct.id}`} className="group block">
                                        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-4 border border-neutral-100">
                                            <Image
                                                src={relatedProduct.images[0]}
                                                alt={relatedProduct.name}
                                                fill
                                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-1">{relatedProduct.collectionName}</p>
                                            <h3 className="font-medium group-hover:underline">{relatedProduct.name}</h3>
                                            <p className="text-neutral-600">{relatedProduct.price}</p>
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
