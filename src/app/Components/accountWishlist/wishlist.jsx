'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';

const API_URL = "https://favorite-server-0.onrender.com";

export const AccountWishlist = () => {
  // Your useWishlist hook now provides everything you need:
  const { wishlist, removeFromWishlist, isWishlisted, isLoading, error } = useWishlist();

  // 1. Show a spinner while the wishlist is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-5 min-h-[50vh]">
        <FaSpinner className="animate-spin text-blue-500" size={32}/> 
      </div>
    );
  }

  // 2. Show an error message if the fetch fails
  if (error) {
    return <div className="p-5 text-center text-red-500">Failed to load your wishlist. Please try again.</div>;
  }
  
  // 3. Show a message if the wishlist is empty
  // This check now happens after loading and error states are handled.
  if (!wishlist || wishlist.length === 0) {
    return <div className="p-5 text-center min-h-[50vh]">You have no items in your wishlist yet 💔</div>;
  }

  return (
    <div>
      <div className="bg-zinc-50 p-5 max-sm:px-0 rounded-xl min-h-[85vh]">
        <h1 className="text-4xl mb-6 max-sm:text-xl font-semibold font-sans">Your Wishlist</h1>
        <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlist.map((product) => {
            if (!product) return null; // Safety check for null products

            const imageUrl = product.image;

            return (
              <div key={product.id} className="relative group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute text-xl bg-white rounded-full p-1.5 top-2 right-2 text-red-500 z-10 shadow-sm"
                >
                  {/* On the wishlist page, the heart should always be full */}
                  <FaHeart />
                </button>

                <Link href={`/products/${product.id}`}>
                  <div className="px-4 max-sm:px-1.5 py-5 flex flex-col items-center">
                    <div className="h-32 flex items-center justify-center">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="max-h-[120px] w-auto object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <h1 className="text-sm font-semibold truncate">{product.name.slice(0, 12)}...</h1>
                      <p className="font-bold text-[1rem]">₦{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};