'use client';
import React, { useEffect, useState } from 'react';
import Section from '@/app/Components/Home/SlidedSection';
import { Call, CallPhone } from '@/app/UI/Call';
import {ProductBaner, ProductBanerTwo} from '@/app/Components/Home/ProductBaner';
import { SmartwatchCarousel } from '@/app/Components/WatchCarousel';
import { PowerBank } from '@/app/Components/PowerBank';
import { Laptops} from '@/app/Components/Laptop';
import { MobileCategorySection } from '@/app/Components/Mobile';
import { Accessories, AccessoriesStick } from '@/app/Components/Accessories';
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
      <h1 className="text-3xl font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6">
        Mobile Phones <span>/</span> Tablets
      </h1>
      <MobileCategorySection />
      {/* <MobileSticky /> */}
      <ProductBaner />
      <h1 className="text-3xl font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6">
        Smart Watch
      </h1>
      <SmartwatchCarousel />
      <ProductBanerTwo />
      <h1 className="text-3xl font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6">
        Laptop Devices
      </h1>
      <Laptops />
      {/* <LaptopSlide /> */}
      <h1 className="text-3xl font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6">
        Power Banks
      </h1>
      <PowerBank />
      <div>
        <h1 className="text-3xl font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6">
          Accessories and more...
        </h1>
        <Accessories />
        {/* <AccessoriesStick /> */}
      </div>
      <Docs />
    </div>
  );
};

export default Page;