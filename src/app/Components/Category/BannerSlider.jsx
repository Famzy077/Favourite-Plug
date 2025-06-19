import React from 'react'
import Image from 'next/image';
import bannerImage from '/public/Images/GalaxySeries.png';

const BannerSlider = () => {
  return (
    <div>
      <div className="relative h-[50vh] flex justify-center items-center text-white bg-gray-800">
        <Image src={bannerImage} alt="Products Banner" layout="fill" objectFit="cover" className="opacity-30" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">All Products</h1>
          <p className="text-lg mt-2">Find your favorite gadgets right here.</p>
        </div>
      </div>
    </div>
  )
}

export default BannerSlider
