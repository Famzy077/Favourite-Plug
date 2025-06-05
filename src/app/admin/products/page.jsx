// /app/admin/products/page.jsx
'use client';
import { useEffect, useState } from 'react';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your API or local JSON
    fetch('/api/products') // or load local data temporarily
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">₦{p.price}</td>
              <td className="p-2 border">
                <button className="bg-yellow-400 px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 px-2 py-1 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
