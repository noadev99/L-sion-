'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CGVPage() {
    return (
        <>
            <Header />

            <main className="pt-20 min-h-screen bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Conditions Générales de Vente</h1>
                        <p className="text-neutral-500 mb-12">Dernière mise à jour : 16 avril 2026</p>

                        <div className="prose prose-neutral max-w-none space-y-10 text-neutral-700 leading-relaxed">

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 1 — Objet</h2>
                                <p>
                                    Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits effectuées par LÉSION, 
                                    marque de streetwear premium, via son site internet accessible à l'adresse lesion.fr (ci-après « le Site »). 
                                    Toute commande passée sur le Site implique l'acceptation sans réserve des présentes CGV par l'acheteur.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 2 — Identité du vendeur</h2>
                                <p>
                                    LÉSION<br />
                                    Micro-entreprise<br />
                                    Email : contact@lesion.fr<br />
                                    Numéro SIRET : En cours d'immatriculation
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 3 — Produits</h2>
                                <p>
                                    Les produits proposés à la vente sont ceux décrits sur le Site au moment de la consultation par l'acheteur. 
                                    Les photographies des produits sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite 
                                    avec le produit proposé, notamment en ce qui concerne les couleurs. LÉSION s'engage à livrer un produit conforme 
                                    à la description figurant sur le Site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 4 — Prix</h2>
                                <p>
                                    Les prix des produits sont indiqués en euros, toutes taxes comprises (TTC). LÉSION se réserve le droit 
                                    de modifier ses prix à tout moment. Toutefois, les produits seront facturés sur la base des tarifs en vigueur 
                                    au moment de la validation de la commande. Les frais de livraison sont offerts pour toute commande livrée 
                                    en France métropolitaine.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 5 — Commande</h2>
                                <p>
                                    L'acheteur peut passer commande sur le Site en ajoutant les produits souhaités à son panier, puis en procédant 
                                    au paiement. La commande n'est considérée comme définitive qu'après confirmation du paiement. Un email de 
                                    confirmation sera envoyé à l'acheteur récapitulant les détails de sa commande.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 6 — Paiement</h2>
                                <p>
                                    Le paiement s'effectue en ligne par carte bancaire (Visa, MasterCard, American Express, CB) via la plateforme 
                                    sécurisée Stripe. Le paiement est débité au moment de la validation de la commande. Les données bancaires de 
                                    l'acheteur sont protégées par un chiffrement SSL et ne sont jamais transmises à LÉSION.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 7 — Livraison</h2>
                                <p>
                                    Les produits sont livrés à l'adresse de livraison indiquée lors de la commande. Les délais de livraison 
                                    sont donnés à titre indicatif et sont généralement compris entre 3 et 7 jours ouvrés pour la France métropolitaine. 
                                    LÉSION ne saurait être tenue responsable des retards de livraison imputables au transporteur ou en cas de force majeure.
                                </p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>France métropolitaine : 3 à 7 jours ouvrés — Livraison gratuite</li>
                                    <li>Belgique, Suisse, Luxembourg : 5 à 10 jours ouvrés</li>
                                    <li>Autres pays : nous consulter</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 8 — Droit de rétractation</h2>
                                <p>
                                    Conformément aux dispositions de l'article L.221-18 du Code de la consommation, l'acheteur dispose d'un délai 
                                    de 14 jours à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier 
                                    de motif ni à payer de pénalités. Les produits doivent être retournés dans leur état d'origine et complets 
                                    (emballage, accessoires, étiquettes) dans les 14 jours suivant la notification de rétractation.
                                </p>
                                <p className="mt-3">
                                    Les frais de retour sont à la charge de l'acheteur. Le remboursement sera effectué dans un délai de 14 jours 
                                    à compter de la réception du produit retourné, par le même moyen de paiement que celui utilisé lors de la commande.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 9 — Garanties</h2>
                                <p>
                                    Tous les produits vendus sur le Site bénéficient de la garantie légale de conformité (articles L.217-4 et suivants 
                                    du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil). 
                                    En cas de produit défectueux ou non conforme, l'acheteur peut contacter LÉSION à l'adresse contact@lesion.fr 
                                    pour obtenir un échange ou un remboursement.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 10 — Propriété intellectuelle</h2>
                                <p>
                                    L'ensemble des éléments du Site (textes, images, logos, graphismes, illustrations, photographies, vidéos) 
                                    sont la propriété exclusive de LÉSION et sont protégés par les lois relatives à la propriété intellectuelle. 
                                    Toute reproduction, représentation, modification ou exploitation de tout ou partie du Site est strictement interdite 
                                    sans l'autorisation préalable écrite de LÉSION.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 11 — Données personnelles</h2>
                                <p>
                                    Les données personnelles collectées lors de la commande sont nécessaires au traitement de celle-ci. 
                                    Elles sont traitées conformément à notre <a href="/confidentialite" className="underline hover:text-black">Politique de Confidentialité</a>. 
                                    L'acheteur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">Article 12 — Litiges</h2>
                                <p>
                                    Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée 
                                    avant toute action judiciaire. À défaut, les tribunaux français seront seuls compétents. Conformément aux 
                                    dispositions du Code de la consommation, le consommateur peut recourir à un médiateur de la consommation 
                                    en vue de la résolution amiable du litige.
                                </p>
                            </section>

                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </>
    )
}
