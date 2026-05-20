import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-black text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                            Produits
                        </h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/collection" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Vestes
                            </Link>
                            <Link href="/collection" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                T-shirts
                            </Link>
                            <Link href="/collection" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Pantalons
                            </Link>
                            <Link href="/collection" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Accessoires
                            </Link>
                        </nav>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                            Aide
                        </h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Guide des tailles
                            </Link>
                            <Link href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Livraison
                            </Link>
                            <Link href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Retours
                            </Link>
                            <Link href="/contact" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                            À propos
                        </h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/a-propos" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Notre histoire
                            </Link>
                            <Link href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Durabilité
                            </Link>
                            <Link href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Carrières
                            </Link>
                        </nav>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                            Suivez-nous
                        </h4>
                        <nav className="flex flex-col gap-3">
                            <a href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Instagram
                            </a>
                            <a href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                TikTok
                            </a>
                            <a href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                                Twitter
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-6">
                            <span className="text-xl font-bold">LÉSION</span>
                            <span className="text-xs text-neutral-500">© 2024 Tous droits réservés</span>
                        </div>
                        <div className="flex gap-6 text-xs text-neutral-500">
                            <Link href="/cgv" className="hover:text-white transition-colors">CGV</Link>
                            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
                            <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
