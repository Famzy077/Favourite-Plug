// 'use client'
// import Link from 'next/link';
// import { FaSpinner } from 'react-icons/fa';
// import Docs from '@/app/UI/Docs';
// import bannerImage from '/public/Images/GalaxySeries.png'
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { AddToCartButton } from '@/app/Components/cart/AddToCartButton';
// import { Phone } from 'lucide-react';

// const API_URL = "https://favorite-server-0.onrender.com";

// // Fetches a SINGLE product by its ID
// const fetchProductById = async (productId) => {
//   const res = await axios.get(`${API_URL}/api/products/${productId}`);
//   return res.data.data;
// };

// // Fetches ALL products (for the related items section)
// const fetchAllProducts = async () => {
//   const res = await axios.get(`${API_URL}/api/products`);
//   return res.data.data;
// };

// // --- Reusable Product Card Component ---
// const RelatedProductCard = ({ product }) => (
//   <div className="group relative border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
//     <Link href={`/products/${product.id}`}>
//       <div className="aspect-w-1 aspect-h-1 w-full flex justify-center overflow-hidden bg-white">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-28 object-cover"
//         />
//       </div>
//       <div className="p-3 py-1 border-t">
//         <h3 className="text-sm text-gray-700 font-medium truncate">{product.name}</h3>
//         <p className="mt-1 text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
//       <AddToCartButton productId={product.id} />
//       </div>
//     </Link>
//   </div>
// );

// // This component fetches all products and shows others from the same category.
// const RelatedProducts = ({ category, currentProductId }) => {
//     const { data: allProducts, isLoading } = useQuery({
//       queryKey: ['publicProducts'],
//       queryFn: fetchAllProducts,
//     });

//     const relatedProducts = allProducts
//         ?.filter(p => p.category === category && p.id !== currentProductId)
//         .slice(0, 6); // Show up to 6 related products

//     if (isLoading || !relatedProducts || relatedProducts.length === 0) {
//         return null; // Don't show the section if loading or no related items found
//     }

//     return (
//         <div className='bg-blue-100 p-5 sm:p-8 mb-14'>
//             <h2 className='text-2xl sm:text-3xl font-semibold text-zinc-800 mb-6'>You Might Also Like</h2>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//                 {relatedProducts.map(product => (
//                     <RelatedProductCard key={product.id} product={product} />
//                 ))}
//             </div>
//         </div>
//     );
// };


// // --- Main Product Page Component ---
// const ProductPage = ({ params }) => {
//   const { id } = params;

//   // Use TanStack Query to fetch the specific product by its ID
//   const { data: product, isLoading, error } = useQuery({
//     queryKey: ['product', id], // A unique key for this specific product
//     queryFn: () => fetchProductById(id),
//     enabled: !!id, // Only run the query if the ID exists
//   });

//   if (isLoading) {
//     return (
//       <div className='flex items-center justify-center min-h-screen'>
//         <FaSpinner className="animate-spin text-blue-500" size={32} /> 
//       </div>
//     );
//   }

//   if (error || !product) {
//     return <div className="text-center py-20 text-red-500">Product not found or an error occurred.</div>;
//   }

  

//   return (
//     <main>
//       <div className='text-center'>
//         <div className="relative h-[40vh] md:h-[50vh] flex justify-center items-center text-white">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{ backgroundImage: `url(${bannerImage.src})` }}
//           >
//             <div className="absolute inset-0 bg-black opacity-60"></div>
//           </div>
//           <div className="relative z-10 flex items-center space-x-2">
//             <p className="text-xl md:text-2xl underline">
//               <Link href="/home">Home</Link>
//             </p>
//             <span className="text-xl md:text-2xl">/</span>
//             <h1 className="text-xl md:text-2xl text-blue-400 font-bold">Shop</h1>
//           </div>
//         </div>
//         <h1 className="text-2xl md:text-3xl font-bold mb-1 text-white bg-blue-500 mx-auto max-w-4xl p-2 mt-5 rounded-md max-sm:rounded-none">Product Details</h1>
//       </div>

//       <div className="p-5 max-w-4xl mx-auto mt-8 mb-10">
//         <div className='flex flex-col md:flex-row gap-8'>
//           <div className='md:w-1/2 flex justify-center items-center p-4 border rounded-lg bg-white'>
//             <img src={product.image} alt={product.name} className="max-w-full max-h-[50vh] object-contain" />
//           </div>
//           <div className='md:w-1/2 flex flex-col justify-center items-start'>
//             <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//             <div className="flex items-baseline mb-4">
//               <p className="text-gray-900 text-3xl font-bold">₦{product.price.toLocaleString()}</p>
//               {product.oldPrice && <p className="text-gray-500 text-lg line-through ml-3">₦{product.oldPrice.toLocaleString()}</p>}
//             </div>
//             <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
//             <div>
//               <div className='bg-[#2648db] rounded-[5px] cursor-pointer !text-xl !font-semibold'>
//                 <AddToCartButton productId={product.id} />
//               </div>
//               <p className='text-center text-font-semibold text-xl'>OR</p>
//               <button className='text-xl max-sm:text-sm border border-blue-500 text-white rounded-[5px] bg-blue-500 hover:bg-blue-600 py-1.5 px-6 cursor-pointer font-semibold transition-colors flex gap-2 items-center'>
//                 <Phone className="max-sm:text-sm" size={28}/>
//                 Call to order
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <RelatedProducts category={product.category} currentProductId={product.id} />

