import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as any,
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { items } = body

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: 'Aucun article dans le panier' },
                { status: 400 }
            )
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

        // Create Stripe Checkout line items from cart items
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
            (item: {
                name: string
                price: number
                quantity: number
                size?: string
                image?: string
            }) => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.name,
                        description: item.size ? `Taille : ${item.size}` : undefined,
                        images: item.image ? [`${baseUrl}${item.image}`] : undefined,
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe uses cents
                },
                quantity: item.quantity,
            })
        )

        // Create the Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${baseUrl}/merci?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/panier`,
            locale: 'fr',
            shipping_address_collection: {
                allowed_countries: ['FR', 'BE', 'CH', 'LU', 'MC'],
            },
            billing_address_collection: 'required',
        })

        return NextResponse.json({ url: session.url })
    } catch (error: any) {
        console.error('Stripe checkout error:', error)
        return NextResponse.json(
            { error: error.message || 'Erreur lors de la création de la session de paiement' },
            { status: 500 }
        )
    }
}
