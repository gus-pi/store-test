import { Product } from "../lib/types"

export const fetchProducts = async (title: string, offset: number, limit: number, categoryId: string, priceMin: number, priceMax: number) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?price_min=${priceMin}&price_max=${priceMax}&title=${title}&offset=${offset}&limit=${limit}&categoryId=${categoryId}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error fetching products: ', error)
    }
}

export const fetchSingleProduct = async (id: string) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error fetching product: ', error)
    }

}

export const createProduct = async (product: Product) => {
    const productToCreate = {
        title: product.title,
        price: product.price,
        description: product.description,
        categoryId: product.category,
        images: product.images
    }
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ productToCreate }),
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error creating product: ', error)
    }
}