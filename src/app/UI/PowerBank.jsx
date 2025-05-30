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
    <div className="">
      <h1 className="text-3xl relative max-sm:mx-0 mx-11.5 p-2 rounded max-sm:rounded-none text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-1 mt-2">Power Bank</h1> 
      <div className="px-10 max-sm:px-3">
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

