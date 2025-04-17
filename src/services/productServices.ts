export const fetchProducts = async () => {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=8')
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error fetching products: ', error)
    }

}