
'use client';

import React, { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaSpinner } from 'react-icons/fa';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';
import { useAuthAction } from '@/app/hooks/useAuthAction';
import { AddToCartButton } from '@/app/Components/cart/AddToCartButton';
import bannerImage from '/public/Images/GalaxySeries.png'; // Assuming you want a banner

const ITEMS_PER_PAGE = 16;
const API_URL = "https://favorite-server-0.onrender.com";

// --- Data Fetching Function ---
const fetchAllProducts = async () => {
    const res = await axios.get(`${API_URL}/api/products`);
    return res.data.data;
};

// --- Reusable Components ---
const Spinner = () => (
  <div className="flex items-center justify-center min-h-[70vh] w-full">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ProductCard = ({ product }) => {
    const { withAuth } = useAuthAction();
    const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

    const handleWishlistToggle = () => {
        if (isWishlisted(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };
    
    // Use the first image for the card, with a fallback
    const displayImage = product.images?.[0]?.url || '/Images/placeholder.png';

    return (
        <div className="relative group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <button
                onClick={() => withAuth(handleWishlistToggle)}
                className="absolute text-lg bg-white rounded-full p-1.5 top-2 right-2 text-red-500 z-10 shadow-sm"
            >
                {isWishlisted(product.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
            <Link href={`/products/${product.id}`} className="flex flex-col flex-grow">
                <div className="h-48 flex justify-center items-center p-4">
                    <Image
                        src={displayImage}
                        alt={product.name}
                        width={150}
                        height={150}
                        className="max-h-full w-auto object-contain"
                    />
                </div>
                <div className="p-3 border-t border-gray-200 mt-auto">
                    <h1 className="text-sm font-semibold truncate cursor-pointer h-10">{product.name}</h1>
                    <div className="flex items-baseline mt-1">
                        <p className="text-gray-900 font-bold text-lg">₦{product.price.toLocaleString()}</p>
                    </div>
                </div>
            </Link>
            <div className="p-3 pt-0">
                <AddToCartButton productId={product.id} />
            </div>
        </div>
    );
};

// --- Main Page Component ---
const AllProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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
  const currentPageProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilter = (cat) => {
    router.push(`/products?category=${cat}&page=1`);
  };

  const handlePageChange = (pageNum) => {
    router.push(`/products?category=${category}&page=${pageNum}`);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load products. Please try again.</div>;

  return (
    <main>
        {/* Banner Section */}
        <div className="relative h-[30vh] flex justify-center items-center text-white bg-gray-800">
            <Image src={bannerImage} alt="Products Banner" layout="fill" objectFit="cover" className="opacity-40" />
            <div className="relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">All Products</h1>
                <p className="text-lg mt-2">Find your favorite gadgets right here.</p>
            </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filter Sidebar */}
                <aside className="w-full md:w-1/4 lg:w-1/5">
                    <h2 className="text-xl font-bold mb-4">Categories</h2>
                    <div className="space-y-2">
                        {['All', 'smartphones', 'Tablets', 'Laptops', 'SmartWatches', 'PowerBanks', 'Accessories'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleFilter(cat)}
                                className={`w-full text-left p-2 rounded-md transition-colors text-sm font-medium ${
                                    category.toLowerCase() === cat.toLowerCase()
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-blue-100'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Products Grid and Pagination */}
                <div className="w-full md:w-3/4 lg:w-4/5">
                    <main className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentPageProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </main>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center space-x-2 mt-12">
                        {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`h-10 w-10 rounded-md text-sm font-medium transition-colors ${
                                    page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-100'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
};

export default AllProductsPage;