'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '../redux/Store';

const queryClient = new QueryClient();

export default function PageProvider({ children }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('favoritePlugUser');

    if (!user) {
      router.replace('/login'); // Redirect to /login if not logged in
    } else {
      setCheckingAuth(false); // Allow page to render
    }
  }, [router]);

  if (checkingAuth) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {children} {/* ✅ Render whatever page is being routed */}
      </Provider>
    </QueryClientProvider>
  );
}
