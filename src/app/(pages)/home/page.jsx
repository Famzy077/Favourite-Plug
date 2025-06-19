'use client';
import React, { useEffect, useState } from 'react';
import Section from '@/app/Components/Home/SlidedSection';
import { Call, CallPhone } from '@/app/UI/Call';
import {ProductBaner, ProductBanerTwo} from '@/app/Components/Home/ProductBaner';
import { SmartwatchCarousel } from '@/app/Components/WatchCarousel';
import { PowerBank } from '@/app/Components/PowerBank';
import { Laptops} from '@/app/Components/Laptop';
import { MobileCategorySection } from '@/app/Components/Mobile';
import { Accessories } from '@/app/Components/Accessories';
import Link from 'next/link';
import Docs from '../../UI/Docs';

// Spinner Component
const Spinner = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Page = () => {
  const [loading, setLoading] = useState(true);

  //loading for 1 second to simulate initial data processing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="bg-zinc-100">
      <CallPhone />
      <Section />
      <Call />
      <div className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-[#2648db] max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
        <h1>Mobile Phones <span>/</span> Tablets </h1>
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </div>
      <MobileCategorySection />
      {/* <MobileSticky /> */}
      <ProductBaner />
      <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-[#2648db] max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
        Smart Watch
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </h1>
      <SmartwatchCarousel />
      <ProductBanerTwo />
      <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-[#2648db] max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
        Laptop Devices
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </h1>
      <Laptops />
      {/* <LaptopSlide /> */}
      <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-[#2648db] max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
        Power Banks
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </h1>
      <PowerBank />
      <div>
        <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-[#2648db] max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
          Accessories and more...
          <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
        </h1>
        <Accessories />
        {/* <AccessoriesStick /> */}
      </div>
      <Docs />
    </div>
  );
};

export default Page;