'use client';
import { useEffect, useState } from 'react';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration-safe: wait until mounted
  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isMounted]);

  const addToWishlist = (product) => {
    if (!isWishlisted(product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return { wishlist, addToWishlist, removeFromWishlist, isWishlisted, isMounted };
};
