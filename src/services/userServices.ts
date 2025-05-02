export const createUser = async (name: string, email: string, password: string, avatar: string) => {
    try {
        const response = await fetch(` https://api.escuelajs.co/api/v1/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                avatar,
            })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log('error registering user: ', error)
    }

}