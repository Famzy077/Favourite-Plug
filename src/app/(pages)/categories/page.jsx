'use client'
import React, { Suspense } from 'react'
import Categories from '@/app/Components/Category/Categories'
import BannerSlider from '@/app/Components/Category/BannerSlider';
import Docs from '../../UI/Docs';

const Page = () => {
  return (
    <div>
      <BannerSlider/>
      <Suspense fallback={<div>Loading categories...</div>}>
        <Categories />
      </Suspense>
      
      <Docs/>
    </div>
  )
}

export default Page
