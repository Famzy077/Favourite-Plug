import React from 'react'
import ProductCard from '../ProductsCard'
import products from '../../../Data/ProductData.json'
export const MobileCategories = () => {
    const mobileProducts = products;
  return (
    <div className="grid max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-x-auto overflow-y-hidden gap-4 p-4 w-full scrollbar-hide">
      {mobileProducts.map((product) => (
        <div
          key={product.id}
          className="min-w-[10rem] flex-shrink-0"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};