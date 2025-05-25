// a header with a search modal and a mobile bottom navigation.
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo1 from '../../../public/Images/Logo.png';
import MiniHeader from './MiniHeader';
import Products from '../../Data/ProductData.json'; // Now using the imported JSON data
import { Heart, XIcon, UserRound, Search, HomeIcon, List } from 'lucide-react';
import NoItemImage from '../../../public/Images/noProduct.png';

export const HeaderPage = () => {
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [results, setResults] = useState([]);
  const searchModalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showSearch &&
        searchModalRef.current &&
        !searchModalRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setQuery('');
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showSearch]);

  const toggleSearchModal = () => {
    setShowSearch(!showSearch);
    setQuery('');
    setResults([]);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Using the imported Products data instead of mock data
    const filtered = Products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  // Rest of your component remains exactly the same...
  return (
    <div className='sticky top-0 z-50'>
      <div className='max-md:hidden block'>
        <header className='flex bg-blue-200 p-2 shadow-md items-center justify-between'>
          <Link href={'/'}>
            <Image className='w-[3.5rem] lg:ml-2 border max-sm:w-[2rem]' src={Logo1} alt="Logo" />
          </Link>

          <nav className='w-[60%]'>
            <ul className='flex justify-center space-x-8 text-gray-800 text-[1rem] font-medium'>
              <li><Link href="/home">Home</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/wishlist">Wishlist</Link></li>
              <li><Link href="/account">Account</Link></li>
            </ul>
          </nav>

          <div className='flex items-center space-x-4'>
            <button
              onClick={toggleSearchModal}
              className="text-gray-700 hover:text-blue-600 transition-all"
              title="Search"
            >
              <Search size={24} />
            </button>
            <button className='bg-blue-500 hover:bg-blue-400 text-white px-4 py-1.5 rounded-sm transition-all'>
              Call To Order
            </button>
          </div>
        </header>
      </div>
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-95 h-screen flex justify-center items-start pt-12 z-[90]">
          <div
            ref={searchModalRef}
            className="bg-white z-[100] w-[50%] max-h-[80vh] rounded-lg p-4 shadow-lg relative flex flex-col"
          >
            <button
              onClick={toggleSearchModal}
              className="absolute right-3 top-2 text-gray-500 hover:text-red-500 transition-all"
            >
              <XIcon size={25} className='rounded-full p-1 bg-zinc-100'/>
            </button>
            
            <h2 className="text-lg font-normal mb-3">Search for Products</h2>
            
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search products..."
              className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            />
            
            {/* Scrollable Results Container */}
            <div className="mt-4 overflow-y-auto max-h-[60vh] pr-2">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((item) => (
                    <Link href={`/products/${item.id}`} key={item.id}>
                      <p className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                        {item.name}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                query && (
                  <div className="flex flex-col items-center justify-center h-[30vh]">
                    <Image 
                      src={NoItemImage} 
                      alt="No products found" 
                      width={120} 
                      height={120} 
                      className="opacity-70"
                    />
                    <p className="text-gray-500 mt-4">No matching products found</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <MiniHeader />
    </div>
  );
  };

// MobileBottomNav remains exactly the same
export const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/home', icon: <HomeIcon />, label: 'Home' },
    { href: '/categories', icon: <List />, label: 'Categories' },
    { href: '/wishlist', icon: <Heart />, label: 'Wishlist' },
    { href: '/account', icon: <UserRound />, label: 'Account' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] block sm:hidden bg-white border-t border-gray-200">
      <main className="flex justify-around items-center px-4 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label}>
              <div
                className={`flex flex-col items-center text-xs transition-all duration-200 ${
                  isActive ? 'text-blue-600 scale-110' : 'text-gray-500'
                }`}
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