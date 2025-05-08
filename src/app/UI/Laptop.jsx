import Slider from "react-slick";
import React from 'react'
import ProductCard from '@/app/Components/ProductsCard'
import products from '../.././Data/ProductData.json'

export const Laptop = () => {
    const mobileProducts = products.filter(product => product.category === 'Laptops');

  return (
    <div>
      <div className='pb-10'>
          <h1 className="text-3xl max-sm:mx-4 mx-11.5 p-2 rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-16">Laptop Device</h1> 
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
          {mobileProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const Laptops = () => {
  const mobileProducts = products.filter(
    (product) => product.category === "Laptops");

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
    <div className="pb-10">
        <h1 className="text-3xl max-sm:mx-4 mx-11.5 p-2 rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-16">Laptop Devices</h1> 
      <div className="px-10 max-sm:px-2">
        <Slider {...settings}>
          {mobileProducts.map((product) => (
            <div key={product.id} className="p-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
