export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Login failed: ${errorData.message || response.statusText}`);
      return;
    }
    const data = await response.json();
    localStorage.setItem('user-access-token', data.access_token);
    return data;
  } catch (error) {
    console.log('error fetching categoriest: ', error);
  }
};

export const getAuthenticatedUser = async (token: string) => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error fetching user: ${errorData.message || response.statusText}`);
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error fetching user: ', error);
  }
};