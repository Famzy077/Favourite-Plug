// 'use client';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminHome() {
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('favoritePlugUser');
//     console.log(storedUser)
//     const user = storedUser ? JSON.parse(storedUser) : null;

//     if (!user || user.role !== 'ADMIN') {
//       router.push('/home'); // Redirect to homepage if not admin
//     }
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//       <p className="mt-4">Welcome, admin! Select an option:</p>

//       <ul className="list-disc list-inside mt-4 space-y-2">
//         <li><a href="/admin/products" className="text-blue-500 underline">Manage Products</a></li>
//         <li><a href="/admin/orders" className="text-blue-500 underline">View Orders</a></li>
//         {/* Add more links here */}
//       </ul>
//     </div>
//   );
// }

"use client"
import { useState } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 999, stock: 10 },
    { id: 2, name: "Phone", price: 499, stock: 20 },
    { id: 3, name: "Headphones", price: 99, stock: 50 },
  ]);

  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", blocked: false },
    { id: 2, name: "Jane Smith", email: "jane@example.com", blocked: true },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", blocked: false },
  ]);

  // Add item to cart
  const addToCart = (product) => {
    if (product.stock > 0) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === productId);
      if (item.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + 1 } : p
      )
    );
  };

  // Block or unblock user
  const toggleUserBlock = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, blocked: !user.blocked } : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Admin Dashboard
      </h1>

      {/* Products Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`px-4 py-2 rounded-md text-white ${
                  product.stock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Cart is empty.</p>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600">
                    Price: ${item.price} | Quantity: {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Users Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-gray-600">Email: {user.email}</p>
                <p
                  className={`text-sm ${
                    user.blocked ? "text-red-500" : "text-green-500"
                  }`}
                >
                  Status: {user.blocked ? "Blocked" : "Active"}
                </p>
              </div>
              <button
                onClick={() => toggleUserBlock(user.id)}
                className={`px-4 py-2 rounded-md text-white ${
                  user.blocked
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {user.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}