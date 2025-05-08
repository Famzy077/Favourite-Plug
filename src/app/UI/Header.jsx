import React from 'react'
import Image from 'next/image'
import Logo1 from '../../../public/Images/Logo1.png'
import Link from 'next/link';
// import Men

const HeaderPage = () => {
  return (
    <header className='flex mt-0 justify-between sticky -top-2 z-80 items-center bg-blue-100 p-4 max-sm:p-2 shadow-md'>
        <div className='flex items-center w-[50%]'>
            <Link href={'/'}>
                <Image className='w-[10rem] max-sm:w-[7rem]' src={Logo1} alt="Logo" layout="intrinsic" />
            </Link>
        </div>
        <nav className='flex max-md:hidden items-center space-x-4 w-[50%] text-xl'> 
            <ul className='flex space-x-7 text-gray-700'>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">Products</Link></li>
                <li><Link href="/">About</Link></li>
                <li><Link href="/">Services</Link></li>
                <li><Link href="/">Blog</Link></li>
                <li><Link href="/">Contact</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default HeaderPage