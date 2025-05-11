'use client'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import Techno from '/public/Images/InfinixNote.png'
import Samsung from '/public/Images/SamsungA52.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const BannerSlider = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      autoplay
      speed={1000}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div>
            <img src={Techno} className='w-[full]' alt="Techno" />
        </div>
      </SwiperSlide>
      <SwiperSlide><img src={Samsung} alt="Samsung" /></SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};