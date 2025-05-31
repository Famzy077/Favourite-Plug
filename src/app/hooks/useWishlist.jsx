// import { useEffect, useState } from 'react';

// export const useWishlist = (userId) => {
//   const [wishlist, setWishlist] = useState([]);
//   const [isMounted, setIsMounted] = useState(false);

//   const storageKey = userId ? `wishlist_${userId}` : 'wishlist';

//   // Load wishlist on mount
//   useEffect(() => {
//     const loadWishlist = () => {
//       const stored = localStorage.getItem(storageKey);
//       if (stored) {
//         try {
//           setWishlist(JSON.parse(stored));
//         } catch (error) {
//           console.error('Error parsing wishlist:', error);
//           setWishlist([]);
//         }
//       } else {
//         setWishlist([]);
//       }
//     };

//     loadWishlist();
//     setIsMounted(true);

//     // Listen to changes across tabs/windows/pages
//     const handleStorageChange = (e) => {
//       if (e.key === storageKey) {
//         loadWishlist();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [storageKey]);

//   // Save wishlist to localStorage on update
//   useEffect(() => {
//     if (isMounted) {
//       localStorage.setItem(storageKey, JSON.stringify(wishlist));
//     }
//   }, [wishlist, storageKey, isMounted]);

//   const addToWishlist = (product) => {
//     if (!isWishlisted(product.id)) {
//       const updated = [...wishlist, product];
//       setWishlist(updated);
//     }
//   };

//   const removeFromWishlist = (productId) => {
//     const updated = wishlist.filter((item) => item.id !== productId);
//     setWishlist(updated);
//   };

//   const isWishlisted = (productId) => {
//     return wishlist.some((item) => item.id === productId);
//   };

//   return {
//     wishlist,
//     addToWishlist,
//     removeFromWishlist,
//     isWishlisted,
//     isMounted,
//   };
// };

// app/hooks/useWishlist.js
import { useEffect, useState, useMemo } from 'react';

