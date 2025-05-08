import React from 'react'
import ProductCard from '@/app/Components/ProductsCard'
import products from '../.././Data/ProductData.json'

const Laptop = () => {
    const mobileProducts = products.filter(product => product.category === 'Laptops');

  return (
    <div>
      <div className='pb-10'>
        <h1 className='text-3xl max-sm:text-2xl  pl-10 py-2'>Laptop Devices</h1>
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
          {mobileProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Laptop
