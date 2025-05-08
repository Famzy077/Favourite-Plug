import React from 'react'
import Section from '../../app/UI/SlidedSection'
import Call from '../../app/UI/Call'
import ProductCard from '@/app/Components/ProductsCard'
import products from '../.././Data/ProductData.json'
import ProductBaner from '@/app/Components/Home/ProductBaner'
import { SmartwatchCarousel } from '@/app/Components/Home/WatchCarousel'
import PowerBank from '@/app/UI/PowerBank'
import Laptop from '@/app/UI/Laptop'
import Accessories from '@/app/UI/Accessories'
import Docs from '@/app/UI/Docs'
const Page = () => {
  
  const mobileProducts = products.filter(product => product.category === 'Smartphones' || product.category === 'Tablets');

  return (
    <div className='bg-zinc-200'>
      <Section/>
      <Call/>
      <div className='pb-10'>
        <h1 className='text-3xl max-sm:text-2xl  pl-10 py-2'>Mobile Devices</h1>
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
          {mobileProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

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
