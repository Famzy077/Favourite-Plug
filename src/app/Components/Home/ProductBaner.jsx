import React from 'react'
import Image from 'next/image'
import SectionWatch from '../../../../public/Images/SectionWatch.png'
import SectionWatchTwo from '../../../../public/Images/LaptopSection.png'

export const ProductBaner = () => {
  return (
    <div>
      <Image src={SectionWatch} className='w-[100%] h-fit max-sm:h-[22vh] object-fit' alt='banner-image' />
    </div>
  )
}
export const ProductBanerTwo = () => {
  return (
    <div>
      <Image src={SectionWatchTwo} className='w-[100%] h-[59vh] max-sm:h-[28vh] object-fit ' alt='banner-image' />
    </div>
  )
}
