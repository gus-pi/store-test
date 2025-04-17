export type Category = {
    id: string,
    name: string,
    slug: string,
}
export type Product = {
    images: [string],
    title: string,
    description: string,
    category: Category,
    price: number
}
