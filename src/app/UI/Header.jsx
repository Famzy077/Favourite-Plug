'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo1 from '../../../public/Images/Logo1.png';
import products from '../../Data/ProductData.json'

const HeaderPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

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
    <header className='flex border justify-between sticky -top-2 z-80 items-center bg-blue-100 p-4 max-sm:p-2 shadow-md'>
      <div className='flex items-center w-[50%]'>
        <Link href={'/'}>
          <Image className='w-[10rem] max-sm:w-[7rem]' src={Logo1} alt="Logo" />
        </Link>
      </div>

      <div className='flex flex-col gap-2 w-full relative'>
        <div className='flex gap-3'>
          <input
            type="search"
            placeholder="Search products..."
            className='border py-2 px-4 rounded-[12px] w-[80%] border-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-3 py-1.5 rounded-[8px]"
            onClick={() => setSearchTerm(searchTerm)} // triggers filtering via useEffect
          >
            Search
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

      <nav className='flex max-md:hidden items-center space-x-4 w-full text-xl'>
        <ul className='flex space-x-7 text-gray-700'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/">About</Link></li>
          <li><Link href="/">Blog</Link></li>
          <li><Link href="/">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderPage;
