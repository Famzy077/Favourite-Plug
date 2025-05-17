'use client';
import Page from './home/page';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '../redux/Store';

const queryClient = new QueryClient();

export default function Home() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('favoritePlugUser');
    
    if (!user) {
      router.replace('/login'); // ⛔ Redirect to /login if not logged in
    } else {
      setCheckingAuth(false); // ✅ Allow homepage to render
    }
  }, [router]);

  if (checkingAuth) return null; // Prevent flicker while checking auth

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <Page/>
      </Provider>
    </QueryClientProvider>
  );
}
