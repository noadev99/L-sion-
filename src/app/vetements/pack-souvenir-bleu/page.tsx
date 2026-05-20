'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getProductById } from '@/data/products'
import { useCart, PackConfig } from '@/context/CartContext'

export default function PackBleuPage() {
    const product = getProductById('pack-souvenir-bleu')
    const { addToCart, setIsCartOpen } = useCart()

    if (!product || !product.isConfigurable || !product.packOptions) {
        notFound()
    }

    const [selectedVetement, setSelectedVetement] = useState<string | null>(null)
    const [selectedAccessoire, setSelectedAccessoire] = useState<string | null>(null)
    const [isAdding, setIsAdding] = useState(false)

    // Calculate current price
    const calculatePrice = () => {
        if (!selectedVetement) return product.packOptions!.basePrice
        const vetementOption = product.packOptions!.vetements.find(v => v.id === selectedVetement)
        return product.packOptions!.basePrice + (vetementOption?.priceModifier || 0)
    }

    const currentPrice = calculatePrice()

    const handleAddToCart = () => {
        if (!selectedVetement || !selectedAccessoire) return

        const vetementOption = product.packOptions!.vetements.find(v => v.id === selectedVetement)!
        const accessoireOption = product.packOptions!.accessoires.find(a => a.id === selectedAccessoire)!

        const packConfig: PackConfig = {
            vetement: { id: vetementOption.id, name: vetementOption.name },
            accessoire: { id: accessoireOption.id, name: accessoireOption.name },
            totalPrice: currentPrice
        }

        setIsAdding(true)
        addToCart(product, undefined, packConfig)

        setTimeout(() => {
            setIsAdding(false)
            setIsCartOpen(true)
        }, 500)
    }

    const isComplete = selectedVetement && selectedAccessoire

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
                            <Link href="/vetements" className="hover:text-black transition-colors">Vêtements</Link>
                            {' / '}
                            <Link href="/vetements?collection=souvenir-bleu" className="hover:text-black transition-colors">Souvenir Bleu</Link>
                            {' / '}
                            <span className="text-black">{product.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Product Detail */}
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Product Image */}
                        <div>
                            <motion.div
                                className="relative aspect-[4/5] bg-white rounded-3xl overflow-hidden mb-4 border border-neutral-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8"
                                />
                            </motion.div>
                        </div>

                        {/* Product Info & Configurator */}
                        <motion.div
                            className="lg:py-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="mb-8">
                                <span className="inline-block px-3 py-1 text-white text-xs font-medium rounded-full mb-4 bg-blue-600">
                                    Personnalisable
                                </span>
                                <p className="text-sm text-neutral-500 mb-2">{product.collectionName}</p>
                                <h1 className="text-3xl lg:text-4xl font-bold mb-3">{product.name}</h1>
                                <p className="text-2xl font-medium">
                                    À partir de {product.packOptions.basePrice} €
                                </p>
                            </div>

                            <p className="text-neutral-600 mb-10 leading-relaxed text-lg">
                                {product.description}
                            </p>

                            {/* Step 1: Choose Vetement */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-6 h-6 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center">1</span>
                                    <p className="font-medium">Choisissez votre vêtement</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.packOptions.vetements.map((option) => {
                                        const optionPrice = product.packOptions!.basePrice + option.priceModifier
                                        return (
                                            <button
                                                key={option.id}
                                                className={`p-4 text-left rounded-xl border-2 transition-all ${selectedVetement === option.id
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-neutral-200 hover:border-black'
                                                    }`}
                                                onClick={() => setSelectedVetement(option.id)}
                                            >
                                                <p className="font-medium">{option.name}</p>
                                                <p className={`text-sm mt-1 ${selectedVetement === option.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                                                    {optionPrice} €
                                                </p>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Step 2: Choose Accessoire */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`w-6 h-6 text-xs font-bold rounded-full flex items-center justify-center ${selectedVetement ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-500'}`}>2</span>
                                    <p className="font-medium">Choisissez votre accessoire</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.packOptions.accessoires.map((option) => (
                                        <button
                                            key={option.id}
                                            className={`p-4 text-left rounded-xl border-2 transition-all ${selectedAccessoire === option.id
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-black border-neutral-200 hover:border-black'
                                                } ${!selectedVetement ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => selectedVetement && setSelectedAccessoire(option.id)}
                                            disabled={!selectedVetement}
                                        >
                                            <p className="font-medium">{option.name}</p>
                                            <p className={`text-sm mt-1 ${selectedAccessoire === option.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                                                Inclus
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Summary */}
                            {isComplete && (
                                <motion.div
                                    className="mb-8 p-4 bg-neutral-50 rounded-xl"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <p className="text-sm text-neutral-500 mb-2">Votre sélection</p>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">
                                                {product.packOptions.vetements.find(v => v.id === selectedVetement)?.name}
                                            </p>
                                            <p className="text-sm text-neutral-500">
                                                + {product.packOptions.accessoires.find(a => a.id === selectedAccessoire)?.name}
                                            </p>
                                        </div>
                                        <p className="text-2xl font-bold">{currentPrice} €</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Add to Cart */}
                            <div className="space-y-4 mb-10">
                                <button
                                    onClick={handleAddToCart}
                                    className={`w-full py-5 text-lg font-medium rounded-full transition-all ${isComplete
                                        ? 'bg-black text-white hover:bg-neutral-800'
                                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                        } ${isAdding ? 'opacity-70 scale-[0.98]' : ''}`}
                                    disabled={!isComplete || isAdding}
                                >
                                    {isAdding ? 'Ajout...' : isComplete ? `Ajouter au panier — ${currentPrice} €` : 'Composez votre pack'}
                                </button>
                            </div>

                            {/* Details Accordion */}
                            <div className="border-t border-neutral-200">
                                {[
                                    { title: 'Contenu du pack', content: 'Un vêtement au choix (T-shirt ou Hoodie) + un accessoire au choix (Casquette ou Bonnet) de la collection Souvenir Bleu.' },
                                    { title: 'Matières & Entretien', content: '100% coton épais certifié GOTS. Lavage à 30°C. Fabriqué en France.' },
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
            </main>

            <Footer />
        </>
    )
}
