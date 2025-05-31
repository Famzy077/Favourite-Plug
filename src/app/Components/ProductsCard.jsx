// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { useWishlist } from '@/app/hooks/useWishlist';
// const ProductCard = ({ product }) => {
//   const [userId, setUserId] = useState(null);
  
//   useEffect(() => {
//     const stored = localStorage.getItem('favoritePlugUser');
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         setUserId(parsed?.id || parsed?.email);
//       } catch (e) {
//         console.error('Error parsing stored user:', e);
//       }
//     }
//   }, []);
  
//   console.log('Stored User:', localStorage.getItem('favoritePlugUser'));

//   const { addToWishlist, removeFromWishlist, isWishlisted, isMounted } = useWishlist(userId);
//     if (!product) {
//       console.warn("undefined 'product in card'");
//       return null;
//     }

//     const isInWishlist = isWishlisted(product.id);

//   return (
//     <div className="relative px-4 max-sm:px-2 py-5 flex flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
//       {/* Heart button */}
//       {isMounted && (
//         <button
//           onClick={() =>
//             isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
//           }
//           className="absolute text-[17px] bg-pink-200 rounded-full p-1.5 top-2 right-2 text-red-500 z-10"
//         >
//           {isInWishlist ? <FaHeart /> : <FaRegHeart />}
//         </button>
//       )}

//       <Link href={`/products/${product.id}`}>
//         <div className="flex justify-center items-center mb-1">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="max-sm:h-[120px] h-[100px] object-fit rounded-lg"
//           />
//         </div>
//         <h2 className="text-sm max-sm:text-[15px] font-bold max-sm:font-light cursor-pointer">
//           {product.name.slice(0, 10)}...
//         </h2>
//         <div className="max-sm:flex max-sm:items-center max-sm:gap-2">
//           <p className="text-gray-600 text-sm max-sm:text-[13px]">₦{product.price}</p>
//           <strike className="text-gray-600 relative max-sm:top-0 -top-1.5 text-sm max-sm:text-[13px]">
//             ₦{product.oldPrice}
//           </strike>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '@/app/hooks/useWishlist'; // Make sure path is correct

const ProductCard = ({ product }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('favoritePlugUser');
    console.log('ProductCard: favoritePlugUser from localStorage:', stored); // Debug
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const foundUserId = parsed?.id || parsed?.email;
        console.log('ProductCard: Parsed userId:', foundUserId); // Debug
        setUserId(foundUserId);
      } catch (e) {
        console.error('ProductCard: Error parsing stored user:', e);
        setUserId(null); // Ensure userId is null if parsing fails
      }
    } else {
      console.log('ProductCard: No favoritePlugUser found in localStorage.');
    }
  }, []);

  // console.log('ProductCard: Rendering with current userId state:', userId); // Debug before hook call
  const { addToWishlist, removeFromWishlist, isWishlisted, isMounted } = useWishlist(userId);

  if (!product) {
    // console.warn("ProductCard: 'product' prop is undefined."); // Already have this
    return null;
  }

  const isInWishlist = isWishlisted(product.id);
  // console.log(`ProductCard [${product.name}]: isInWishlist: ${isInWishlist}, isMounted (from hook): ${isMounted}`); // Debug

  return (
    <div className="relative px-4 max-sm:px-2 py-5 flex flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      {isMounted && ( // Only show button if hook is ready
        <button
          onClick={() => {
            console.log(`ProductCard [${product.name}]: Heart button clicked. isInWishlist: ${isInWishlist}`); // Debug
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
      {/* Rest of your ProductCard JSX */}
      <Link href={`/products/${product.id}`}>
        <div className="flex justify-center items-center mb-1">
          <img
            src={product.image}
            alt={product.name}
            className="max-sm:h-[120px] h-[100px] object-fit rounded-lg"
          />
        </div>
        <h2 className="text-sm max-sm:text-[15px] font-bold max-sm:font-light cursor-pointer">
          {product.name.slice(0, 10)}...
        </h2>
        <div className="max-sm:flex max-sm:items-center max-sm:gap-2">
          <p className="text-gray-600 text-sm max-sm:text-[13px]">₦{product.price}</p>
          <strike className="text-gray-600 relative max-sm:top-0 -top-1.5 text-sm max-sm:text-[13px]">
            ₦{product.oldPrice}
          </strike>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;