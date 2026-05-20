'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MentionsLegalesPage() {
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
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Mentions légales</h1>
                        <p className="text-neutral-500 mb-12">Dernière mise à jour : 16 avril 2026</p>

                        <div className="prose prose-neutral max-w-none space-y-10 text-neutral-700 leading-relaxed">

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">1. Éditeur du site</h2>
                                <p>
                                    Le site lesion.fr est édité par :
                                </p>
                                <ul className="list-none pl-0 mt-3 space-y-1">
                                    <li><strong>Nom de la marque :</strong> LÉSION</li>
                                    <li><strong>Forme juridique :</strong> Micro-entreprise</li>
                                    <li><strong>Adresse :</strong> France</li>
                                    <li><strong>Email :</strong> contact@lesion.fr</li>
                                    <li><strong>Numéro SIRET :</strong> En cours d'immatriculation</li>
                                    <li><strong>Directeur de la publication :</strong> Le gérant de LÉSION</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">2. Hébergement</h2>
                                <p>
                                    Le site est hébergé par :
                                </p>
                                <ul className="list-none pl-0 mt-3 space-y-1">
                                    <li><strong>Vercel Inc.</strong></li>
                                    <li>440 N Barranca Ave #4133</li>
                                    <li>Covina, CA 91723, États-Unis</li>
                                    <li>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">vercel.com</a></li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">3. Propriété intellectuelle</h2>
                                <p>
                                    L'ensemble du contenu du site lesion.fr (textes, images, graphismes, logos, icônes, sons, logiciels, etc.) 
                                    est la propriété exclusive de LÉSION ou de ses partenaires et est protégé par les lois françaises et 
                                    internationales relatives à la propriété intellectuelle.
                                </p>
                                <p className="mt-3">
                                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, 
                                    quel que soit le moyen ou le procédé utilisé, est interdite sauf autorisation écrite préalable de LÉSION.
                                </p>
                                <p className="mt-3">
                                    Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme 
                                    constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du 
                                    Code de la Propriété Intellectuelle.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">4. Données personnelles</h2>
                                <p>
                                    Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés 
                                    du 6 janvier 1978 modifiée, LÉSION s'engage à protéger les données personnelles des utilisateurs du Site.
                                </p>
                                <p className="mt-3">
                                    Les informations collectées lors de votre navigation ou de votre commande sont utilisées exclusivement pour :
                                </p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li>Le traitement et le suivi de vos commandes</li>
                                    <li>La gestion de la relation client</li>
                                    <li>L'envoi de communications commerciales (avec votre consentement)</li>
                                    <li>L'amélioration de nos services et de votre expérience utilisateur</li>
                                </ul>
                                <p className="mt-3">
                                    Pour plus d'informations, consultez notre <a href="/confidentialite" className="underline hover:text-black">Politique de Confidentialité</a>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">5. Droits des utilisateurs</h2>
                                <p>
                                    Conformément à la réglementation en vigueur, vous disposez des droits suivants concernant vos données personnelles :
                                </p>
                                <ul className="list-disc pl-6 mt-3 space-y-2">
                                    <li><strong>Droit d'accès :</strong> obtenir la confirmation que vos données sont traitées et en obtenir une copie</li>
                                    <li><strong>Droit de rectification :</strong> demander la correction de données inexactes ou incomplètes</li>
                                    <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données personnelles</li>
                                    <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données à des fins de prospection</li>
                                    <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré et lisible</li>
                                    <li><strong>Droit à la limitation :</strong> demander la limitation du traitement de vos données</li>
                                </ul>
                                <p className="mt-3">
                                    Pour exercer ces droits, vous pouvez nous contacter à l'adresse : <strong>contact@lesion.fr</strong>
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">6. Cookies</h2>
                                <p>
                                    Le site lesion.fr peut être amené à utiliser des cookies pour améliorer l'expérience utilisateur 
                                    et réaliser des statistiques de visites. Un cookie est un petit fichier texte déposé sur votre 
                                    terminal (ordinateur, tablette, smartphone) lors de la visite d'un site internet.
                                </p>
                                <p className="mt-3">
                                    Vous pouvez à tout moment désactiver les cookies en configurant votre navigateur. Toutefois, 
                                    la désactivation de certains cookies peut limiter votre accès à certaines fonctionnalités du Site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">7. Limitation de responsabilité</h2>
                                <p>
                                    LÉSION s'efforce de fournir sur le Site des informations aussi précises que possible. Toutefois, 
                                    elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, 
                                    qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                                </p>
                                <p className="mt-3">
                                    LÉSION ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur 
                                    lors de l'accès au site lesion.fr, résultant soit de l'utilisation d'un matériel ne répondant pas aux 
                                    spécifications requises, soit de l'apparition d'un bug ou d'une incompatibilité.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">8. Liens hypertextes</h2>
                                <p>
                                    Le Site peut contenir des liens hypertextes vers d'autres sites internet. LÉSION n'exerce aucun contrôle 
                                    sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu ou leur politique 
                                    de confidentialité.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">9. Droit applicable</h2>
                                <p>
                                    Les présentes mentions légales sont régies par le droit français. Tout litige relatif à l'utilisation 
                                    du site lesion.fr sera soumis à la compétence exclusive des tribunaux français.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-black mb-4">10. Contact</h2>
                                <p>
                                    Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :
                                </p>
                                <ul className="list-none pl-0 mt-3 space-y-1">
                                    <li><strong>Email :</strong> contact@lesion.fr</li>
                                    <li><strong>Formulaire de contact :</strong> <a href="/contact" className="underline hover:text-black">Page contact</a></li>
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
