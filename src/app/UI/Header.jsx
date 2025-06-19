'use client';
import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo1 from '/public/Images/Logo.png';
import {MiniHeader} from './MiniHeader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Heart, XIcon, UserRound, Search, HomeIcon, List } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa'; // FIX: FaSpinner needs to be imported
import NoItemImage from '/public/Images/noProduct.png';
import { useCart } from '../hooks/CartContext';
import { ShoppingCart } from 'lucide-react';

// const API_URL = "http://localhost:5000";
const API_URL = "https://favorite-server-0.onrender.com";

// --- NEW: A custom hook for debouncing ---
// This hook prevents API calls on every keystroke.
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// Data fetching function for the search query
const searchApiProducts = async (query) => {
    if (!query) return []; // Don't fetch if the query is empty
    const { data } = await axios.get(`${API_URL}/api/products/search?q=${query}`);
    return data.data;
};

export const HeaderPage = () => {
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchModalRef = useRef(null);

  // CartItemCount
  const { itemCount } = useCart() || { itemCount: 0 };

  // Use the debounced query for the API call
  const debouncedQuery = useDebounce(query, 300); // 300ms delay

  // useQuery for fetching search results
  const { data: results, isLoading } = useQuery({
    queryKey: ['productSearch', debouncedQuery],
    queryFn: () => searchApiProducts(debouncedQuery),
    enabled: !!debouncedQuery, // Only run the query if debouncedQuery is not empty
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showSearch && searchModalRef.current && !searchModalRef.current.contains(event.target)) {
        setShowSearch(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showSearch]);

  const toggleSearchModal = () => {
    setShowSearch(!showSearch);
    setQuery('');
  };

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  };
  
  const router = useRouter();
  const closeAndNavigate = (url) => {
    setShowSearch(false);
    setQuery('');
    router.push(url);
  };

  return (
    <div className='sticky top-0 z-50'>
      <header className='flex bg-blue-200 p-2 shadow-md items-center justify-between max-md:hidden'>
        <Link href={'/home'}>
          <Image className='w-[3.5rem] lg:ml-2 max-sm:w-[2rem]' src={Logo1} alt="Logo" />
        </Link>
        <nav className='w-[48%]'>
            <ul className='flex justify-center space-x-8 text-gray-800 text-[1rem] font-medium'>
              <li><Link href="/home">Home</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/wishlist">Wishlist</Link></li>
              <li><Link href="/account">Account</Link></li>
            </ul>
        </nav>
        <div onClick={toggleSearchModal} className='border hover:border-blue-600 border-gray-600 w-[12rem] flex items-center p-1 rounded-[5px] m-auto text-[8px] cursor-pointer'>
          <Search size={24} className="text-gray-700" />
          <i className='text-sm text-zinc-600 ml-2'>Search products..</i>
        </div>
        <Link href="/cart">
          <div className="relative m-0 p-1.5 rounded-full hover:bg-blue-300 transition-colors mr-5">
            <ShoppingCart size={28} className="text-[#2648db]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </div>
        </Link>
        <div className='space-x-4'>
            <button className='bg-[#2648db] hover:bg-blue-500 text-white px-4 py-1.5 rounded-sm transition-all mr-10'>
              Call To Order
            </button>
        </div>
      </header>

      {showSearch && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 h-screen flex justify-center items-start pt-[4.6rem] z-[90]">
          <div ref={searchModalRef} className="bg-white z-[100] w-[50%] max-h-[80vh] rounded-lg p-4 shadow-lg relative flex flex-col">
            <button onClick={toggleSearchModal} className="absolute right-3 top-2 text-gray-500 hover:text-red-500 transition-all">
              <XIcon size={30} className='rounded-full p-1 bg-zinc-100'/>
            </button>
            <h2 className="text-lg font-normal mb-3">Search for Products</h2>
            <input
              type="text"
              value={query}
              onChange={handleSearchInputChange}
              placeholder="Search products..."
              className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="mt-4 overflow-y-auto max-h-[60vh] pr-2">
              {isLoading && (
                <div className="flex justify-center items-center py-4">
                  <FaSpinner className="animate-spin text-blue-500" />
                </div>
              )}
              {!isLoading && results && results.length > 0 && (
                <div className="space-y-2">
                  {results.map((item) => (
                    <div key={item.id} onClick={() => closeAndNavigate(`/products/${item.id}`)} className="p-2 flex items-center gap-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">₦{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!isLoading && debouncedQuery && results?.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[30vh]">
                  <Image src={NoItemImage} alt="No products found" width={120} height={120} className="opacity-70" />
                  <p className="text-gray-500 mt-4">No matching products found for "{debouncedQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <MiniHeader />
    </div>
  );
};

export const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/home', icon: <HomeIcon />, label: 'Home' },
    { href: '/categories', icon: <List />, label: 'Categories' },
    { href: '/wishlist', icon: <Heart />, label: 'Wishlist' },
    { href: '/account', icon: <UserRound />, label: 'Account' },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-[100] block md:hidden bg-white border-t border-gray-200">
      <main className="flex justify-around items-center px-4 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isCategories = item.icon === <List/>;

          return (
            <Link href={item.href} key={item.label}>
              <div
                className={`flex flex-col items-center text-xs transition-all duration-200 ${
                  isActive ? 'text-blue-600 scale-110' : 'text-gray-500'
                } ${isCategories ? 'border border-blue-500 rounded-md px-2 py-1' : ''}`}
              >
                {React.cloneElement(item.icon, { size: 24 })}
                <span className="mt-1">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
};
