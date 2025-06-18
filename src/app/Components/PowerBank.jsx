'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import Slider from "react-slick";
import { AddToCartButton } from './cart/AddToCartButton';

// --- Data Fetching Function ---
const API_URL = "https://favorite-server-0.onrender.com";

const fetchAllProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products`);
  return res.data.data;
};

// --- Reusable Product Card Component (No changes needed) ---
const ProductCard = ({ product }) => {
  const calculateDiscount = (price, oldPrice) => {
    if (!oldPrice || oldPrice <= price) return null;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };
  const discountPercentage = calculateDiscount(product.price, product.oldPrice);

  return (
    <div className="group relative border rounded-lg overflow-hidden border-gray-300 bg-white hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 flex justify-center w-full overflow-hidden bg-white py-3">
          <img
            src={product.image}
            alt={product.name}
            className="max-sm:h-[100px] h-[120px] object-fit object-center group-hover:opacity-80 transition-opacity"
          />
        </div>
      </Link>
      {discountPercentage && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold max-sm:px-0.5  px-2 py-1 rounded-md">
          -{discountPercentage}%
        </div>
      )}
      <div className="p-4 pb-2 bg-gray-200">
        <h3 className="text-1.8 lg:font-semibold text-gray-800 font-medium truncate">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="flex items-baseline my-0.5">
          <p className="text-[15px] max-sm:text-[13px] font-medium text-gray-800">₦{product.price ? product.price.toLocaleString() : '0.00'}</p>
          {product.oldPrice && (
            <p className="ml-2 text-[14px] max-sm:text-[11px] text-gray-500 line-through">₦{product.oldPrice.toLocaleString()}</p>
          )}
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
};

// --- Main Component for the Latops Category Section (Now with Slider) ---
export const PowerBank = () => {
  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ['publicProducts'],
    queryFn: fetchAllProducts,
  });

  const mobileProducts = allProducts?.filter(
    (product) => product.category === "PowerBanks"
  );
  

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1920, // For 32 desktops screen
        settings: { slidesToShow: 5, slidesToScroll: 1 },
      },
      {
        breakpoint: 1600, // For 27 desktops screen
        settings: { slidesToShow: 5, slidesToScroll: 1 },
      },
      {
        breakpoint: 1280, // For smaller desktops
        settings: { slidesToShow: 5, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024, // For tablets
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768, // For large phones
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480, // For small phones
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[40vh]'>
        <FaSpinner className="animate-spin text-blue-500" size={32} /> 
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load mobile products.</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 sm:px-3 lg:px-2'>
      {/* IMPROVEMENT: Show the slider if there are ANY products, not just more than 5 */}
      {mobileProducts && mobileProducts.length > 0 ? (
        <Slider {...settings}>
          {mobileProducts.map((product) => (
            <div key={product.id} className="p-2"> {/* react-slick needs a div wrapper */}
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p>No Power Bank found found at the moment.</p>
        </div>
      )}
    </div>
  );
};