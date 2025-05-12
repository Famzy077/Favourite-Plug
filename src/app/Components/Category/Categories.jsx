'use client';
import React, { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import products from '@/Data/ProductData.json';
import Link from 'next/link';
import { useWishlist } from '@/app/hooks/useWishlist';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ITEMS_PER_PAGE = 12;

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

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
      <h1 className='text-4xl font-bold mx-5 my-4'>Categories</h1>

      {/* Filter Buttons */}
      <div className='flex'>
        <div className='grid max-sm:w-[7rem] h-[30rem] ml-5 w-[10rem] max-sm:grid-cols-1 my-3 gap-4 max-sm:text-[1rem]'>
          {['All', 'SmartPhones', 'Tablets', 'Laptops', 'PowerBanks', 'Accessories'].map((cat, catKey) => (
            <button
              key={catKey}
              onClick={() => handleFilter(cat)}
              className={`bord max-sm:text-[0.7rem] text-[18px] text-blue-500 p-0 rounded-[5px] shadow ${
                category === cat ? 'bg-blue-500 shadow-none font-bold text-white' : 'bg-white shadow shadow-blue-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product List */}
        <main className="grid max-sm:grid-cols-3 max-sm:gap-1 max-md:grid-cols-3 grid-cols-4 lg:grid-cols-4 overflow-x-auto gap-4 p-3 w-full scrollbar-hide">
          {currentPageProducts.map((product) => {
            const isInWishlist = isWishlisted(product.id);

            return (
              <div key={product.id} className="relative">
                {/* Wishlist Heart Icon */}
                <button
                  onClick={() =>
                    isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product)
                  }
                  className="absolute top-2 right-2 text-red-500 z-10"
                >
                  {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                </button>

                <Link href={`/products/${product.id}`}>
                  <div className="px-4 py-5 flex flex-col rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-center items-center mb-1">
                      <img src={product.image} alt={product.name} className="max-sm:h-[40px] h-[100px] object-fit rounded-lg" />
                    </div>
                    <div className='w-[50%] max-sm:w-[100%] flex flex-col justify-center items-start'>
                      <h1 className="text-sm max-sm:text-[0.7rem] font-semibol cursor-pointer">{product.name.slice(0, 11)}...</h1>
                      <div className="flex max-sm:items-center gap-2 max-sm:hidden">
                        <p className="text-gray-600 text-sm">₦{product.price}</p>
                        <strike className="text-gray-600 relative text-sm">₦{product.oldPrice}</strike>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </main>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 my-5 mb-22">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-700 text-white' : 'bg-white border'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
