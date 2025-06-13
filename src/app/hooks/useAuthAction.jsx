'use client';

import { useRouter } from 'next/navigation';
import { useWishlist } from './WishlistContext.jsx';

export const useAuthAction = () => {
  const router = useRouter();

  // This function will "wrap" any action that requires a user to be logged in.
  const withAuth = (actionToPerform) => {
    // Check for the authentication token in localStorage
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      // If the user is logged in, perform the action immediately.
      actionToPerform();
    } else {
      // If the user is NOT logged in:
      alert("Please log in to perform this action.");
      
      // 2. Redirect them to the login page.
      // We pass the current URL so we can send them back after they log in.
      router.push(`/login?redirect=${window.location.pathname}`);
    }
  };

  return { withAuth };
};
