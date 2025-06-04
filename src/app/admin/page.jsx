'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('favoritePlugUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || user.role !== 'admin') {
      router.push('/home'); // Redirect to homepage if not admin
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Welcome, admin! Select an option:</p>

      <ul className="list-disc list-inside mt-4 space-y-2">
        <li><a href="/admin/products" className="text-blue-500 underline">Manage Products</a></li>
        <li><a href="/admin/orders" className="text-blue-500 underline">View Orders</a></li>
        {/* Add more links here */}
      </ul>
    </div>
  );
}
