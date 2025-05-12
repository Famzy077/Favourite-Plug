// components/SlickSlider.js
"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SamsungSeries from "/public/Images/GalaxyS25.png";
import Watch from "/public/Images/WatchLanding.png";
import Mac from "/public/Images/Mac.png"
import Image from "next/image";
import Link from "next/link";
import Iphone from '/public/Images/iphoneSection__.png'



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
    <div className="overflow-hidden max-sm:m-3">
      <Slider className="mb-4.5 gap-5" {...settings}>
        <Link href={''}>
          <Image
            src={SamsungSeries}
            alt="Samsung Series"
            className="w-[100%] max-sm:w-[95%] max-sm:h-[30vh] h-[70vh] object-fit max-sm:rounded-2xl mx-3"
            title="Samsung Series"
          />
        </Link>

        <Link href={''}>
            <Image
              src={Watch}
              alt="Watch"
              className="w-[100%] max-sm:w-[95%] max-sm:h-[30vh] h-[70vh] object-fit max-sm:rounded-2xl mx-3"
              title="Watch"
            />
        </Link>
        
        <Link href={''}>
            <Image
              src={Mac}
              alt="Mac"
              className="w-[100%] max-sm:w-[95%] max-sm:h-[30vh] h-[70vh] object-fit max-sm:rounded-2xl mx-3"
              title="Mac"
            />
        </Link>
        
        <Link href={''}>
            <Image
              src={Iphone}
              alt="Mac"
              className="w-[100%] max-sm:w-[95%] max-sm:h-[30vh] h-[70vh] object-fit max-sm:rounded-2xl mx-3"
              title="Mac"
            />
        </Link>
      </Slider>
    </div>

  );
};

export default Section;
