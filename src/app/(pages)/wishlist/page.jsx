'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import Image from 'next/image'; // Import the Next.js Image component
import Docs from '../../UI/Docs'; // Assuming this path is correct
import { AddToCartButton } from '@/app/Components/cart/AddToCartButton';
import { Phone } from 'lucide-react';

const WishlistPage = () => {
  // Your hook now provides everything you need
  const { wishlist, removeFromWishlist, isLoading, error } = useWishlist();
  const totalPrice = wishlist.reduce((sum, product) => sum + product.price, 0);
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

  return (
    <div>
      <div className="lg:px-20 bg-zinc-100 p-5 max-sm:px-5 min-h-">
        <h1 className="text-4xl mb-6 max-sm:text-2xl font-medium font-sans">Your Wishlist</h1>
        <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-14">
          {wishlist.map((product) => {
            if (!product) return null; // Safety check in case of null data
              
            const displayImage = product.images?.[0]?.url || '/Images/placeholder.png';
            return (
              <div key={product.id} className="relative group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col p-2">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute text-xl bg-white rounded-full p-1.5 top-2 right-2 text-red-500 z-10 shadow-sm"
                >
                  <FaHeart />
                </button>

                <Link href={`/products/${product.id}`} className="flex flex-col flex-grow">
                  <div className="flex-grow flex justify-center items-center p-4 py-2 h-">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="max-h-full max-sm:h-[90px] w-auto object-contain"
                    />
                  </div>
                  <div className="p-3 py-1 border-t text-center">
                    <h1 className="text-[1.2rem] max-sm:text-[0.9rem] font-semibold truncate">{product.name}</h1>
                    <p className="font-bold text-sm max-sm:text-[13px] mt-1">₦{product.price.toLocaleString()}</p>
                    
                  </div>
                </Link>
                <AddToCartButton productId={product.id} />
              </div>
            );
          })}
        </div>
        
        <div className="text-center flex max-sm:flex-col justify-center rounded-[10px] w-auto gap-4">
          <div className='flex gap-2.5 items-center border-blue-500 border w-[300px] max-sm:w-[100%] justify-center p-2 rounded-[5px]'>
            <p className="text-gray-800 text-xl font-semibold">Total Price =</p>
            <p className="text-xl font-bold text-gray-600">₦{totalPrice.toLocaleString()}</p>
          </div>
          <button className='text-xl max-sm:w-[100%] max-sm:text-[14px] border border-blue-500 text-white rounded-[5px] bg-blue-500 hover:bg-blue-600 py-1.5 px-6 cursor-pointer font-semibold transition-colors flex gap-2 items-center justify-center'>
              <Phone className="max-sm:text-sm" size={28}/>
              Call to order
            </button>
        </div>
      </div>
      <Docs />
    </div>
  );
};

export default WishlistPage;