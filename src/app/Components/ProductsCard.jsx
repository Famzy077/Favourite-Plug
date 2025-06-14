'use client';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isWishlisted, isMounted } = useWishlist();

  if (!product) return null;

  const isInWishlist = isWishlisted(product.id);

  return (
    <div className="relative flex flex-col border border-gray-300 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300">
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
        <div className="flex justify-center items-center mb-1 py-2">
          {/* <img
            src={product.image}
            alt={product.name}
            className="max-sm:h-[90px] h-[100px] object-fit rounded-lg"
          /> */}
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className='text-1.8 lg:font-semibold text-gray-800 font-medium truncate'>
            {product.name.slice(0, 10)}...
          </h3>
          <div className="flex items-baseline mt-2">
            <p className="text-[15px] max-sm:text-[11px] font-medium text-gray-800">₦{product.price}</p>
            <strike className="ml-2 text-[14px] max-sm:text-[14px] text-gray-500 line-through">
              ₦{product.oldPrice}
            </strike>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;