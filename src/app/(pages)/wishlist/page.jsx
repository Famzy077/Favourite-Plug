'use client';
import React from 'react';
import Link from 'next/link';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import Docs from '../../UI/Docs';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';

const API_URL = "https://favorite-server-0.onrender.com";

const Wishlist = () => {
  // The hook now provides everything you need!
  const { wishlist, removeFromWishlist, isWishlisted, isLoading, error } = useWishlist();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[85vh]'>
        <FaSpinner className="animate-spin text-blue-500" size={32}/> 
      </div>
    );
  }

  if (error) {
    return <div className="p-5 text-center text-red-500">Error loading your wishlist. Please try again.</div>;
  }
  
  if (wishlist.length === 0) {
    return <div className="p-5 text-center min-h-[85vh]">You have no items in your wishlist yet 💔</div>;
  }

  return (
    <div>
      <div className="lg:px-20 bg-zinc-100 p-5 max-sm:px-5 min-h-[85vh]">
        <h1 className="text-4xl mb-6 max-sm:text-2xl font-medium font-sans">Your Wishlist</h1>
        <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-14">
          {wishlist.map((product) => (
            <div key={product.id} className="relative group">
              <div className="absolute text-xl bg-white rounded-full p-1.5 top-2 right-2 z-10 shadow-md cursor-pointer"
                onClick={() => removeFromWishlist(product.id)}
              >
                {/* Always show a full heart on the wishlist page */}
                <FaHeart className="text-red-500" />
              </div>

              <Link href={`/products/${product.id}`}>
                <div className="px-4 py-5 flex flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-center items-center mb-1 h-32">
                    <img
                      src={`${API_URL}/${product.image}`}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain rounded-lg"
                    />
                  </div>
                  <h1 className="text-sm font-semibold truncate mt-2">{product.name}</h1>
                  <p className="font-bold text-lg">₦{product.price.toLocaleString()}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Docs />
    </div>
  );
};

export default Wishlist;