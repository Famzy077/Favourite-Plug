// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Provider } from 'react-redux';
// import store from '../redux/Store';
// import { WishlistProvider } from '../hooks/WishlistContext.jsx';

// const queryClient = new QueryClient();

// export default function PageProvider({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const user = localStorage.getItem('favoritePlugUser');

//     // Redirect '/' to '/home'
//     if (pathname === '/') {
//       router.replace('/home');
//       return;
//     }
//     const protectedRoutes = ['/wishlist', '/account', 'products:/id', '/admin'];
//     const isProtected = protectedRoutes.includes(pathname);

//     if (!user && isProtected) {
//       router.replace('/login');
//       return;
//     }

//     setCheckingAuth(false);
//   }, [router, pathname]);

//   if (checkingAuth) return null;

//   return (
//     <WishlistProvider>
//       <QueryClientProvider client={queryClient}>
//         <Provider store={store}>
//           {children}
//         </Provider>
//       </QueryClientProvider>
//     </WishlistProvider>
//   );
// }
'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '../redux/Store';
import { WishlistProvider } from '../hooks/WishlistContext.jsx';
import { FaSpinner } from 'react-icons/fa';

const queryClient = new QueryClient();

export default function PageProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // --- DEBUG LOG #1: What token do we have? ---
    const authToken = localStorage.getItem('authToken');
    console.log('1. Auth Token found in localStorage:', authToken);

    if (pathname === '/') {
      router.replace('/home');
      return;
    }

    const protectedRoutes = ['/wishlist', '/account', '/admin', '/products'];
    
    // --- DEBUG LOG #2: What is the exact path? ---
    console.log('2. Current Pathname:', pathname);

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    // --- DEBUG LOG #3: Is the route considered protected? ---
    console.log('3. Is this route protected?', isProtectedRoute);

    if (!authToken && isProtectedRoute) {
      console.log('4. REDIRECTING to /login...');
      router.replace(`/login?redirect=${pathname}`);
      return;
    }

    setCheckingAuth(false);
  }, [router, pathname]);

  if (checkingAuth) {
    return (
      <div className='flex items-center justify-center min-h-[85vh]'>
        <FaSpinner size={32} className="animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <WishlistProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {children}
        </Provider>
      </QueryClientProvider>
    </WishlistProvider>
  );
}