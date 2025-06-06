'use client';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx'; // Updated path

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isWishlisted, isMounted } = useWishlist();

  if (!product) return null;

  const isInWishlist = isWishlisted(product.id);

  return (
    <div className="relative px-4 max-sm:px-2 py-5 flex flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      {isMounted && (
        <button
          onClick={() => {
            if (isInWishlist) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist(product);
            }
          }}
          className="absolute text-[17px] bg-pink-200 rounded-full p-1.5 top-2 right-2 text-red-500 z-10"
        >
          {isInWishlist ? <FaHeart /> : <FaRegHeart />}
        </button>
      )}

      <Link href={`/products/${product.id}`}>
        <div className="flex justify-center items-center mb-1">
          <img
            src={product.image}
            alt={product.name}
            className="max-sm:h-[90px] h-[100px] object-fit rounded-lg"
          />
        </div>
        <h2 className="text-sm max-sm:text-[15px] font-bold max-sm:font-light cursor-pointer">
          {product.name.slice(0, 10)}...
        </h2>
        <div className="max-sm:flex max-sm:items-center max-sm:gap-2">
          <p className="text-gray-600 text-sm max-sm:text-[11px]">₦{product.price}</p>
          <strike className="text-gray-600 relative max-sm:top-0 -top-1.5 text-sm max-sm:text-[11px]">
            ₦{product.oldPrice}
          </strike>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;