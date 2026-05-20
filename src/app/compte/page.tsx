'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type AuthMode = 'login' | 'register'

export default function ComptePage() {
    const [mode, setMode] = useState<AuthMode>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Validation
        if (mode === 'register') {
            if (password !== confirmPassword) {
                setError('Les mots de passe ne correspondent pas')
                setIsLoading(false)
                return
            }
            if (!acceptTerms) {
                setError('Veuillez accepter les conditions générales')
                setIsLoading(false)
                return
            }
            if (password.length < 8) {
                setError('Le mot de passe doit contenir au moins 8 caractères')
                setIsLoading(false)
                return
            }
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // For demo purposes - would connect to real auth
        alert(mode === 'login' ? 'Connexion réussie !' : 'Compte créé avec succès !')
        setIsLoading(false)
    }

    return (
        <>
            <Header />

            <main className="pt-20 min-h-screen bg-neutral-50">
                <div className="max-w-md mx-auto px-6 py-16">

                    {/* Header */}
                    <motion.div
                        className="text-center mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-bold mb-3">
                            {mode === 'login' ? 'Connexion' : 'Créer un compte'}
                        </h1>
                        <p className="text-neutral-600">
                            {mode === 'login'
                                ? 'Accédez à votre espace personnel'
                                : 'Rejoignez la communauté Lésion'
                            }
                        </p>
                    </motion.div>

                    {/* Auth Toggle */}
                    <div className="flex bg-neutral-100 rounded-full p-1 mb-8">
                        <button
                            onClick={() => { setMode('login'); setError('') }}
                            className={`flex-1 py-3 text-sm font-medium rounded-full transition-all ${mode === 'login'
                                    ? 'bg-white text-black shadow-sm'
                                    : 'text-neutral-600 hover:text-black'
                                }`}
                        >
                            Connexion
                        </button>
                        <button
                            onClick={() => { setMode('register'); setError('') }}
                            className={`flex-1 py-3 text-sm font-medium rounded-full transition-all ${mode === 'register'
                                    ? 'bg-white text-black shadow-sm'
                                    : 'text-neutral-600 hover:text-black'
                                }`}
                        >
                            Inscription
                        </button>
                    </div>

                    {/* Form Card */}
                    <motion.div
                        className="bg-white rounded-3xl p-8 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">

                            <AnimatePresence mode="wait">
                                {mode === 'register' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Prénom</label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition-colors"
                                                placeholder="Jean"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Nom</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition-colors"
                                                placeholder="Dupont"
                                                required
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition-colors"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Mot de passe</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                />
                                {mode === 'register' && (
                                    <p className="text-xs text-neutral-500 mt-1">Minimum 8 caractères</p>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                {mode === 'register' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <label className="block text-sm font-medium mb-2">Confirmer le mot de passe</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition-colors"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {mode === 'login' && (
                                <div className="flex justify-end">
                                    <button type="button" className="text-sm text-neutral-600 hover:text-black transition-colors">
                                        Mot de passe oublié ?
                                    </button>
                                </div>
                            )}

                            {mode === 'register' && (
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                        className="mt-1 w-4 h-4 rounded border-neutral-300 text-black focus:ring-black"
                                    />
                                    <span className="text-sm text-neutral-600">
                                        J'accepte les{' '}
                                        <Link href="/cgv" className="underline hover:text-black">
                                            conditions générales de vente
                                        </Link>
                                        {' '}et la{' '}
                                        <Link href="/confidentialite" className="underline hover:text-black">
                                            politique de confidentialité
                                        </Link>
                                    </span>
                                </label>
                            )}

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-4 bg-red-50 text-red-600 text-sm rounded-xl"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 text-lg font-medium rounded-full transition-all ${isLoading
                                        ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                                        : 'bg-black text-white hover:bg-neutral-800'
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Chargement...
                                    </span>
                                ) : (
                                    mode === 'login' ? 'Se connecter' : 'Créer mon compte'
                                )}
                            </button>
                        </form>

                        {/* Social Login */}
                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-neutral-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-neutral-500">Ou continuer avec</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Benefits */}
                    {mode === 'register' && (
                        <motion.div
                            className="mt-10 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-sm font-medium text-center text-neutral-600 mb-4">
                                Avantages membres
                            </p>
                            <div className="grid gap-3">
                                {[
                                    { icon: '🎁', text: 'Accès anticipé aux nouvelles collections' },
                                    { icon: '📦', text: 'Suivi de vos commandes en temps réel' },
                                    { icon: '💝', text: 'Offres exclusives réservées aux membres' },
                                    { icon: '🔄', text: 'Retours simplifiés et gratuits' },
                                ].map((benefit) => (
                                    <div key={benefit.text} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                                        <span className="text-xl">{benefit.icon}</span>
                                        <span className="text-sm text-neutral-700">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </div>
            </main>

            <Footer />
        </>
    )
}