//       <Docs/>
//     </main>
//   );
// }

// export default ProductPage;

'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';
import { Phone } from 'lucide-react';
import { AddToCartButton } from '@/app/Components/cart/AddToCartButton';
import Docs from '@/app/UI/Docs';
import bannerImage from '/public/Images/GalaxySeries.png';

const API_URL = "https://favorite-server-0.onrender.com";

// Fetches a SINGLE product by its ID (including its images)
const fetchProductById = async (productId) => {
  const res = await axios.get(`${API_URL}/api/products/${productId}`);
  return res.data.data;
};

// Fetches ALL products (for the related items section)
const fetchAllProducts = async () => {
    const res = await axios.get(`${API_URL}/api/products`);
    return res.data.data;
};

// --- A dedicated component for the Image Gallery ---
const ProductImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className='flex justify-center items-center p-4 border rounded-lg bg-gray-100 h-96'>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-lg bg-white flex items-center justify-center h-80 md:h-96 overflow-hidden">
        {selectedImage && (
          <Image
            src={selectedImage.url}
            alt={`Main view of ${productName}`}
            width={400}
            height={400}
            className="max-h-full w-auto object-contain transition-opacity duration-300"
            priority
          />
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`border-2 rounded-lg p-1 transition-all ${
              selectedImage?.id === image.id ? 'border-blue-500 scale-105' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${image.id}`}
              width={80}
              height={80}
              className="object-cover rounded-md h-16 w-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Reusable Related Product Card Component ---
const RelatedProductCard = ({ product }) => {
    // Get the first image for display, with a fallback
    const displayImage = product.images?.[0]?.url || '/default-placeholder.png';

    return (
        <div className="group relative border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
            <Link href={`/products/${product.id}`}>
                <div className="aspect-w-1 aspect-h-1 w-full flex justify-center overflow-hidden bg-white p-2">
                    <Image
                        src={displayImage}
                        alt={product.name}
                        width={150}
                        height={150}
                        className="h-28 object-contain"
                    />
                </div>
                <div className="p-3 border-t">
                    <h3 className="text-sm text-gray-700 font-medium truncate">{product.name}</h3>
                    <p className="mt-1 text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
                </div>
            </Link>
        </div>
    );
};


// --- Related Products Section ---
const RelatedProducts = ({ category, currentProductId }) => {
    const { data: allProducts, isLoading } = useQuery({
        queryKey: ['publicProducts'], // Uses cached data from homepage if available!
        queryFn: fetchAllProducts,
    });

    const relatedProducts = allProducts
        ?.filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 6);

    if (isLoading || !relatedProducts || relatedProducts.length === 0) {
        return null;
    }

    return (
        <div className='bg-blue-50 p-5 sm:p-8 mb-14'>
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

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
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
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage.src})` }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>
          <div className="relative z-10 flex items-center space-x-2">
            <p className="text-xl md:text-2xl underline"><Link href="/home">Home</Link></p>
            <span className="text-xl md:text-2xl">/</span>
            <h1 className="text-xl md:text-2xl text-blue-400 font-bold">Shop</h1>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-white bg-blue-500 mx-auto max-w-4xl p-2 mt-5 rounded-md max-sm:rounded-none">Product Details</h1>
      </div>

      <div className="p-5 max-w-5xl mx-auto mt-8 mb-10">
        <div className='flex flex-col md:flex-row gap-8 lg:gap-12'>
          
          <div className='md:w-1/2'>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          <div className='md:w-1/2 flex flex-col pt-4'>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-baseline mb-4">
              <p className="text-gray-900 text-3xl font-bold">₦{product.price.toLocaleString()}</p>
              {product.oldPrice && <p className="text-gray-500 text-lg line-through ml-3">₦{product.oldPrice.toLocaleString()}</p>}
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
            <div className="flex flex-col gap-3">
              <div className='bg-[#2648db] rounded-[5px] cursor-pointer text-xl font-semibold'>
                <AddToCartButton productId={product.id} />
              </div>
              <p className='text-center text-sm font-semibold'>OR</p>
              <a href="tel:+2348123456789">
                <button className='w-full text-lg max-sm:text-base border border-blue-500 text-white rounded-[5px] bg-blue-500 hover:bg-blue-600 py-2 px-6 cursor-pointer font-semibold transition-colors flex gap-2 items-center justify-center'>
                  <Phone size={24}/>
                  Call to order
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {product.category && <RelatedProducts category={product.category} currentProductId={product.id} />}

      <Docs/>
    </main>
  );
}

export default ProductPage;