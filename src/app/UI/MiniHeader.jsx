'use client'
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import products from '../../Data/ProductData.json';
import { Search } from 'lucide-react';
import Link from 'next/link';
import NoItemImage from '../../../public/Images/noProduct.png';

const MiniHeader = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const pathname = usePathname();

    
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');
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

    const handleSearch = (e) => {
      const value = e.target.value;
      setQuery(value);
      
      // Using the imported Products data instead of mock data
      const filtered = Products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    };


    useEffect(() => {
      setSearchTerm('');
      setFilteredItems([]);
    }, [pathname]);
  
    useEffect(() => {
      if (searchTerm.trim() === "") {
        setFilteredItems([]);
        return;
      }
  
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(results);
    }, [searchTerm]);
  return (
    <div className=' z-40 block md:hidden -inset-0 shadow bg-zinc-200 py-5 px-5 flex-col gap-2 w-full relative'>
      <div className='flex gap-3 relative max-sm:px-0 max-md:px-26 md:px-26'>
        <input
          type="search"
          placeholder="Search on Favorite plug"
          className='border-2 max-sm:rounded max-sm:w-[100%] bg-white outline-0 py-2 max-sm:py-1.5 px-4 rounded-l w-[100%] border-blue-500'
          value={query}
          onChange={handleSearch}
        />
        <button
          className="bg-blue-500 fixed border border-blue-500 rounded-r max-sm:right-[-2px] right-[5rem] cursur-pointer text-white max-sm:py-[7.2px] px-3 py-[9.2px]"
          onClick={() => {}}
          >
          <Search size={24} className="text-white" />    
        </button>
      </div>

      {searchTerm && filteredItems.length > 0 && (
        <div className="absolute top-full mt-1 left-0 w-[80%] bg-white shadow-md rounded p-2 z-50 max-h-[200px] overflow-y-auto">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="block text-gray-700 text-sm hover:bg-gray-100 p-2 rounded"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      
    </div>
  )
}

export default MiniHeader
