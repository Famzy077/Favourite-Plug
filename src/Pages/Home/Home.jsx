'use client'
import React from 'react'
import Section from '../../app/Components/Home/SlidedSection'
import Call from '../../app/UI/Call'
import products from '../.././Data/ProductData.json'
import ProductBaner from '@/app/Components/Home/ProductBaner'
import { SmartwatchCarousel } from '@/app/UI/WatchCarousel'
import {PowerBank} from '@/app/UI/PowerBank'
import {Laptops, LaptopSlide} from '@/app/UI/Laptop'
import { Mobile, MobileSticky } from '@/app/UI/MobileSlide'
import { Accessories, AccessoriesStick } from '@/app/UI/Accessories'

const Page = () => {
  

  return (
    <div className='bg-zinc-200'>
      <Section/>
      <Call/>
      <Mobile/>
      <MobileSticky/>
      <ProductBaner/>
      <SmartwatchCarousel/>
      <Laptops/>
      <LaptopSlide/>
      <PowerBank/>
      <div>
        <h1 className="text-3xl max-sm:mx-4 mx-11.5 p-2 rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-16">Accessories and more...</h1> 
        <Accessories/>
        <AccessoriesStick/>
      </div>
    </div>
  )
}
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
export default Page
