export type Category = {
    id: string,
    name: string,
    slug: string,
}

export type Filter = {
    category: string,
    searchQuery: string,
    priceRange: { label: string, min: number, max: number },

}

export type Product = {
    id: string,
    images: [string],
    title: string,
    description: string,
    category: Category,
    price: number
}
