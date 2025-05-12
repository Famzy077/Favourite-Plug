import Slider from "react-slick";
import ProductCard from "../Components/ProductsCard";
import products from '../.././Data/ProductData.json';

export const Mobile = () => {
  const mobileProducts = products.filter(
    (product) => product.category === "Smartphones" || product.category === "Tablets");

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='-mb-3'>
      <h1 className="text-3xl max-sm:rounded-none max-sm:mx-0 mx-11.5 p-2 rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-16">Mobile Phones/Tablets</h1> 
      <div className="px-10 max-sm:-top-2 relative max-sm:px-2">
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


export const MobileSticky = () => {
  const mobileProducts = products
    .filter(product => product.category === "Smartphones" || product.category === "Tablets")
    .reverse();

  return (
    <div className="flex overflow-x-auto overflow-y-hidden gap-4 p-4 w-full scrollbar-hide">
      {mobileProducts.map((product) => (
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

