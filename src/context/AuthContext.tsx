import { createContext, useEffect, useState } from 'react';
import { User } from '../lib/types';
import { getAuthenticatedUser } from '../services/authServices';

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('user-access-token');
      console.log(token);
      if (token) {
        const userData = await getAuthenticatedUser(token);
        setUser(userData);
        console.log('user: ', user);
      }
    } catch (error) {
      console.error('User not logged in');
      localStorage.removeItem('user-access-token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
