'use client';
import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/app/hooks/useWishlist';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Image from 'next/image';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, isWishlisted } = useWishlist();

  if (wishlist.length === 0) {
    return <div className="p-5 text-center max-sm:h-[85vh]">No items in your wishlist 💔</div>;
  }
  console.log(wishlist)
  return (
    <div className="lg:px-20 bg-zinc-100 p-5 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Your Wishlist ❤️</h1>
      <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-[90vh]">
        {wishlist.map((product) => (
          <div key={product.id} className="relative">
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="absolute text-xl bg-pink-200 rounded-full p-1.5 top-2 right-2 text-red-500 z-10"
            >
              {isWishlisted(product.id) ? <FaHeart /> : <FaRegHeart />}
            </button>

            <Link href={`/products/${product.id}`}>
              <div className="px-4 py-5 flex flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center items-center mb-1">
                  <Image src={product.image} width={100} height={150} alt={product.name} className="h-[100px] object-fit rounded-lg" />
                </div>
                <h1 className="text-sm font-semibold">{product.name.slice(0, 10)}...</h1>
                <p>₦{product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
