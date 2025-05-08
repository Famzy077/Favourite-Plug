import React from 'react'
import Section from '../../app/UI/SlidedSection'
import Call from '../../app/UI/Call'
import ProductCard from '@/app/Components/ProductsCard'
import products from '../.././Data/ProductData.json'
import ProductBaner from '@/app/Components/Home/ProductBaner'
import { SmartwatchCarousel } from '@/app/Components/Home/WatchCarousel'
import {PowerBank} from '@/app/Components/PowerBank'
import Laptop from '@/app/UI/Laptop'
import Accessories from '@/app/UI/Accessories'
import Docs from '@/app/UI/Docs'
import {Mobile} from '@/app/Components/MobileSlide'
const Page = () => {
  

  return (
    <div className='bg-zinc-200'>
      <Section/>
      <Call/>
      <Mobile/>

      <ProductBaner/>
      <SmartwatchCarousel/>
      <Laptop/>
      <PowerBank/>
      
      <div>
        <h1 className='text-3xl max-sm:text-2xl  pl-10 py-2'>Accessories and more...</h1>
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
