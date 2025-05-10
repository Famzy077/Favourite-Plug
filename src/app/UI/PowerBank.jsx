// import React from 'react'
// import ProductCard from '@/app/Components/ProductsCard'
// import products from '../.././Data/ProductData.json'

// const PowerBank = () => {
//     const mobileProducts = products.filter(product => product.category === 'PowerBanks');

//   return (
//     <div>
//       <div className='pb-10'>
//         <h1 className='text-3xl max-sm:text-2xl  pl-10 py-2'>Power Banks</h1>
//         <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
//           {mobileProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PowerBank

import Slider from "react-slick";
import ProductCard from '../Components/ProductsCard';
import products from '../.././Data/ProductData.json';

export const PowerBank = () => {
  const powerBanks = products.filter(
    (product) => product.category === "PowerBanks");

  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="pb-10">
      <h1 className="text-3xl max-sm:mx-12 mx-11.5 p-2 rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-16">Power Bank</h1> 
      <div className="px-10">
        <Slider {...settings}>
          {powerBanks.map((product) => (
            <div key={product.id} className="p-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