export const useWishlist = (userId) => {
  console.log(`%cuseWishlist HOOK INIT with userId: ${userId}`, 'color: blue; font-weight: bold;');

  const [wishlist, setWishlist] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // To prevent issues before client-side hydration

  // Determine the storage key based on userId
  const storageKey = useMemo(() => {
    const key = userId ? `wishlist_${userId}` : 'wishlist_guest'; // Changed 'wishlist' to 'wishlist_guest' for clarity
    console.log(`%cuseWishlist: storageKey determined as: ${key} (userId: ${userId})`, 'color: blue;');
    return key;
  }, [userId]);

  // EFFECT 1: Load wishlist from localStorage on mount or when storageKey changes
  useEffect(() => {
    console.log(`%cEFFECT 1 (Load): Triggered. storageKey: ${storageKey}`, 'color: green;');

    const loadWishlist = () => {
      console.log(`%cEFFECT 1 (Load): Attempting to load from localStorage key: ${storageKey}`, 'color: green;');
      const storedWishlist = localStorage.getItem(storageKey);
      if (storedWishlist) {
        try {
          const parsedWishlist = JSON.parse(storedWishlist);
          console.log(`%cEFFECT 1 (Load): Found and parsed wishlist from localStorage for ${storageKey}:`, 'color: green;', parsedWishlist);
          setWishlist(parsedWishlist);
        } catch (error) {
          console.error(`%cEFFECT 1 (Load): Error parsing wishlist for ${storageKey} from localStorage:`, 'color: red;', error);
          setWishlist([]); // Set to empty if parsing fails
        }
      } else {
        console.log(`%cEFFECT 1 (Load): No wishlist found in localStorage for ${storageKey}. Setting to empty array.`, 'color: green;');
        setWishlist([]); // Initialize if nothing is stored
      }
    };

    loadWishlist();
    setIsMounted(true); // Mark as mounted after the first load attempt for the current storageKey
    console.log(`%cEFFECT 1 (Load): setIsMounted(true). storageKey: ${storageKey}`, 'color: green;');

    // Listener for storage changes across tabs/windows
    const handleStorageChange = (event) => {
      if (event.key === storageKey) {
        console.log(`%cEFFECT 1 (Load - Storage Event): Detected storage change for ${storageKey}. Reloading.`, 'color: green;');
        loadWishlist(); // Reload wishlist if changed in another tab
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      console.log(`%cEFFECT 1 (Load): Cleanup. Removing storage listener for ${storageKey}.`, 'color: green;');
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [storageKey]); // Re-run this effect if storageKey changes

  // EFFECT 2: Save wishlist to localStorage when wishlist state changes
  useEffect(() => {
    console.log(`%cEFFECT 2 (Save): Triggered. isMounted: ${isMounted}, storageKey: ${storageKey}`, 'color: orange;');
    if (isMounted) {
      try {
        console.log(`%cEFFECT 2 (Save): Saving to localStorage key '${storageKey}':`, 'color: orange; font-weight: bold;', wishlist);
        localStorage.setItem(storageKey, JSON.stringify(wishlist));
        console.log(`%cEFFECT 2 (Save): Successfully saved to ${storageKey}.`, 'color: orange;');
      } catch (error) {
        console.error(`%cEFFECT 2 (Save): Error saving wishlist to localStorage for ${storageKey}:`, 'color: red;', error);
      }
    } else {
      console.log(`%cEFFECT 2 (Save): Not saving because isMounted is false. storageKey: ${storageKey}`, 'color: orange;');
    }
  }, [wishlist, storageKey, isMounted]); // Re-run if wishlist, storageKey, or isMounted changes

  const addToWishlist = (product) => {
    console.log('%caddToWishlist: Called with product:', 'color: purple;', product);
    if (!product || typeof product.id === 'undefined') {
      console.error('%caddToWishlist: Product or product.id is undefined. Aborting.', 'color: red;', product);
      return;
    }

    setWishlist((currentWishlist) => {
      console.log('%caddToWishlist: Inside setWishlist callback. Current (prev) wishlist:', 'color: purple;', currentWishlist);
      const productExists = currentWishlist.some(item => item.id === product.id);
      if (!productExists) {
        const updatedWishlist = [...currentWishlist, product];
        console.log('%caddToWishlist: Product does not exist. New wishlist will be:', 'color: purple; font-weight: bold;', updatedWishlist);
        return updatedWishlist;
      }
      console.log('%caddToWishlist: Product already exists. Wishlist unchanged.', 'color: purple;');
      return currentWishlist; // Return current state if product already exists
    });
  };

  const removeFromWishlist = (productId) => {
    console.log('%cremoveFromWishlist: Called with productId:', 'color: purple;', productId);
    setWishlist((currentWishlist) => {
      console.log('%cremoveFromWishlist: Inside setWishlist callback. Current (prev) wishlist:', 'color: purple;', currentWishlist);
      const updatedWishlist = currentWishlist.filter(item => item.id !== productId);
      if (updatedWishlist.length !== currentWishlist.length) {
        console.log('%cremoveFromWishlist: Product removed. New wishlist will be:', 'color: purple; font-weight: bold;', updatedWishlist);
      } else {
        console.log('%cremoveFromWishlist: Product not found or no change. Wishlist unchanged.', 'color: purple;');
      }
      return updatedWishlist;
    });
  };

  const isWishlisted = (productId) => {
    const exists = wishlist.some(item => item.id === productId);
    // console.log(`%cisWishlisted: Check for productId '${productId}'. Exists: ${exists}. Current wishlist:`, 'color: teal;', wishlist);
    return exists;
  };

  // Expose isMounted, might be useful for UI to show loading state
  return { wishlist, addToWishlist, removeFromWishlist, isWishlisted, isMounted };
};