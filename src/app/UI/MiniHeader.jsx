'use client'
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import products from '../../Data/ProductData.json';
import { Search } from 'lucide-react';
import Link from 'next/link';

const MiniHeader = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const pathname = usePathname(); // listens to route changes
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
    <div className='flex z-40 justify-between -inset-0 shadow bg-zinc-200 py-5 px-5 flex-col gap-2 w-full relative'>
      <div className='flex gap-3 relative max-sm:px-0 max-md:px-26 md:px-26'>
        <input
          type="search"
          placeholder="Search on Favorite plug"
          className='border-2 max-sm:rounded max-sm:w-[100%] bg-white outline-0 py-2 max-sm:py-1 px-4 rounded-l w-[100%] border-blue-500'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 fixed border border-blue-500 rounded-r max-sm:right-[-2px] right-[5rem] cursur-pointer text-white max-sm:py-[5px] px-3 py-[9.2px]"
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
