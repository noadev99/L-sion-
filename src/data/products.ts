// Types
export interface PackOption {
    id: string
    name: string
    type: 'vetement' | 'accessoire'
    priceModifier: number // 0 for base, or additional price
}

export interface Product {
    id: string
    name: string
    price: string
    category: 'T-shirt' | 'Hoodie' | 'Pull' | 'Sweat' | 'Casquette' | 'Bonnet' | 'Box' | 'Bob'
    collection: 'nouvelle-renaissance' | 'souvenir-bleu' | 'floraison' | 'ete-2026'
    collectionName: string
    images: string[]
    inStock: boolean
    sizes?: string[]
    tag?: string
    description?: string
    isConfigurable?: boolean
    packOptions?: {
        vetements: PackOption[]
        accessoires: PackOption[]
        basePrice: number
    }
}

// Collection Nouvelle Renaissance (Rose)
const nouvelleRenaissance: Product[] = [
    {
        id: 'pack-premium-rose',
        name: 'Pack Premium Rose',
        price: '50 €',
        category: 'Box',
        collection: 'nouvelle-renaissance',
        collectionName: 'Nouvelle Renaissance',
        images: ['/images/boite-rose.png'],
        inStock: false,
        tag: 'Rupture',
        description: 'Pack premium exclusif de la collection Nouvelle Renaissance. Contient un t-shirt rose et une casquette rose.'
    },
    {
        id: 'tshirt-nouvelle-renaissance-rose',
        name: 'T-shirt Nouvelle Renaissance Rose',
        price: '30 €',
        category: 'T-shirt',
        collection: 'nouvelle-renaissance',
        collectionName: 'Nouvelle Renaissance',
        images: ['/images/IMG_3566.JPG', '/images/IMG_3567.JPG'],
        inStock: false,
        tag: 'Rupture',
        description: 'T-shirt de la collection Nouvelle Renaissance, design rose élégant.'
    },
    {
        id: 'casquette-rose',
        name: 'Casquette Rose',
        price: '25 €',
        category: 'Casquette',
        collection: 'nouvelle-renaissance',
        collectionName: 'Nouvelle Renaissance',
        images: ['/images/casquette-rose-1.png', '/images/casquette-rose-2.png', '/images/casquette-rose-3.png'],
        inStock: true,
        tag: 'Disponible',
        description: 'Casquette rose de la collection Nouvelle Renaissance. Design unique et élégant.'
    },
]

// Collection Souvenir Bleu
const souvenirBleu: Product[] = [
    {
        id: 'pack-souvenir-bleu',
        name: 'Pack Souvenir Bleu',
        price: '50 €',
        category: 'Box',
        collection: 'souvenir-bleu',
        collectionName: 'Souvenir Bleu',
        images: ['/images/boite-bleu.png'],
        inStock: false,
        tag: 'Rupture',
        isConfigurable: true,
        packOptions: {
            vetements: [
                { id: 'tshirt', name: 'T-shirt Souvenir Bleu', type: 'vetement', priceModifier: 0 },
                { id: 'hoodie', name: 'Hoodie Souvenir Bleu', type: 'vetement', priceModifier: 25 },
            ],
            accessoires: [
                { id: 'casquette', name: 'Casquette Bleue', type: 'accessoire', priceModifier: 0 },
                { id: 'bonnet', name: 'Bonnet Bleu', type: 'accessoire', priceModifier: 0 },
            ],
            basePrice: 50
        },
        description: 'Composez votre pack ! Choisissez votre vêtement (T-shirt ou Hoodie) et votre accessoire (Casquette ou Bonnet).'
    },
    {
        id: 'tshirt-souvenir-bleu',
        name: 'T-shirt Souvenir Bleu',
        price: '30 €',
        category: 'T-shirt',
        collection: 'souvenir-bleu',
        collectionName: 'Souvenir Bleu',
        images: ['/images/t-shirt-souvenir-bleu-1.png', '/images/t-shirt-souvenir-bleu-2.png'],
        inStock: false,
        tag: 'Rupture',
        description: 'T-shirt iconique de la collection Souvenir Bleu. Design bleu signature de la marque.'
    },
    {
        id: 'hoodie-souvenir-bleu',
        name: 'Hoodie Souvenir Bleu',
        price: '55 €',
        category: 'Hoodie',
        collection: 'souvenir-bleu',
        collectionName: 'Souvenir Bleu',
        images: ['/images/pull-souvenir-bleu-1.png', '/images/pull-souvenir-bleu-2.png'],
        inStock: false,
        tag: 'Rupture',
        description: 'Hoodie confortable de la collection Souvenir Bleu. Parfait pour un look décontracté.'
    },
    {
        id: 'casquette-bleue',
        name: 'Casquette Bleue',
        price: '25 €',
        category: 'Casquette',
        collection: 'souvenir-bleu',
        collectionName: 'Souvenir Bleu',
        images: ['/images/casquette-bleu-1.png', '/images/casquette-bleu-2.png', '/images/casquette-bleu-3.png'],
        inStock: true,
        tag: 'Disponible',
        description: 'Casquette bleue de la collection Souvenir Bleu. Design classique et intemporel.'
    },
    {
        id: 'bonnet-souvenir-bleu',
        name: 'Bonnet Souvenir Bleu',
        price: '25 €',
        category: 'Bonnet',
        collection: 'souvenir-bleu',
        collectionName: 'Souvenir Bleu',
        images: ['/images/bonnet-souvenir-bleu.png'],
        inStock: true,
        tag: 'Disponible',
        description: 'Bonnet chaleureux de la collection Souvenir Bleu. Idéal pour les journées fraîches.'
    },
]

