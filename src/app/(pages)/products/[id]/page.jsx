'use client'
import Link from 'next/link';
import { FaSpinner } from 'react-icons/fa';
import Docs from '@/app/UI/Docs';
import bannerImage from '/public/Images/GalaxySeries.png'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = "https://favorite-server-0.onrender.com";

// Fetches a SINGLE product by its ID
const fetchProductById = async (productId) => {
  const res = await axios.get(`${API_URL}/api/products/${productId}`);
  return res.data.data;
};

// Fetches ALL products (for the related items section)
const fetchAllProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products`);
  return res.data.data;
};

// --- Reusable Product Card Component ---
const RelatedProductCard = ({ product }) => (
  <div className="group relative border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
    <Link href={`/products/${product.id}`}>
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={`${API_URL}/${product.image}`}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm text-gray-700 font-medium truncate">{product.name}</h3>
        <p className="mt-1 text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
      </div>
    </Link>
  </div>
);

// This component fetches all products and shows others from the same category.
const RelatedProducts = ({ category, currentProductId }) => {
    const { data: allProducts, isLoading } = useQuery({
      queryKey: ['publicProducts'],
      queryFn: fetchAllProducts,
    });

    const relatedProducts = allProducts
        ?.filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 6); // Show up to 6 related products

    if (isLoading || !relatedProducts || relatedProducts.length === 0) {
        return null; // Don't show the section if loading or no related items found
    }

    return (
        <div className='bg-blue-100 p-5 sm:p-8 mb-14'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-zinc-800 mb-6'>You Might Also Like</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {relatedProducts.map(product => (
                    <RelatedProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};


// --- Main Product Page Component ---
const ProductPage = ({ params }) => {
  const { id } = params;

  // Use TanStack Query to fetch the specific product by its ID
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id], // A unique key for this specific product
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Only run the query if the ID exists
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <FaSpinner className="animate-spin text-blue-500" size={32} /> 
      </div>
    );
  }

  if (error || !product) {
    return <div className="text-center py-20 text-red-500">Product not found or an error occurred.</div>;
  }

  

  return (
    <main>
      <div className='text-center'>
        <div className="relative h-[40vh] md:h-[50vh] flex justify-center items-center text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerImage.src})` }}
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>
          <div className="relative z-10 flex items-center space-x-2">
            <p className="text-xl md:text-2xl underline">
              <Link href="/home">Home</Link>
            </p>
            <span className="text-xl md:text-2xl">/</span>
            <h1 className="text-xl md:text-2xl text-blue-400 font-bold">Shop</h1>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-white bg-blue-500 mx-auto max-w-4xl p-2 mt-5 rounded-md">Product Details</h1>
      </div>

      <div className="p-5 max-w-4xl mx-auto mt-8">
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='md:w-1/2 flex justify-center items-center p-4 border rounded-lg bg-white'>
            <img src={`${API_URL}/${product.image}`} alt={product.name} className="max-w-full max-h-[50vh] object-contain" />
          </div>
          <div className='md:w-1/2 flex flex-col justify-center items-start'>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-baseline mb-4">
              <p className="text-gray-900 text-3xl font-bold">₦{product.price.toLocaleString()}</p>
              {product.oldPrice && <p className="text-gray-500 text-lg line-through ml-3">₦{product.oldPrice.toLocaleString()}</p>}
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
            <div>
              <button className='text-xl border border-blue-500 text-white rounded-lg bg-blue-500 hover:bg-blue-600 py-3 px-6 cursor-pointer font-semibold transition-colors'>Call to order</button>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts category={product.category} currentProductId={product.id} />

      <Docs/>
    </main>
  );
}

export default ProductPage;