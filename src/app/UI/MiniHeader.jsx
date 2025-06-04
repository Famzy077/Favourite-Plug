'use client'
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Products from '../../Data/ProductData.json';
import NoItemImage from '../../../public/Images/noProduct.png';
import Image from 'next/image';

const MiniHeader = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const searchModalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
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
  }, []);

  useEffect(() => {
    // Clear search when route changes
    setQuery('');
    setResults([]);
    setShowSearch(false);
  }, [pathname]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSearch(true);

    const filtered = Products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="z-40 block md:hidden shadow bg-zinc-200 py-4 px-4 w-full relative">
      <div className="flex">
        <input
          type="search"
          placeholder="Search on Favorite Plug"
          value={query}
          onChange={handleSearch}
          className="w-full border-2 border-blue-500 rounded-l px-4 py-1 outline-none bg-white"
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded-r">
          <Search size={20} />
        </button>
      </div>

      {showSearch && (
        <div
          ref={searchModalRef}
          className="absolute top-full mt-2 left-0 right-0 bg-white shadow-md rounded-md p-3 z-50 max-h-[50vh] overflow-y-auto"
        >
          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="block p-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : (
            query && (
              <div className="flex flex-col items-center justify-center py-6">
                <Image
                  src={NoItemImage}
                  alt="No products found"
                  width={100}
                  height={100}
                  className="opacity-70"
                />
                <p className="text-gray-500 mt-3 text-sm">
                  No matching products found
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MiniHeader;
