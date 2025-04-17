export type Category = {
    id: string,
    name: string,
    slug: string,
}
export type Product = {
    id: string,
    images: [string],
    title: string,
    description: string,
    category: Category,
    price: number
}
