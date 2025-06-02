'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('favoritePlugUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserId(parsed?.id || parsed?.email);
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (e) {
        console.error('Error parsing wishlist:', e);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isMounted]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.some((p) => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, userId, isMounted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};