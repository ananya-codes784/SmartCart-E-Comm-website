import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client.js';
import { User } from '../types/index.js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  addAddress: (address: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('smartcart_token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = localStorage.getItem('smartcart_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/auth/profile');
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session expired or invalid token');
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success && data.token) {
        localStorage.setItem('smartcart_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message || 'Login failed' };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || 'Invalid email or password',
      };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      if (data.success && data.token) {
        localStorage.setItem('smartcart_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message || 'Registration failed' };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('smartcart_token');
    setToken(null);
    setUser(null);
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      // Local fallback for guest wishlist in localStorage
      const guestWishlistStr = localStorage.getItem('smartcart_guest_wishlist') || '[]';
      let guestList: string[] = JSON.parse(guestWishlistStr);
      if (guestList.includes(productId)) {
        guestList = guestList.filter(id => id !== productId);
      } else {
        guestList.push(productId);
      }
      localStorage.setItem('smartcart_guest_wishlist', JSON.stringify(guestList));
      setUser(prev => prev ? { ...prev, wishlist: guestList } : { id: 'guest', name: 'Guest', email: '', role: 'customer', wishlist: guestList });
      return;
    }

    try {
      const { data } = await api.post('/auth/wishlist', { productId });
      if (data.success) {
        setUser(prev => prev ? { ...prev, wishlist: data.wishlist } : null);
      }
    } catch (err) {
      console.error('Failed to update wishlist:', err);
    }
  };

  const isInWishlist = (productId: string) => {
    if (user?.wishlist) {
      return user.wishlist.includes(productId);
    }
    const guestWishlistStr = localStorage.getItem('smartcart_guest_wishlist') || '[]';
    const guestList: string[] = JSON.parse(guestWishlistStr);
    return guestList.includes(productId);
  };

  const addAddress = async (address: any) => {
    if (!user) return false;
    try {
      const { data } = await api.post('/auth/address', address);
      if (data.success) {
        setUser(prev => prev ? { ...prev, addresses: data.addresses } : null);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        toggleWishlist,
        isInWishlist,
        addAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
