'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo1 from '../../../public/Images/Logo1.png';
import MiniHeader from './MiniHeader';

const HeaderPage = () => {
  return (
    <div className='justify-between sticky top-0 z-80 items-center'>
      <header className='flex bg-blue-200 p-4 max-sm:p-2 shadow-md'>
        <div className='flex items-center w-[50%]'>
          <Link href={'/'}>
            <Image className='w-[10rem] max-sm:w-[7rem]' src={Logo1} alt="Logo" />
          </Link>
        </div>

        <nav className='flex items-center space-x-4 w-full text-xl max-md:hidden'>
          <ul className='flex space-x-7 text-gray-700'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/">About</Link></li>
            <li><Link href="/">Blog</Link></li>
            <li><Link href="/">Contact</Link></li>
          </ul>
        </nav>
      </header>
        <MiniHeader/>
    </div>
  );
};

export default HeaderPage;
