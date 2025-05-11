// 'use client'
// import React from 'react'
// import { MobileCategories } from '@/app/Components/Category/MobileCategories'

// const Categories = () => {
//   return (
//     <div className='lg:px-20  bg-zinc-100'>
//       <h1>Categories</h1>
//       <div className='flex my-3 justify-center space-x-9'>
//         <button className='bg-blue-500 transition-all hover:scale-3d transform text-white p-2 rounded cursor-pointer hover:bg-blue-400'>Mobile/Tablet</button>
//         <button className='bg-blue-500 text-white p-2 px-4 rounded cursor-pointer hover:bg-blue-400'>Latop</button>
//         <button className='bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-400'>Power Bank</button>
//         <button className='bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-400'>Accessories</button>
//       </div>
//       <MobileCategories/>
//     </div>
//   )
// }

// export default Categories


'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import products from '@/Data/ProductData.json';
import { MobileCategories } from '@/app/Components/Category/MobileCategories';

const ITEMS_PER_PAGE = 14;

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get('category') || 'All';
  const page = parseInt(searchParams.get('page') || '1');

  const filteredProducts = useMemo(() => {
    if (category === 'All') return products;
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }, [category]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentPageProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilter = (cat) => {
    router.push(`?category=${cat}&page=1`);
  };

  const handlePageChange = (pageNum) => {
    router.push(`?category=${category}&page=${pageNum}`);
  };

  return (
    <div className='lg:px-20 bg-zinc-100'>
      <h1 className='text-2xl font-bold mb-4'>Categories</h1>

      {/* Filter Buttons */}
      <div className='flex my-3 justify-center space-x-4'>
        {['All', 'SmartPhones', 'Tablets', 'Latop', 'PowerBanks', 'Accessories'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-400 ${category === cat ? 'font-bold' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5"> */}
      <main className="grid max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto overflow-y-hidden gap-4 p-4 w-full scrollbar-hide">
        {currentPageProducts.map((product) => (
          <div className="min-w-[10rem] bg-white">
            <div className='w-[50%] max-sm:w-[100%] flex justify-center items-center'>
              <img src={product.image} alt={product.name} className="max-sm:h-[] h-[130px] mb-4" />
            </div>
            <div className='w-[50%] max-sm:w-[100%] flex flex-col justify-center items-start'>
              <h1 className="text-3xl font-bold mb-4">{product.name.slice(0, 10)}...</h1>
              <p className="text-gray-700 text-lg mb-2">₦{product.price.toLocaleString()}</p>
              <strike className="text-gray-600 relative -top-2.5 text-sm">₦{product.oldPrice.toLocaleString()}</strike>
              {/* <p className="text-gray-600">{product.description}</p> */}
            </div>
          </div>
        ))}
        </main>
      {/* </div> */}

      {/* Pagination */}
      <div className="flex justify-center space-x-2 my-5">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-white border'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* <MobileCategories /> */}
    </div>
  );
};

export default Categories;
