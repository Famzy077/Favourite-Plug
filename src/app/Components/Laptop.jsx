'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Slider from "react-slick";
import { AddToCartButton } from './cart/AddToCartButton';
import { useEffect, useRef, useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ProductCardSkeleton } from './ProductCardSkeleton';

const API_URL = "https://favorite-server-0.onrender.com";

const fetchAllProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products`);
  return res.data.data;
};

// ====== PRODUCT CARD WITH ANIMATIONS ======
const ProductCard = ({ product }) => {
  const calculateDiscount = (price, oldPrice) => {
    if (!oldPrice || oldPrice <= price) return null;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };
  const discountPercentage = calculateDiscount(product.price, product.oldPrice);
  const displayImage = product?.images?.[0]?.url || '/Images/placeholder.png';

  return (
    <div className="relative overflow-hidden transition-all duration-300 ease-out bg-white border border-gray-300 rounded-lg group hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <div className="flex justify-center w-full py-3 overflow-hidden bg-white aspect-w-1 aspect-h-1">
          <img
            src={displayImage}
            alt={product.name}
            className="max-sm:h-[100px] h-[120px] object-contain object-center transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      
      {/* Animated discount badge */}
      {discountPercentage && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs max-sm:text-[11px] font-bold max-sm:px-[0.3rem] px-2 py-1 rounded-md animate-pulse shadow-lg">
          -{discountPercentage}%
        </div>
      )}
      
      <div className="p-4 pb-2 transition-colors duration-300 bg-gray-200 max-sm:py-0 group-hover:bg-gray-100">
        <h3 className="text-1.8 max-sm:text-[0.9rem] lg:font-semibold text-gray-800 font-medium truncate transition-colors duration-300 group-hover:text-blue-600">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="flex items-baseline my-0.5">
          <p className="text-[15px] max-sm:text-[13px] font-medium text-gray-800 transition-colors duration-300 group-hover:text-green-600">
            ₦{product.price ? product.price.toLocaleString() : '0.00'}
          </p>
          {product.oldPrice && (
            <p className="ml-2 text-[14px] max-sm:text-[11px] text-gray-500 line-through">
              ₦{product.oldPrice.toLocaleString()}
            </p>
          )}
        </div>
        
        <div className="transition-transform duration-300 group-hover:scale-[1.02]">
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
};

// ====== LAPTOPS COMPONENT WITH INTERSECTION OBSERVER ======
export const Laptops = () => { 
  const [isVisible, setIsVisible] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => {
              setShouldFetch(true);
            }, 2000); // 800ms delay to show skeleton animation
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ['publicProducts'],
    queryFn: fetchAllProducts,
    enabled: shouldFetch,
  });

  const laptopProducts = allProducts?.filter(
    (product) => product.category === "Laptops"
  );

  const settings = {
    dots: false,
    infinite: laptopProducts ? laptopProducts.length > 6 : false,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      { breakpoint: 1920, settings: { slidesToShow: 5, slidesToScroll: 1, infinite: laptopProducts ? laptopProducts.length > 5 : false } },
      { breakpoint: 1600, settings: { slidesToShow: 5, slidesToScroll: 1, infinite: laptopProducts ? laptopProducts.length > 5 : false } },
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 1, infinite: laptopProducts ? laptopProducts.length > 5 : false } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: laptopProducts ? laptopProducts.length > 3 : false } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: laptopProducts ? laptopProducts.length > 2 : false } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: laptopProducts ? laptopProducts.length > 2 : false } },
    ],
  };
  
  const loadingSettings = {
    ...settings,
    infinite: false,
    autoplay: false,
  };

  if (error) {
    return (
      <div ref={sectionRef} className="py-10 text-center">
        <p className="text-red-500">Failed to load laptop products.</p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className='container px-4 py-6 mx-auto sm:px-3 lg:px-2'>
      {!isVisible ? (
        // Show placeholder before section is visible
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin"></div>
        </div>
      ) : isLoading || !shouldFetch ? (
        // Show skeleton when section is visible and loading
        <Slider {...loadingSettings}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-2">
              <ProductCardSkeleton />
            </div>
          ))}
        </Slider>
      ) : laptopProducts && laptopProducts.length > 0 ? (
        // Show actual products with fade-in animation
        <div className="animate-fadeIn">
          <Slider {...settings}>
            {laptopProducts.map((product) => (
              <div key={product.id} className="p-2"> 
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">
          <p>No laptops found at the moment.</p>
        </div>
      )}
    </div>
  );
};