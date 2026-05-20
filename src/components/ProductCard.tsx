'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProductCardProps {
    title: string
    price: string
    href: string
    delay?: number
}

export default function ProductCard({ title, price, href, delay = 0 }: ProductCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link href={href} className="block group">
                <div className="relative aspect-[3/4] overflow-hidden bg-gris-clair mb-4">
                    {/* Placeholder - replace with actual image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-bleu-souvenir/20 to-bleu-profond/30 transition-transform duration-slower ease-out-expo group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-4xl text-noir-profond/20">{title.charAt(0)}</span>
                    </div>
                </div>

                <div className="opacity-0 transform translate-y-2 transition-all duration-normal ease-out-expo group-hover:opacity-100 group-hover:translate-y-0">
                    <h3 className="font-display text-lg font-normal mb-1">{title}</h3>
                    <span className="text-sm text-gris-cendre">{price}</span>
                </div>
            </Link>
        </motion.article>
    )
}
