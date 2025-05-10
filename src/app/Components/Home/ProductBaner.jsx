import React from 'react'
import Image from 'next/image'
import SectionWatch from '../../../../public/Images/SectionWatch.png'

const ProductBaner = () => {
  return (
    <div>
      <Image src={SectionWatch} className='w-[100%] h-fit max-sm:h-[22vh] object-fit' alt='banner-image' />
    </div>
  )
}

export default ProductBaner
