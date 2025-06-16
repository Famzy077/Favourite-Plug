'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Heart, ShoppingCart } from 'lucide-react'; 
import { FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NoItemImage from '/public/Images/noProduct.png';
import { useCart } from '../hooks/CartContext';

const API_URL = "https://favorite-server-0.onrender.com";

// --- Reusable Debounce Hook ---
// This hook prevents the API from being called on every single keystroke.
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// --- Data Fetching Function for Search ---
const searchApiProducts = async (query) => {
    if (!query) return [];
    const { data } = await axios.get(`${API_URL}/api/products/search?q=${query}`);
    return data.data;
};

export const MiniHeader = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const pathname = usePathname();
  const searchModalRef = useRef(null);
  const router = useRouter();

  // CartItemCount
  const { itemCount } = useCart() || { itemCount: 0 };

  // Use the debounced query to trigger the API call
  const debouncedQuery = useDebounce(query, 300); // 300ms delay

  const { data: results, isLoading } = useQuery({
    queryKey: ['productSearchMobile', debouncedQuery],
    queryFn: () => searchApiProducts(debouncedQuery),
    enabled: !!debouncedQuery, // Only run query if there's a debounced search term
  });

  // Effect to close search results when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Effect to close search results when the route changes
  useEffect(() => {
    setShowResults(false);
    setQuery('');
  }, [pathname]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(true); // Show results dropdown as soon as user starts typing
  };

  const handleResultClick = (productId) => {
    setShowResults(false);
    setQuery('');
    router.push(`/products/${productId}`);
  };

  return (
    <div className="z-40 md:hidden shadow bg-zinc-200 py-4 px-4 w-full relative">
      <div className="flex gap-3 justify-between items-center">
        <form className="flex w-[85%]" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Search on Favorite Plug"
            value={query}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)} // Show results on focus as well
            className="w-full border-2 border-r-0 border-blue-500 rounded-l px-4 pr-0 py-[7px] outline-none bg-white text-sm"
          />
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-r">
            <Search size={20} />
          </button>
        </form>

        <Link href="/wishlist" title='Wishlist'>
          <Heart size={36} className='text-blue-500 bg-white rounded-full p-1.5 border-2 border-blue-500'/>
        </Link>

        {/* --- NEW: Cart Icon with Badge --- */}
        <Link href="/cart">
          <div className="relative m-0 p-1.5 rounded-full hover:bg-blue-300 transition-colors">
            <ShoppingCart size={28} className="text-blue-500" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </div>
        </Link>
      </div>

      {showResults && query && (
        <div
          ref={searchModalRef}
          className="absolute top-full mt-2 left-0 right-0 mx-4 bg-white shadow-lg rounded-md p-3 z-50 max-h-[70vh] overflow-y-auto"
        >
          {isLoading && (
            <div className="flex justify-center p-4">
                <FaSpinner className="animate-spin text-blue-500" />
            </div>
          )}
          {!isLoading && results && results.length > 0 && (
            <div className="space-y-2">
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item.id)}
                  className="flex items-center gap-3 p-2 bg-gray-50 hover:bg-gray-100 rounded text-sm cursor-pointer"
                >
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-700 font-bold">₦{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isLoading && debouncedQuery && results?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6">
              <Image
                src={NoItemImage}
                alt="No products found"
                width={100}
                height={100}
                className="opacity-70"
              />
              <p className="text-gray-500 mt-3 text-sm">
                No matching products found for "{debouncedQuery}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};