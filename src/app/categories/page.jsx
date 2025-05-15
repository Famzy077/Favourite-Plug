'use client'
import React, { Suspense } from 'react'
import Categories from '@/app/Components/Category/Categories'
import { BannerSlider } from '@/app/Components/Category/BannerSlider';
import { HeaderPage, MobileBottomNav } from '../UI/Header';
import Footer from '../UI/Footer';
import Docs from '../UI/Docs';

const Page = () => {
  return (
    <div>
      <HeaderPage/>
      <BannerSlider/>
      <Suspense fallback={<div>Loading categories...</div>}>
        <Categories />
      </Suspense>
      
      <Docs/>
      <Footer/>
      <MobileBottomNav/>
    </div>
  )
}

export default Page
