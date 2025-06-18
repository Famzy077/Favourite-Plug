'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import { AddToCartButton } from '../cart/AddToCartButton';
import { Phone } from 'lucide-react';

const API_URL = "https://favorite-server-0.onrender.com";

export const AccountWishlist = () => {
  // Your useWishlist hook now provides everything you need:
  const { wishlist, removeFromWishlist, isWishlisted, isLoading, error } = useWishlist();

  const totalPrice = wishlist.reduce((sum, product) => sum + product.price, 0);
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
    return (
      <div className="p-5 text-center h-[85vh] flex flex-col items-center justify-center">
        <p className="text-2xl mb-4">You have no items in your wishlist yet 💔</p>
        <Link href="/categories">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Start Exploring
            </button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-zinc-50 p-5 max-sm:px-3 rounded-xl scroll-auto overflow-y-auto overflow-visible">
        <h1 className="text-2xl mb-6 max-sm:text-xl font-semibold">Your Wishlist</h1>
        <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 max-md:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => {
            if (!product) return null; // Safety check for null products

            const displayImage = product.images && product.images.length > 0
            ? product.images[0].url
            : '/Images/placeholder.png'; // Fallback image if no images are available

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
                    <div className="p-2 flex items-center justify-center">
                      <Image
                        src={displayImage}
                        height={120}
                        width={120}
                        alt={product.name}
                        className="max-h-[120px] max-sm:h-[100px] w-auto object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <h1 className="text-sm max-sm:text-[12px] font-semibold truncate">{product.name.slice(0, 12)}...</h1>
                      <p className="font-bold text-[1rem] max-sm:text-[0.9rem]">₦{product.price.toLocaleString()}</p>
                      <AddToCartButton productId={product.id} />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8 flex max-sm:flex-col justify-start rounded-[10px] w-auto gap-4">
          <div className='flex gap-2.5 items-center border border-blue-500 w-[300px] max-sm:w-[100%] justify-center p-2 rounded-[5px]'>
            <p className="text-gray-800 text-xl max-sm:text-[1rem] font-semibold">Total Price =</p>
            <p className="text-xl max-sm:text-[0.9rem] font-bold text-gray-800">₦{totalPrice.toLocaleString()}</p>
          </div>
          <button className='text-xl max-sm:w-[100%] max-sm:text-[14px] border border-blue-500 text-white rounded-[5px] bg-blue-500 hover:bg-blue-600 py-1.5 px-6 cursor-pointer font-semibold transition-colors flex gap-2 items-center justify-center'>
              <Phone className="max-sm:text-sm" size={28}/>
              Call to order
            </button>
        </div>
      </div>
    </div>
  );
};