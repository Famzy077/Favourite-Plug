import React from 'react'
import ProductCard from '@/app/Components/ProductsCard'
import products from '../.././Data/ProductData.json'

const Accessories = () => {
    const mobileProducts = products.filter(product => product.category === 'Accessories');

  return (
    <div>
      <div className='pb-10'>
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
          {mobileProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Accessories