'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '@/data/products'

export interface PackConfig {
    vetement: { id: string; name: string }
    accessoire: { id: string; name: string }
    totalPrice: number
}

export interface CartItem {
    product: Product
    quantity: number
    size?: string
    packConfig?: PackConfig
    customPrice?: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (product: Product, size?: string, packConfig?: PackConfig) => void
    removeFromCart: (productId: string, size?: string, packConfigKey?: string) => void
    updateQuantity: (productId: string, quantity: number, size?: string, packConfigKey?: string) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
    isCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('lesion-cart')
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error('Error loading cart:', e)
            }
        }
        setIsHydrated(true)
    }, [])

    // Save cart to localStorage on change
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('lesion-cart', JSON.stringify(items))
        }
    }, [items, isHydrated])

    // Helper to create a unique key for pack configurations
    const getPackConfigKey = (packConfig?: PackConfig) => {
        if (!packConfig) return ''
        return `${packConfig.vetement.id}-${packConfig.accessoire.id}`
    }

    const addToCart = (product: Product, size?: string, packConfig?: PackConfig) => {
        setItems(currentItems => {
            const packConfigKey = getPackConfigKey(packConfig)
            const existingItem = currentItems.find(
                item => item.product.id === product.id &&
                    item.size === size &&
                    getPackConfigKey(item.packConfig) === packConfigKey
            )

            if (existingItem) {
                return currentItems.map(item =>
                    item.product.id === product.id &&
                        item.size === size &&
                        getPackConfigKey(item.packConfig) === packConfigKey
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...currentItems, {
                product,
                quantity: 1,
                size,
                packConfig,
                customPrice: packConfig?.totalPrice
            }]
        })
    }

    const removeFromCart = (productId: string, size?: string, packConfigKey?: string) => {
        setItems(currentItems =>
            currentItems.filter(
                item => !(item.product.id === productId &&
                    item.size === size &&
                    getPackConfigKey(item.packConfig) === (packConfigKey || ''))
            )
        )
    }

    const updateQuantity = (productId: string, quantity: number, size?: string, packConfigKey?: string) => {
        if (quantity <= 0) {
            removeFromCart(productId, size, packConfigKey)
            return
        }

        setItems(currentItems =>
            currentItems.map(item =>
                item.product.id === productId &&
                    item.size === size &&
                    getPackConfigKey(item.packConfig) === (packConfigKey || '')
                    ? { ...item, quantity }
                    : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

    const totalPrice = items.reduce((sum, item) => {
        // Use customPrice (from pack config) if available, otherwise parse from product price
        const price = item.customPrice ?? parseFloat(item.product.price.replace(' €', '').replace(',', '.'))
        return sum + price * item.quantity
    }, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
