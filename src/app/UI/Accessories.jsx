'use client'
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from '@/app/Components/ProductsCard'
import products from '../.././Data/ProductData.json'


export const Accessories = () => {
  const accessories = products.filter((product) => product.category === "Accessories");

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
    <div className='-mb-3'>
      <div className="px-10 max-sm:px-2">
        <Slider {...settings}>
          {accessories.map((product) => (
            <div key={product.id} className="p-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export const AccessoriesStick = () => {
  const accessories = products.filter((product) => product.category === "Accessories").reverse();

  return (
    <div className="flex overflow-x-auto overflow-y-hidden gap-4 p-4 w-full scrollbar-hide mb-16">
      {accessories.map((product) => (
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
