export type Category = {
    id: number,
    name: string,
    slug: string,
}

export type Filter = {
    category: string,
    title: string,
    priceRange: { min: number, max: number }

}

export type Product = {
    id: string,
    images: string[],
    title: string,
    description: string,
    category: Category,
    price: number
}

export type CartItem = Product & {
    quantity: number
}

export type User = {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string
}