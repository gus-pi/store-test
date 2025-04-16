export const fetchProducts = async () => {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products')
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error fetching products: ', error)
    }

}