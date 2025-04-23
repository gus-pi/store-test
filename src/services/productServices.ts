export const fetchProducts = async (title: string, offset: number, limit: number, categoryId: string) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?title=${title}&offset=${offset}&limit=${limit}&categoryId=${categoryId}`)
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