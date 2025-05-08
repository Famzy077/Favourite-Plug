import React from 'react'
import Section from '../../app/UI/SlidedSection'
import Call from '../../app/UI/Call'
import products from '../.././Data/ProductData.json'
import ProductBaner from '@/app/Components/Home/ProductBaner'
import { SmartwatchCarousel } from '@/app/Components/Home/WatchCarousel'
import {PowerBank} from '@/app/Components/PowerBank'
import {Laptops} from '@/app/UI/Laptop'
import { Accessories } from '@/app/UI/Accessories'
import {Mobile} from '@/app/Components/MobileSlide'
const Page = () => {
  

  return (
    <div className='bg-zinc-200'>
      <Section/>
      <Call/>
      <Mobile/>

      <ProductBaner/>
      <SmartwatchCarousel/>
      <Laptops/>
      <PowerBank/>
      
      <div>
        <h1 className="text-3xl max-sm:mx-4 mx-11.5 p-2 rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-16">Accessories and more...</h1> 
        <Accessories/>
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
