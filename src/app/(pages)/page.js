'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import logo from '/public/Images/Logo1.png'
import Image from 'next/image';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux'; // Renamed to avoid clashes
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

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (pathname === '/') {
      router.replace('/home');
      return;
    }

    const protectedRoutes = ['/wishlist', '/account', '/admin', '/products'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!authToken && isProtectedRoute) {
      router.replace(`/login?redirect=${pathname}`);
      // Don't authorize yet, let the redirect happen
    } else {
      // If not a protected route, or if user has a token, they are clear to proceed.
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  // While checking, or during redirect, show a spinner.
  if (!isAuthorized) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[85vh]'>
        <Image src={logo} className='h-[100px] w-[230px]'/>
        <FaSpinner className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  // Once authorized, wrap the children with all the providers.
  return (
    <AllProviders>
      {children}
    </AllProviders>
  );
}
