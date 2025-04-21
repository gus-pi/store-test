export const fetchCategories = async () => {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories')
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error fetching categoriest: ', error)
    }

}