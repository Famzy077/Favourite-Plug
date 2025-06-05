// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation';
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

//     // If not logged in and trying to access protected routes
//     const protectedRoutes = ['/home', 'categories', '/wishlist', '/account', '/admin']; // add others if needed
//     const isProtected = protectedRoutes.includes(pathname);

//     if (!user && isProtected) {
//       router.replace('/login');
//     } else {
//       setCheckingAuth(false); // Important: allow children to render
//     }
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

const queryClient = new QueryClient();

export default function PageProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('favoritePlugUser');

    // Redirect '/' to '/home'
    if (pathname === '/') {
      router.replace('/home');
      return;
    }

    const protectedRoutes = ['/home', '/categories', '/wishlist', '/account', '/admin'];
    const isProtected = protectedRoutes.includes(pathname);

    if (!user && isProtected) {
      router.replace('/login');
      return;
    }

    setCheckingAuth(false);
  }, [router, pathname]);

  if (checkingAuth) return null;

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
