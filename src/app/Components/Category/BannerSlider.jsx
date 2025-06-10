"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerImg from "/public/Images/Phones.png";
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
    <div className="overflow-hidden bg-zinc-200 pt-3">
      <Slider className="mb-4.5" {...settings}>
        <Link href={''}>
          <Image
            src={BannerImg}
            alt="Infinix Series"
            className="w-[100%] max-sm:w-[95%] max-sm:h-[30vh] h-[70vh] object-fit max-sm:rounded-2xl mx-3"
            title="Samsung Series"
          />
        </Link>

        <Link href={''}>
            <Image
              src={Samsung}
              alt="Watch"
              className="w-[100%] max-sm:w-[95%] max-sm:h-[30vh] h-[70vh] object-fit max-sm:rounded-2xl mx-3"
              title="Watch"
            />
        </Link>

        <Link href={''}>
            <Image
              src={SamsungA52}
              alt="SamsungA52"
              className="w-[100%] max-sm:w-[95%] max-sm:h-[30vh] h-[70vh] object-fit max-sm:rounded-2xl mx-3"
              title="SamsungA52"
            />
        </Link>

        <Link href={''}>
            <Image
              src={Iphone}
              alt="Iphone"
              className="w-[100%] max-sm:w-[95%] max-sm:h-[30vh] h-[70vh] object-fit max-sm:rounded-2xl mx-3"
              title="Iphone"
            />
        </Link>
      </Slider>
    </div>

  );
};