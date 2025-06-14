'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import logo from '/public/Images/Logo1.png';
import Image from 'next/image';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/Store';
import { WishlistProvider } from '../hooks/WishlistContext.jsx';
import { FaSpinner } from 'react-icons/fa';

// This is a "singleton" instance. It's best to create it outside the component
// so it doesn't get re-created on every render.
const queryClient = new QueryClient();

// A dedicated component for all your providers. This is a clean pattern.
const AllProviders = ({ children }) => {
  return (
    // 1. QueryClientProvider is on the outside, providing the "umbrella".
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        {/* 2. WishlistProvider is now INSIDE, so it can use useQuery. */}
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default function PageProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  // New state to track if the minimum delay for the spinner has passed
  const [minDelayPassed, setMinDelayPassed] = useState(false);

  useEffect(() => {
    // --- 1. Set a timer for the minimum spinner display duration ---
    const minDelayTimer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 3000); // 3000ms = 3 seconds

    // --- 2. Authorization and Redirection Logic ---
    const authToken = localStorage.getItem('authToken');

    if (pathname === '/') {
      // Immediately redirect from '/' to '/home'
      router.replace('/home');
      // No need to setIsAuthorized here; the component will re-render
      // for '/home' and the authorization check will run again.
      // The spinner will still respect the minDelayTimer.
    } else {
      const protectedRoutes = ['/wishlist', '/account', '/admin', '/products'];
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

      if (!authToken && isProtectedRoute) {
        // If not authenticated and trying to access a protected route, redirect to login
        router.replace(`/login?redirect=${pathname}`);
      } else {
        // If not a protected route, or if user has a token for a protected route, they are cleared.
        setIsAuthorized(true);
      }
    }

    // --- Cleanup function for the useEffect ---
    // This ensures the timer is cleared if the component unmounts or
    // if the dependencies change and the effect re-runs.
    return () => {
      clearTimeout(minDelayTimer);
    };
  }, [router, pathname]); // Re-run effect if router or pathname changes

  // --- Spinner Rendering Logic ---
  // The spinner will be shown if:
  // 1. The user is NOT authorized YET (i.e., `isAuthorized` is false)
  // OR
  // 2. The minimum display delay has NOT passed YET (i.e., `minDelayPassed` is false)
  // This guarantees the spinner is visible for at least 3 seconds AND until authorization is confirmed.
  if (!isAuthorized || !minDelayPassed) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[85vh]'>
        <Image src={logo} className='h-[100px] w-[230px]' alt="Loading Logo"/> {/* Added alt text */}
        <FaSpinner className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  // --- Render Children (Main Content) ---
  // This code only runs when `isAuthorized` is true AND `minDelayPassed` is true.
  return (
    <AllProviders>
      {children}
    </AllProviders>
  );
}