// Collection Floraison
const floraison: Product[] = [
    {
        id: 'sweat-floraison',
        name: 'Sweat Floraison en Laine',
        price: '70 €',
        category: 'Sweat',
        collection: 'floraison',
        collectionName: 'Floraison',
        images: ['/images/pull-floraison-front.jpg', '/images/pull-floraison-back.jpg'],
        inStock: true,
        sizes: ['M', 'L'],
        tag: 'Disponible',
        description: 'Sweat en laine de la collection Floraison. Disponible en taille M et L. Confection artisanale de qualité.'
    },
    {
        id: 'casquette-verte-velours',
        name: 'Casquette Verte en Velours',
        price: '25 €',
        category: 'Casquette',
        collection: 'floraison',
        collectionName: 'Floraison',
        images: ['/images/casquette-verte.jpg'],
        inStock: false,
        tag: 'Rupture',
        description: 'Casquette en velours vert de la collection Floraison. Texture unique et élégante.'
    },
]

// Collection Été 2026 - Bobs
const ete2026: Product[] = [
    {
        id: 'bob-bleu-marine',
        name: 'Bob Bleu Marine',
        price: '25 €',
        category: 'Bob',
        collection: 'ete-2026',
        collectionName: 'Été 2026',
        images: ['/images/bob-bleu.png'],
        inStock: true,
        tag: 'Nouveau',
        description: 'Bob bleu marine de la collection Été 2026. Coupe classique en coton premium, parfait pour l\'été.',
    },
    {
        id: 'bob-kaki',
        name: 'Bob Kaki',
        price: '25 €',
        category: 'Bob',
        collection: 'ete-2026',
        collectionName: 'Été 2026',
        images: ['/images/bob-kaki.png'],
        inStock: true,
        tag: 'Nouveau',
        description: 'Bob kaki de la collection Été 2026. Teinte naturelle et élégante pour un look estival.',
    },
    {
        id: 'bob-noir',
        name: 'Bob Noir',
        price: '25 €',
        category: 'Bob',
        collection: 'ete-2026',
        collectionName: 'Été 2026',
        images: ['/images/bob-noir.png'],
        inStock: true,
        tag: 'Nouveau',
        description: 'Bob noir de la collection Été 2026. L\'intemporel revisité, en coton premium.',
    },
]

// Export all products
export const allProducts: Product[] = [
    ...nouvelleRenaissance,
    ...souvenirBleu,
    ...floraison,
    ...ete2026,
]

// Vêtements (T-shirts, Hoodies, Pulls, Sweats)
export const vetements: Product[] = allProducts.filter(p =>
    ['T-shirt', 'Hoodie', 'Pull', 'Sweat'].includes(p.category)
)

// Accessoires (Casquettes, Bonnets, Box, Bobs)
export const accessoires: Product[] = allProducts.filter(p =>
    ['Casquette', 'Bonnet', 'Box', 'Bob'].includes(p.category)
)

// Bobs only
export const bobs: Product[] = allProducts.filter(p => p.category === 'Bob')

// Collections
export const collections = {
    'nouvelle-renaissance': {
        id: 'nouvelle-renaissance',
        name: 'Nouvelle Renaissance',
        description: 'Collection rose élégante et raffinée',
        products: nouvelleRenaissance,
    },
    'souvenir-bleu': {
        id: 'souvenir-bleu',
        name: 'Souvenir Bleu',
        description: 'Collection bleue signature de la marque',
        products: souvenirBleu,
    },
    'floraison': {
        id: 'floraison',
        name: 'Floraison',
        description: 'Collection florale aux textures uniques',
        products: floraison,
    },
    'ete-2026': {
        id: 'ete-2026',
        name: 'Été 2026',
        description: 'Les nouveaux bobs pour l\'été',
        products: ete2026,
    },
}

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
    return allProducts.find(p => p.id === id)
}

// Helper function to get products by collection
export function getProductsByCollection(collectionId: string): Product[] {
    return allProducts.filter(p => p.collection === collectionId)
}
