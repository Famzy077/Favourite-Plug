import React from 'react'
import Image from 'next/image'
import SectionWatch from '../../../../public/Images/SectionWatch.png'
import SectionWatchTwo from '../../../../public/Images/LaptopSection.png'

export const ProductBaner = () => {
  return (
    <div>
      <Image src={SectionWatch} className='w-[] h-fit max-sm:h-[26vh] object-fit' alt='banner-image' />
    </div>
  )
}
export const ProductBanerTwo = () => {
  return (
    <div>
      <Image src={SectionWatchTwo} className='w-[%] h-[59vh] max-sm:h-[28vh] object-fit lg:h-[87vh]' alt='banner-image' />
    </div>
  )
}
