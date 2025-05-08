// components/SlickSlider.js
"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SamsungSeries from "../../../public/Images/GalaxyS25.png";
import Watch from "../../../public/Images/WatchLanding.png";
import Mac from "../../../public/Images/Mac.png"
import Image from "next/image";
import Link from "next/link";
import Iphone from '../../../public/Images/iphoneSection__.png'



const Section = () => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };

  return (
    <div className="overflow-hidden">
        <Slider className="mb-4.5" {...settings}>
          <div className="bg-black w-full max-sm:h-[30vh] h-[80vh] flex justify-center items-center">
            <Link href={''}>
              <Image
                src={SamsungSeries}
                alt="Samsung Series"
                className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh] h-full object-fit"
                title="Samsung Series"
              />
            </Link>
          </div>

          <div className="bg-[#0f0f0f] w-full max-sm:h-[30vh] h-[80vh] relative flex justify-center items-center">
            <div className="text-white max-sm:text-3xl text-6xl absolute top-22 left-0 z-10 px-4">
              <h1>Smart Watch Pro</h1>
              <button className="border border-white rounded hover:shadow cursor-pointer py-2 max-sm:px-2 px-3 max-sm:text-xl text-2xl font-medium bg-zinc-300 hover:bg-zinc-200 text-black">Call to Order</button>
            </div>
            <Link href={''}>
                <Image
                  src={Watch}
                  alt="Watch"
                  className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh] h-full object-fit"
                  title="Watch"
                />
            </Link>
          </div>

          <div className="bg-zinc-800 w-full max-sm:h-[30vh] h-[80vh] relative flex justify-center items-center">
            <h1 className="text-white max-sm:text-3xl text-5xl absolute top-10 left-0 text-center z-10 px-4">Get Affordable Gadget</h1>
            <Link href={''}>
                <Image
                  src={Mac}
                  alt="Mac"
                  className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh] h-full object-fit"
                  title="Mac"
                />
            </Link>
          </div>

          <div className="bg-zinc-800 w-full max-sm:h-[30vh] h-[80vh] relative flex justify-center items-center">
            <h1 className="text-white max-sm:text-3xl text-5xl absolute top-10 left-0 text-center z-10 px-4">Explore Apple</h1>
            <p className="text-white max-sm:text-3xl text-5xl absolute mt-2 top-20 left-0 text-center z-10 px-4">Products</p>
            <Link href={''}>
                <Image
                  src={Iphone}
                  alt="Mac"
                  className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh] h-full object-fit"
                  title="Mac"
                />
            </Link>
          </div>
        </Slider>
    </div>

  );
};

export default Section;
