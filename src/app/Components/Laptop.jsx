'use client'
import Slider from "react-slick";
import React from 'react'
import ProductCard from '@/app/Components/ProductsCard'
import products from '../.././Data/ProductData.json'

export const Laptops = () => {
  const laptops = products.filter((product) =>product.category === "Laptops");

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="">
        <h1 className="text-3xl relative max-sm:rounded-none max-sm:mx-0 mx-11.5 p-2 rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-3 mt-2">Laptop Devices</h1> 
      <div className="px-10 max-sm:px-2 -mb-5">
        <Slider {...settings}>
          {laptops.map((product) => (
            <div key={product.id} className="p-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export const LaptopSlide = () => {
  const laptop = products
    .filter(product => product.category === "Laptops")
    .reverse();

  return (
    <div className="flex overflow-x-auto overflow-y-hidden gap-4 p-4 w-full scrollbar-hide">
      {laptop.map((product) => (
        <div
          key={product.id}
          className="min-w-[10rem] flex-shrink-0"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};