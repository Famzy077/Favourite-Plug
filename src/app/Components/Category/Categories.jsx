'use client';

import React, { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import { FaHeart, FaRegHeart, FaSpinner } from 'react-icons/fa';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';
import { useAuthAction } from '@/app/hooks/useAuthAction';

const ITEMS_PER_PAGE = 12;
const API_URL = "https://favorite-server-0.onrender.com";

// --- Reusable Components ---
const Spinner = () => (
  <div className="flex items-center justify-center min-h-[70vh] w-full">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ProductCard = ({ product, onWishlistToggle, isWishlisted }) => {
  const { withAuth } = useAuthAction();
  // We construct the full, absolute URL for the image source.
  const imageUrl = `${API_URL}/${product.image}`;

  return (
    <div className="relative group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <button
          onClick={() => withAuth(() => onWishlistToggle(product.id))}
          className="absolute text-lg bg-white rounded-full p-1.5 top-2 right-2 text-red-500 z-10 shadow-sm"
      >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>
      <Link href={`/products/${product.id}`} className="flex flex-col flex-grow">
        <div className="flex justify-center items-center mb-1">
          <img
            src={imageUrl} 
            alt={product.name}
            className="max-sm:h-[45px] h-[100px] object-fit rounded-lg"
          />
        </div>
        <div className="p-2 max-sm:pt-1 border-t border-gray-200">
          <h1 className="text-sm max-sm:text-[13px] font-semibold truncate cursor-pointer">
            {product.name}
          </h1>
          <div className="flex items-baseline">
            <p className="text-gray-900 font-semibold relative max-sm:text-[0.7rem] text-sm">₦{product.price.toLocaleString()}</p>
            {/* {product.oldPrice && <strike className="text-gray-500 text-sm ml-2">₦{product.oldPrice.toLocaleString()}</strike>} */}
          </div>
        </div>
      </Link>
    </div>
  );
};

// --- Data Fetching Function ---
const fetchAllProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products`);
  return res.data.data;
};

// --- Main Categories Page Component ---
const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ['publicProducts'],
    queryFn: fetchAllProducts,
  });

  const category = searchParams.get('category') || 'All';
  const page = parseInt(searchParams.get('page') || '1');

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];
    if (category === 'All') return allProducts;
    return allProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }, [allProducts, category]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentPageProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilter = (cat) => {
    router.push(`/categories?category=${cat}&page=1`);
  };

  const handlePageChange = (pageNum) => {
    router.push(`/categories?category=${category}&page=${pageNum}`);
  };

  const handleWishlistToggle = (productId) => {
    if (isWishlisted(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(productId);
    }
  };

  if (isLoading) return <Spinner />;

  if (error) {
    return <div className="text-center py-20 text-red-500">Failed to load products. Please try again.</div>
  }

  return (
    <div className="lg:px-20 bg-zinc-100 py-5">
      <h1 className="text-4xl max-sm:text-2xl font-bold mx-5 my-4">Categories</h1>
      <div className="flex items-start">
        {/* Filter Buttons */}
        <div className="max-sm:px-0 p-3">
          <div className="grid max-sm:w-[5rem] max-sm:h-[20rem] h-[30rem] ml-3 w-[10rem] max-sm:grid-cols-1 my-3 gap-4">
            {['All', 'Smartphones', 'Tablets', 'Laptops', 'PowerBanks', 'Accessories'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`w-full text-sm max-sm:text-[0.7rem] md:text-base py-2 px-1 rounded-md transition-colors ${
                  category.toLowerCase() === cat.toLowerCase()
                    ? 'bg-blue-600 shadow-md font-bold text-white'
                    : 'bg-white hover:bg-blue-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product List and Pagination */}
        <div className="w-">
          <main className="grid max-sm:grid-cols-3 grid-rows-0.5 max-sm:gap-1 max-md:grid-cols-3 grid-cols-4 lg:grid-cols-4 overflow-x-auto gap-4 p-3 w-full scrollbar-hide">
            {currentPageProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onWishlistToggle={handleWishlistToggle}
                isWishlisted={isWishlisted(product.id)}
              />
            ))}
          </main>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 my-8">
            {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;