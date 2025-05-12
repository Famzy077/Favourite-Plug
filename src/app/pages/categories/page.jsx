'use client'
import React, { Suspense } from 'react'
import Categories from '@/app/Components/Category/Categories'
import { BannerSlider } from '@/app/Components/Category/BannerSlider'

const Page = () => {
  return (
    <div>
      <BannerSlider/>
      <Suspense fallback={<div>Loading categories...</div>}>
        <Categories />
      </Suspense>
    </div>
  )
}

export default Page
