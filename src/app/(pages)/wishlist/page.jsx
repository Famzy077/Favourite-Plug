'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import Image from 'next/image'; // Import the Next.js Image component
import Docs from '../../UI/Docs'; // Assuming this path is correct

const WishlistPage = () => {
  // Your hook now provides everything you need
  const { wishlist, removeFromWishlist, isLoading, error } = useWishlist();

  // 1. Show a spinner while the wishlist data is being fetched
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[85vh]'>
        <FaSpinner className="animate-spin text-blue-500" size={32}/> 
      </div>
    );
  }

  // 2. Show a clear error message if the API call fails
  if (error) {
    return <div className="p-5 text-center text-red-500">Error loading your wishlist. Please try again.</div>;
  }
  
  // 3. Show a helpful message if the wishlist is empty
  if (!wishlist || wishlist.length === 0) {
    return (
        <div className="p-5 text-center min-h-[85vh] flex flex-col items-center justify-center">
            <p className="text-2xl mb-4">You have no items in your wishlist yet 💔</p>
            <Link href="/categories">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                    Start Exploring
                </button>
            </Link>
        </div>
    );
  }

  // NOTE: No need to check for a token here. The '/wishlist' route is already
  // protected by your main PageProvider, so a user can't see this component
  // unless they are already logged in.

  return (
    <div>
      <div className="lg:px-20 bg-zinc-100 p-5 max-sm:px-5 min-h-screen">
        <h1 className="text-4xl mb-6 max-sm:text-2xl font-medium font-sans">Your Wishlist</h1>
        <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-14">
          {wishlist.map((product) => {
            if (!product) return null; // Safety check in case of null data

            return (
              <div key={product.id} className="relative group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute text-xl bg-white rounded-full p-1.5 top-2 right-2 text-red-500 z-10 shadow-sm"
                >
                  <FaHeart />
                </button>

                <Link href={`/products/${product.id}`} className="flex flex-col flex-grow">
                  <div className="flex-grow flex justify-center items-center p-4 h-40">
                    {/* The src={product.image} now works perfectly because
                        the new data in your database contains the full Cloudinary URL */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                  <div className="p-3 border-t text-center">
                    <h1 className="text-sm font-semibold truncate">{product.name}</h1>
                    <p className="font-bold text-lg mt-1">₦{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Docs />
    </div>
  );
};

export default WishlistPage;