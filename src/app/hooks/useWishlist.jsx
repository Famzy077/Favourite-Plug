import { useEffect, useState } from 'react';

export const useWishlist = (userId) => {
  const [wishlist, setWishlist] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const storageKey = userId ? `wishlist_${userId}` : 'wishlist';

  // Load wishlist on mount
  useEffect(() => {
    const loadWishlist = () => {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          setWishlist(JSON.parse(stored));
        } catch (error) {
          console.error('Error parsing wishlist:', error);
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    };

    loadWishlist();
    setIsMounted(true);

    // Listen to changes across tabs/windows/pages
    const handleStorageChange = (e) => {
      if (e.key === storageKey) {
        loadWishlist();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey]);

  // Save wishlist to localStorage on update
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    }
  }, [wishlist, storageKey, isMounted]);

  const addToWishlist = (product) => {
    if (!isWishlisted(product.id)) {
      const updated = [...wishlist, product];
      setWishlist(updated);
    }
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
    isMounted,
  };
};