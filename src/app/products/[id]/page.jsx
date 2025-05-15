'use client'
import { Accessories } from '@/app/UI/Accessories';
import Image from 'next/image'
import Link from 'next/link'
import products from '..//../../Data/ProductData.json'
import { MobileSticky } from '@/app/UI/Mobile';
import { HeaderPage, MobileBottomNav } from '@/app/UI/Header';
import Footer from '@/app/UI/Footer';
import Docs from '@/app/UI/Docs';

export default function ProductDetail({ params }) {
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main>
      <HeaderPage/>
      <div className='text-center'>
        <div className="relative h-[50vh] flex justify-center items-center text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/Images/GalaxySeries.png')" }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative z-10 flex items-center space-x-2">
            <p className="text-2xl underline">
              <Link href="/">Home</Link>
            </p>
            <span className="text-2xl">/</span>
            <h1 className="text-2xl text-blue-400 font-bold">Shop</h1>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-1 text-white rounded-xl bg-blue-500 mx-10 p-2 mt-5">Product Details</h1>
      </div>
      <div className="p-5 max-w-3xl">
        <main className='flex gap-5 max-sm:flex-col'>
          <div className='w-[50%] max-sm:w-[100%] flex justify-center items-center'>
            <Image src={product.image} width={300} height={100} alt={product.name} className="w-[100%] max-sm:h-[fit-content] h-[50vh] mb-4" />
          </div>
          <div className='w-[50%] max-sm:w-[100%] flex flex-col justify-center items-start'>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-2">₦{product.price.toLocaleString()}</p>
            <strike className="text-gray-600 relative -top-2.5 text-sm">₦{product.oldPrice.toLocaleString()}</strike>
            <p className="text-gray-600">{product.description}</p>
            <div className='mt-5'>
              <button className='text-2xl border border-blue-500 text-white rounded-xl bg-blue-500 hover:bg-blue-400 py-2 px-3 cursor-pointer'>Call to order</button>
            </div>
          </div>
        </main>
      </div>

      <div className='bg-blue-100 p-5 mb-14'>
        <h1 className='text-2xl pt-8 px-4  pl-0 max-sm:text-xl font-semibold text-zinc-800'>You can also explore other items</h1>
        <Accessories/>
        <MobileSticky/>
      </div>

      <Docs/>
      <Footer/>
      <MobileBottomNav/>
    </main>
  );
}
