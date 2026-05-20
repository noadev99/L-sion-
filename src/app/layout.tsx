import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
    title: 'Lésion — Ce qui se brise peut renaître autrement',
    description: 'Marque de vêtements indépendante française. Ce qui se brise peut renaître autrement. Collection inspirée par la reconstruction et la renaissance.',
    keywords: ['Lésion', 'vêtements', 'mode', 'indépendant', 'français', 'streetwear', 'artistique'],
    authors: [{ name: 'Lésion' }],
    openGraph: {
        title: 'Lésion — Ce qui se brise peut renaître autrement',
        description: 'Marque de vêtements indépendante française inspirée par la reconstruction et la renaissance.',
        type: 'website',
        locale: 'fr_FR',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body>
                <CartProvider>
                    {children}
                </CartProvider>
            </body>
        </html>
    )
}
