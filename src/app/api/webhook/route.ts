import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16' as any,
})

const getResend = () => new Resend(process.env.RESEND_API_KEY || '')

// Your email where you want to receive order notifications
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'votre-email@gmail.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

export async function POST(request: NextRequest) {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message)
        return NextResponse.json(
            { error: `Webhook Error: ${err.message}` },
            { status: 400 }
        )
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session

        try {
            // Retrieve the full session with line items and customer details
            const fullSession = (await stripe.checkout.sessions.retrieve(session.id, {
                expand: ['line_items', 'line_items.data.price.product'],
            })) as any

            const customerEmail = fullSession.customer_details?.email || 'Non renseigné'
            const customerName = fullSession.customer_details?.name || 'Non renseigné'
            const shippingAddress = fullSession.shipping_details?.address
            const lineItems = fullSession.line_items?.data || []
            const amountTotal = ((fullSession.amount_total || 0) / 100).toFixed(2)

            // Build the product list for the email
            const productRows = lineItems.map((item: any) => {
                const product = item.price?.product as Stripe.Product
                const productName = product?.name || item.description || 'Produit'
                const productDesc = product?.description || ''
                const qty = item.quantity || 1
                const unitPrice = ((item.price?.unit_amount || 0) / 100).toFixed(2)
                const totalPrice = ((item.amount_total || 0) / 100).toFixed(2)

                return `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 12px; font-weight: 600;">${productName}</td>
                    <td style="padding: 12px; color: #666;">${productDesc}</td>
                    <td style="padding: 12px; text-align: center;">${qty}</td>
                    <td style="padding: 12px; text-align: right;">${unitPrice} €</td>
                    <td style="padding: 12px; text-align: right; font-weight: 600;">${totalPrice} €</td>
                </tr>`
            }).join('')

            // Format shipping address
            const addressFormatted = shippingAddress
                ? `${shippingAddress.line1 || ''}${shippingAddress.line2 ? ', ' + shippingAddress.line2 : ''}<br>
                   ${shippingAddress.postal_code || ''} ${shippingAddress.city || ''}<br>
                   ${shippingAddress.country || ''}`
                : 'Non renseignée'

            // Build the email HTML
            const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
                    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; }
                    .header { background: #000; color: white; padding: 30px; text-align: center; }
                    .header h1 { margin: 0; font-size: 24px; letter-spacing: 2px; }
                    .header p { margin: 8px 0 0; opacity: 0.7; font-size: 14px; }
                    .content { padding: 30px; }
                    .section { margin-bottom: 24px; }
                    .section-title { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 8px; }
                    .info-box { background: #f9f9f9; border-radius: 8px; padding: 16px; }
                    .info-row { display: flex; justify-content: space-between; padding: 4px 0; }
                    .info-label { color: #666; }
                    .info-value { font-weight: 600; }
                    table { width: 100%; border-collapse: collapse; }
                    th { text-align: left; padding: 12px; border-bottom: 2px solid #000; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
                    .total-row { background: #000; color: white; }
                    .total-row td { padding: 16px 12px; font-weight: 700; font-size: 16px; }
                    .action-box { background: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 16px; margin-top: 24px; }
                    .action-box h3 { margin: 0 0 8px; color: #92400e; }
                    .action-box p { margin: 0; color: #78350f; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>LÉSION</h1>
                        <p>🛒 Nouvelle commande reçue !</p>
                    </div>
                    <div class="content">
                        <!-- Order ID -->
                        <div class="section">
                            <div class="section-title">Commande</div>
                            <div class="info-box">
                                <p style="margin: 0;"><strong>ID Stripe :</strong> ${session.id}</p>
                                <p style="margin: 4px 0 0;"><strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>

                        <!-- Client Info -->
                        <div class="section">
                            <div class="section-title">Client</div>
                            <div class="info-box">
                                <p style="margin: 0;"><strong>Nom :</strong> ${customerName}</p>
                                <p style="margin: 4px 0 0;"><strong>Email :</strong> ${customerEmail}</p>
                            </div>
                        </div>

                        <!-- Shipping Address -->
                        <div class="section">
                            <div class="section-title">Adresse de livraison</div>
                            <div class="info-box">
                                <p style="margin: 0;"><strong>${customerName}</strong></p>
                                <p style="margin: 4px 0 0;">${addressFormatted}</p>
                            </div>
                        </div>

                        <!-- Products -->
                        <div class="section">
                            <div class="section-title">Articles commandés</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Produit</th>
                                        <th>Détails</th>
                                        <th style="text-align: center;">Qté</th>
                                        <th style="text-align: right;">Prix unit.</th>
                                        <th style="text-align: right;">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${productRows}
                                </tbody>
                                <tfoot>
                                    <tr class="total-row">
                                        <td colspan="4">TOTAL</td>
                                        <td style="text-align: right;">${amountTotal} €</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <!-- Action reminder -->
                        <div class="action-box">
                            <h3>⚡ Action requise</h3>
                            <p>Pensez à commander ces articles chez votre fournisseur AliExpress avec l'adresse de livraison du client ci-dessus.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `

            // Send the email to owner
            await getResend().emails.send({
                from: FROM_EMAIL,
                to: OWNER_EMAIL,
                subject: `🛒 Nouvelle commande LÉSION — ${amountTotal} € — ${customerName}`,
                html: emailHtml,
            })

            // Send confirmation email to customer
            if (customerEmail && customerEmail !== 'Non renseigné') {
                const customerEmailHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; color: #1a1a1a; }
                        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; }
                        .header { background: #000; color: white; padding: 40px 30px; text-align: center; }
                        .header h1 { margin: 0; font-size: 28px; letter-spacing: 4px; font-weight: 700; }
                        .header p { margin: 12px 0 0; opacity: 0.8; font-size: 15px; }
                        .content { padding: 30px; }
                        .greeting { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
                        .intro { color: #666; font-size: 15px; line-height: 1.6; margin-bottom: 30px; }
                        .tracker { background: #fafafa; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
                        .tracker-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 20px; font-weight: 600; }
                        .steps { display: flex; justify-content: space-between; position: relative; }
                        .step { text-align: center; flex: 1; position: relative; }
                        .step-icon { width: 44px; height: 44px; border-radius: 50%; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
                        .step-active .step-icon { background: #000; color: white; }
                        .step-pending .step-icon { background: #e5e5e5; color: #999; }
                        .step-name { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
                        .step-active .step-name { color: #000; }
                        .step-pending .step-name { color: #999; }
                        .progress-bar { height: 3px; background: #e5e5e5; margin: 0 40px; position: relative; top: -42px; z-index: 0; border-radius: 2px; }
                        .progress-fill { height: 100%; width: 15%; background: #000; border-radius: 2px; }
                        .order-summary { margin-bottom: 24px; }
                        .summary-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 12px; font-weight: 600; }
                        .product-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
                        .product-name { font-weight: 500; }
                        .product-details { color: #666; font-size: 13px; }
                        .total-line { display: flex; justify-content: space-between; padding: 16px 0 0; font-size: 18px; font-weight: 700; }
                        .info-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 24px; }
                        .info-box p { margin: 0; color: #166534; font-size: 14px; line-height: 1.5; }
                        .footer { text-align: center; padding: 24px 30px; border-top: 1px solid #f0f0f0; }
                        .footer p { margin: 0; color: #999; font-size: 12px; }
                        .footer a { color: #000; text-decoration: none; font-weight: 500; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>LÉSION</h1>
                            <p>Confirmation de commande</p>
                        </div>
                        <div class="content">
                            <p class="greeting">Bonjour ${customerName} 👋</p>
                            <p class="intro">
                                Merci pour votre commande ! Votre paiement a été confirmé avec succès. 
                                Votre commande est maintenant en cours de préparation.
                            </p>

                            <!-- Order Tracking -->
                            <div class="tracker">
                                <div class="tracker-title">Suivi de votre commande</div>
                                <div class="steps">
                                    <div class="step step-active">
                                        <div class="step-icon">✓</div>
                                        <div class="step-name">Confirmée</div>
                                    </div>
                                    <div class="step step-active">
                                        <div class="step-icon">📦</div>
                                        <div class="step-name">En préparation</div>
                                    </div>
                                    <div class="step step-pending">
                                        <div class="step-icon">🚚</div>
                                        <div class="step-name">Expédiée</div>
                                    </div>
                                    <div class="step step-pending">
                                        <div class="step-icon">🏠</div>
                                        <div class="step-name">Livrée</div>
                                    </div>
                                </div>
                                <div class="progress-bar"><div class="progress-fill"></div></div>
                            </div>

                            <!-- Info -->
                            <div class="info-box">
                                <p>📬 <strong>Vous recevrez un email avec le numéro de suivi de votre colis dès qu'il sera expédié.</strong> La préparation prend généralement 24 à 48h ouvrées.</p>
                            </div>

                            <!-- Order Summary -->
                            <div class="order-summary">
                                <div class="summary-title">Récapitulatif</div>
                                ${lineItems.filter((item: any) => {
                                    const product = item.price?.product
                                    const name = product?.name || item.description || ''
                                    return name !== 'Frais de port'
                                }).map((item: any) => {
                                    const product = item.price?.product
                                    const name = product?.name || item.description || 'Produit'
                                    const desc = product?.description || ''
                                    const qty = item.quantity || 1
                                    const total = ((item.amount_total || 0) / 100).toFixed(2)
                                    return `<div class="product-item">
                                        <div>
                                            <div class="product-name">${name}</div>
                                            <div class="product-details">${desc ? desc + ' · ' : ''}Qté: ${qty}</div>
                                        </div>
                                        <div class="product-name">${total} €</div>
                                    </div>`
                                }).join('')}
                                <div class="product-item">
                                    <div class="product-details">Frais de port</div>
                                    <div class="product-details">3,90 €</div>
                                </div>
                                <div class="total-line">
                                    <span>Total</span>
                                    <span>${amountTotal} €</span>
                                </div>
                            </div>

                            <!-- Shipping Address -->
                            <div class="order-summary">
                                <div class="summary-title">Adresse de livraison</div>
                                <p style="margin: 0; line-height: 1.6;">${addressFormatted}</p>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Une question ? Contactez-nous à <a href="mailto:lesion.officelfr@gmail.com">lesion.officelfr@gmail.com</a></p>
                            <p style="margin-top: 8px;">LÉSION — Ce qui se brise peut renaître autrement</p>
                        </div>
                    </div>
                </body>
                </html>
                `

                await getResend().emails.send({
                    from: FROM_EMAIL,
                    to: customerEmail,
                    subject: `✅ Commande confirmée — LÉSION`,
                    html: customerEmailHtml,
                })

                console.log(`✅ Customer confirmation email sent to ${customerEmail}`)
            }

            console.log(`✅ Order notification email sent for session ${session.id}`)

        } catch (emailError) {
            console.error('❌ Error sending order notification email:', emailError)
            // Don't return error - we still want to acknowledge the webhook
        }
    }

    return NextResponse.json({ received: true })
}
