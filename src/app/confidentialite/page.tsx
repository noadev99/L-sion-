'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ConfidentialitePage() {
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
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Politique de Confidentialité</h1>
                        <p className="text-neutral-500 mb-12">Dernière mise à jour : 16 avril 2026</p>

                        <div className="prose prose-neutral max-w-none space-y-10 text-neutral-700 leading-relaxed">

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">1. Introduction</h2>
                                <p>
                                    LÉSION accorde une grande importance à la protection de votre vie privée et de vos données personnelles. 
                                    La présente Politique de Confidentialité a pour objet de vous informer sur la manière dont nous collectons, 
                                    utilisons, stockons et protégeons vos données personnelles lorsque vous utilisez notre site internet lesion.fr 
                                    (ci-après « le Site »).
                                </p>
                                <p className="mt-3">
                                    Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) 
                                    et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">2. Responsable du traitement</h2>
                                <p>
                                    Le responsable du traitement des données personnelles est :
                                </p>
                                <ul className="list-none pl-0 mt-3 space-y-1">
                                    <li><strong>LÉSION</strong></li>
                                    <li>Email : contact@lesion.fr</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">3. Données collectées</h2>
                                <p>
                                    Nous collectons les données personnelles suivantes dans le cadre de votre utilisation du Site :
                                </p>

                                <h3 className="text-lg font-semibold text-black mt-6 mb-3">3.1. Lors d'une commande</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Nom et prénom</li>
                                    <li>Adresse email</li>
                                    <li>Adresse de livraison et de facturation</li>
                                    <li>Numéro de téléphone</li>
                                    <li>Informations de paiement (traitées directement par Stripe, nous n'y avons pas accès)</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-black mt-6 mb-3">3.2. Lors de la navigation</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Adresse IP</li>
                                    <li>Type de navigateur et version</li>
                                    <li>Pages visitées et durée de visite</li>
                                    <li>Données de cookies (voir section dédiée)</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-black mt-6 mb-3">3.3. Lors de l'inscription à la newsletter</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Adresse email</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">4. Finalités du traitement</h2>
                                <p>
                                    Vos données personnelles sont collectées et traitées pour les finalités suivantes :
                                </p>
                                <div className="mt-4 space-y-4">
                                    <div className="bg-neutral-50 rounded-xl p-5">
                                        <p className="font-medium text-black mb-1">Gestion des commandes</p>
                                        <p className="text-sm">Traitement, expédition et suivi de vos commandes, gestion des retours et remboursements.</p>
                                        <p className="text-xs text-neutral-500 mt-2">Base légale : Exécution du contrat</p>
                                    </div>
                                    <div className="bg-neutral-50 rounded-xl p-5">
                                        <p className="font-medium text-black mb-1">Relation client</p>
                                        <p className="text-sm">Répondre à vos demandes, gérer votre compte client, service après-vente.</p>
                                        <p className="text-xs text-neutral-500 mt-2">Base légale : Exécution du contrat / Intérêt légitime</p>
                                    </div>
                                    <div className="bg-neutral-50 rounded-xl p-5">
                                        <p className="font-medium text-black mb-1">Communications commerciales</p>
                                        <p className="text-sm">Envoi de newsletters, offres promotionnelles et informations sur nos nouvelles collections.</p>
                                        <p className="text-xs text-neutral-500 mt-2">Base légale : Consentement</p>
                                    </div>
                                    <div className="bg-neutral-50 rounded-xl p-5">
                                        <p className="font-medium text-black mb-1">Amélioration des services</p>
                                        <p className="text-sm">Analyse de la navigation pour optimiser l'expérience utilisateur et améliorer nos produits.</p>
                                        <p className="text-xs text-neutral-500 mt-2">Base légale : Intérêt légitime</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">5. Partage des données</h2>
                                <p>
                                    Vos données personnelles ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :
                                </p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li><strong>Stripe :</strong> Traitement sécurisé des paiements en ligne. Stripe agit en tant que sous-traitant et est certifié PCI-DSS niveau 1.</li>
                                    <li><strong>Transporteurs :</strong> Pour la livraison de vos commandes (nom, adresse de livraison).</li>
                                    <li><strong>Hébergeur (Vercel) :</strong> Pour l'hébergement technique du Site.</li>
                                </ul>
                                <p className="mt-3">
                                    Ces prestataires s'engagent à traiter vos données conformément au RGPD et uniquement dans le cadre 
                                    des prestations qui leur sont confiées.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">6. Durée de conservation</h2>
                                <p>
                                    Vos données personnelles sont conservées pendant les durées suivantes :
                                </p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li><strong>Données de commande :</strong> 5 ans à compter de la dernière commande (obligations comptables et fiscales)</li>
                                    <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                                    <li><strong>Données de newsletter :</strong> Jusqu'à votre désinscription</li>
                                    <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">7. Cookies</h2>
                                <p>
                                    Le Site utilise des cookies pour assurer son bon fonctionnement et améliorer votre expérience de navigation.
                                </p>

                                <h3 className="text-lg font-semibold text-black mt-6 mb-3">Types de cookies utilisés</h3>
                                <div className="space-y-3 mt-3">
                                    <div className="border border-neutral-200 rounded-xl p-4">
                                        <p className="font-medium text-black">Cookies essentiels</p>
                                        <p className="text-sm mt-1">Nécessaires au fonctionnement du Site (panier, session). Non désactivables.</p>
                                    </div>
                                    <div className="border border-neutral-200 rounded-xl p-4">
                                        <p className="font-medium text-black">Cookies analytiques</p>
                                        <p className="text-sm mt-1">Permettent de mesurer l'audience et d'analyser la navigation (statistiques anonymes).</p>
                                    </div>
                                </div>

                                <p className="mt-4">
                                    Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur. 
                                    La suppression de cookies essentiels peut altérer le fonctionnement du Site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">8. Sécurité des données</h2>
                                <p>
                                    LÉSION met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger 
                                    vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction :
                                </p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Chiffrement SSL/TLS de toutes les communications</li>
                                    <li>Paiements sécurisés via Stripe (certification PCI-DSS)</li>
                                    <li>Accès restreint aux données personnelles</li>
                                    <li>Hébergement sécurisé chez Vercel</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">9. Vos droits</h2>
                                <p>
                                    Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
                                </p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li><strong>Droit d'accès</strong> — Obtenir la confirmation que vos données sont traitées et en recevoir une copie</li>
                                    <li><strong>Droit de rectification</strong> — Corriger des données inexactes ou incomplètes</li>
                                    <li><strong>Droit à l'effacement</strong> — Demander la suppression de vos données (« droit à l'oubli »)</li>
                                    <li><strong>Droit d'opposition</strong> — Vous opposer au traitement de vos données</li>
                                    <li><strong>Droit à la portabilité</strong> — Recevoir vos données dans un format structuré</li>
                                    <li><strong>Droit à la limitation</strong> — Limiter le traitement de vos données</li>
                                    <li><strong>Droit de retirer votre consentement</strong> — À tout moment pour les traitements basés sur le consentement</li>
                                </ul>
                                <p className="mt-4">
                                    Pour exercer vos droits, contactez-nous à : <strong>contact@lesion.fr</strong>
                                </p>
                                <p className="mt-3">
                                    Nous nous engageons à répondre à votre demande dans un délai d'un mois. 
                                    Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation 
                                    auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">www.cnil.fr</a>).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">10. Transfert de données hors UE</h2>
                                <p>
                                    Certains de nos prestataires (Stripe, Vercel) peuvent être amenés à transférer vos données 
                                    en dehors de l'Union Européenne, notamment aux États-Unis. Ces transferts sont encadrés par 
                                    des garanties appropriées (clauses contractuelles types, Data Privacy Framework) conformément 
                                    aux exigences du RGPD.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">11. Modifications</h2>
                                <p>
                                    LÉSION se réserve le droit de modifier la présente Politique de Confidentialité à tout moment. 
                                    Les modifications prendront effet dès leur publication sur le Site. Nous vous invitons à consulter 
                                    régulièrement cette page pour rester informé des éventuelles mises à jour.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">12. Contact</h2>
                                <p>
                                    Pour toute question relative à la présente Politique de Confidentialité ou à la gestion de vos 
                                    données personnelles, vous pouvez nous contacter :
                                </p>
                                <ul className="list-none pl-0 mt-3 space-y-1">
                                    <li><strong>Email :</strong> contact@lesion.fr</li>
                                    <li><strong>Formulaire :</strong> <a href="/contact" className="underline hover:text-black">Page contact</a></li>
                                </ul>
                            </section>

                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </>
    )
}
