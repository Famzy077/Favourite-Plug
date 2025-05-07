import React from 'react'
import Section from '../../app/UI/SlidedSection'
import Call from './Call'
import ProductCard from '@/app/Components/ProductsCard'
import products from '../.././Data/ProductData.json'
import Footer from '@/app/UI/Footer'

const Page = () => {
  return (
    <div className='bg-zinc-200'>
        <Section/>
        <Call/>
        <div className='pb-10'>
          <h1 className='text-3xl max-sm:text-2xl  pl-10 py-4'>Mobile Devices</h1>
          <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div>
          <h1>Smart Watches</h1>
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
