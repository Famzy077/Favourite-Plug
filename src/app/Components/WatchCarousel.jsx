import Slider from "react-slick";
import ProductCard from "../Components/ProductsCard";
import products from '../../Data/ProductData.json';

export const SmartwatchCarousel = () => {
  const smartwatchProducts = products.filter(
    (product) => product.category === "Smartwatches"
  );

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
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
    <div className="pb-4">
      <h1 className="text-3xl max-sm:top relative max-sm:mx-0 max-sm:rounded-none mx-11.5 p-2 rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-2 mt-5">Fashion Watch</h1> 
      <div className="px-10 max-sm:px-2">
        <Slider {...settings}>
          {smartwatchProducts.map((product) => (
            <div key={product.id} className="p-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
