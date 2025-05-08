import Slider from "react-slick";
import ProductCard from './ProductsCard';
import products from '../.././Data/ProductData.json';

export const Mobile = () => {
  const mobileProducts = products.filter(
    (product) => product.category === "Smartphones" | product.category === "Tablets");

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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="pb-10">
      <h1 className="text-3xl max-sm:text-2xl pl-12 pt-16">Mobile Phones/Tablets</h1> 
      <div className="px-10">
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
