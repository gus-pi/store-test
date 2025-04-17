export const fetchProducts = async (offset: number, limit: number) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error fetching products: ', error)
    }

}