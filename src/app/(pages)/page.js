'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import logo from '/public/Images/Logo1.png';
import Image from 'next/image';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/Store';
import { WishlistProvider } from '../hooks/WishlistContext.jsx';
import { CartProvider } from '../hooks/CartContext';
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
          <CartProvider>
          {children}
          </CartProvider>
        </WishlistProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
const PageProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [minDelayPassed, setMinDelayPassed] = useState(false);

  useEffect(() => {
    const minDelayTimer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 3000);

    const authToken = localStorage.getItem('authToken');

    if (pathname === '/') {
      router.replace('/home');
    } else {
      const protectedRoutes = ['/wishlist', '/account', '/admin', '/products'];
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

      if (!authToken && isProtectedRoute) {
        router.replace(`/login?redirect=${pathname}`);
      } else {
        setIsAuthorized(true);
      }
    }

    return () => clearTimeout(minDelayTimer);
  }, [router, pathname]);

  return (
    <>
      {(!isAuthorized || !minDelayPassed) ? (
        <div className='flex flex-col items-center justify-center min-h-[90vh]'>
          <Image src={logo} className='h-[100px] max-sm:h-[90px] max-sm:w-fit w-[230px]' alt="Loading Logo" />
          <FaSpinner className="animate-spin text-blue-500" size={40} />
        </div>
      ) : (
        <AllProviders>
          {children}
        </AllProviders>
      )}
    </>
  );
}
export default PageProvider;