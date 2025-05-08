import React from 'react'
import ProductCard from '@/app/Components/ProductsCard'
import products from '../.././Data/ProductData.json'

const Mobile = () => {
    const mobileProducts = products.filter(product => product.category === 'Smartphones' || product.category === 'Tablets');

  return (
    <div>
      <div className='pb-10'>
      <h1 className="text-3xl max-sm:mx-4 mx-11.5 p-2 rounded text-white bg-blue-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-16">Mobile Phones/Tablets</h1> 
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-5">
          {mobileProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Mobile