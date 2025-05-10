'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo1 from '../../../public/Images/Logo.png';
import MiniHeader from './MiniHeader';
import { Menu } from 'lucide-react';
const HeaderPage = () => {
  return (
    <div className='justify-between sticky top-0 z-80 items-center'>
      <header className='flex bg-blue-200 p-2 max-sm:p-2 shadow-md items-center justify-between'>
        <div className='flex items-center w-[100%]  lg-[50%] justify-between'>
          <Link href={'/'}>
            <Image className='w-[3.5rem] lg:ml-2 border max-sm:w-[2rem]' src={Logo1} alt="Logo" />
          </Link>

          <Menu className='mr-2 cursor-pointer max-sm:block md:block lg:hidden' size={30}/>
        </div>

        <nav className='flex items-center space-x-4 w-[50%] text-xl max-sm:hidden max-md:hidden md:hidden lg:block'>
          <ul className='flex space-x-7 text-gray-800'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/">About</Link></li>
            <li><Link href="/">Blog</Link></li>
            <li><Link href="/">Contact</Link></li>
          </ul>
        </nav>
        <div className='w-[50%] max-sm:hidden text-center max-md:hidden md:hidden lg:block'>
          <button className='bg-blue-500 hover:bg-blue-400 transition-all text-white px-3 py-1.5 rounded-sm cursor-pointer'>
            Call To Order
          </button>
        </div>
      </header>
      <MiniHeader/>
    </div>
  );
};

export default HeaderPage;
