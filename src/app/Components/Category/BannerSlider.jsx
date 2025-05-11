"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Infinix from "/public/Images/InfinixNote.png";
import Samsung from "/public/Images/GalaxyS25.png";
import SamsungA52 from "/public/Images/SamsungA52.png"
import Image from "next/image";
import Link from "next/link";
import Iphone from '/public/Images/iphoneSection__.png'



export const BannerSlider = () => {
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
          <div className="bg-black w-full max-sm:h-[30vh]  h-[70vh] flex justify-center items-center">
            <Link href={''}>
              <Image
                src={Infinix}
                alt="Infinix Series"
                className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh]  h-[70vh] object-fit"
                title="Samsung Series"
              />
            </Link>
          </div>

          <div className="bg-[#0f0f0f] w-full max-sm:h-[30vh]  h-[70vh] relative flex justify-center items-center">
            <Link href={''}>
                <Image
                  src={Samsung}
                  alt="Watch"
                  className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh]   h-[70vh] object-fit"
                  title="Watch"
                />
            </Link>
          </div>

          <div className="bg-zinc-800 w-full max-sm:h-[30vh]  h-[70vh] relative flex justify-center items-center">
            <Link href={''}>
                <Image
                  src={SamsungA52}
                  alt="Mac"
                  className="w-[100%] max-sm:w-[100%] max-sm:h-[30vh]  h-[70vh] object-fit"
                  title="Mac"
                />
            </Link>
          </div>

          <div className="bg-zinc-800 w-full max-sm:h-[30vh] h-[70vh] relative flex justify-center items-center">
            <Link href={''}>
                <Image
                  src={Iphone}
                  alt="Mac"
                  className="w-[100%] max-sm:h-[30vh]  h-[70vh] object-fit"
                  title="Mac"
                />
            </Link>
          </div>
        </Slider>
    </div>

  );
};
