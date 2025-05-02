import { createContext, useEffect, useState } from 'react';
import { User } from '../lib/types';
import { getAuthenticatedUser } from '../services/authServices';

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('user-access-token');
      if (token) {
        const userData = await getAuthenticatedUser(token);
        setUser(userData);
      }
    } catch (error) {
      console.error('User not logged in');
      localStorage.removeItem('user-access-token');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user-access-token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
