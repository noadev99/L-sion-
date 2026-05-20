'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
    return (
        <>
            <Header />

            {/* Hero */}
            <section className="pt-20 bg-black text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24 lg:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <p className="text-sm uppercase tracking-wider text-neutral-400 mb-4">Notre histoire</p>
                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                            Ce qui se brise peut renaître autrement.
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6">L'origine</h2>
                            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                                Il y a eu une blessure. Pas spectaculaire. Pas visible. Mais présente.
                            </p>
                            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                                Lésion est née de ce moment où l'on choisit de ne plus cacher ce qui nous a traversés.
                                De transformer la marque en matière. Le souvenir en vêtement.
                            </p>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                Nous ne fabriquons pas des vêtements pour masquer. Nous créons des pièces pour
                                accompagner — ceux qui portent leurs histoires, leurs fragilités, leurs renaissances.
                            </p>
                        </motion.div>

                        <motion.div
                            className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center">
                                <span className="text-[12rem] font-bold text-white/50">L</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-neutral-100">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <motion.h2
                        className="text-3xl lg:text-4xl font-bold mb-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Nos valeurs
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { number: '01', title: 'Authenticité', desc: 'Chaque pièce raconte une histoire vraie.' },
                            { number: '02', title: 'Artisanat', desc: 'Broderies à la main, matières nobles.' },
                            { number: '03', title: 'Durabilité', desc: 'Des vêtements faits pour durer.' },
                            { number: '04', title: 'Inclusivité', desc: 'Pour tous ceux qui se reconstruisent.' },
                        ].map((value, i) => (
                            <motion.div
                                key={value.number}
                                className="bg-white rounded-2xl p-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="text-5xl font-bold text-neutral-200 mb-4 block">{value.number}</span>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-neutral-600">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 bg-black text-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { number: '100%', label: 'Fabrication France' },
                            { number: '500+', label: 'Pièces vendues' },
                            { number: '0', label: 'Compromis' },
                            { number: '∞', label: 'Histoires' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="text-4xl lg:text-5xl font-bold block mb-2">{stat.number}</span>
                                <span className="text-neutral-400">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Prêt à découvrir ?</h2>
                        <p className="text-lg text-neutral-600 mb-8">
                            Explorez notre collection et trouvez la pièce qui vous accompagnera.
                        </p>
                        <a
                            href="/collection"
                            className="inline-block px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors"
                        >
                            Voir la collection
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    )
}
