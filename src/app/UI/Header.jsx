'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Logo1 from '../../../public/Images/Logo.png';
import MiniHeader from './MiniHeader';
import { Heart, Menu, UserRound } from 'lucide-react';
import { HomeIcon, List } from 'lucide-react';
export const HeaderPage = () => {
  return (
    <div className='justify-between sticky top-0 z-80 items-center'>
      <div className='max-md:hidden block'>
        <header className='flex bg-blue-200 p-2 max-sm:p-2  shadow-md items-center justify-between'>
          <div className='flex items-center w-[100%] justify-between'>
            <Link href={'/'}>
              <Image className='w-[3.5rem] lg:ml-2 border max-sm:w-[2rem]' src={Logo1} alt="Logo" />
            </Link>
          </div>

          <nav className=' items-center space-x-4 w-[80%] text-xl max-md:hidden block'>
            <ul className='flex space-x-5 text-gray-800'>
              <li><Link href="/home">Home</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/wishlist">Wishlist</Link></li>
              <li><Link href="/account">Account</Link></li>
            </ul>
          </nav>
          <div className='w-[70%] max-md:hidden block text-center'>
            <button className='bg-blue-500 hover:bg-blue-400 transition-all text-white px-3 py-1.5 rounded-sm cursor-pointer'>
              Call To Order
            </button>
          </div>
        </header>
      </div>
        <MiniHeader/>
    </div>
  );
};

export const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/home', icon: <HomeIcon />, label: 'Home' },
    { href: '/categories', icon: <List />, label: 'Categories' },
    { href: '/wishlist', icon: <Heart />, label: 'Wishlist' },
    { href: '/account', icon: <UserRound />, label: 'Account' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] block sm:hidden bg-white border-t border-gray-200">
      <main className="flex justify-around items-center px-4 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label}>
              <div
                className={`flex flex-col items-center text-xs transition-all duration-200 ${
                  isActive ? 'text-blue-600 scale-110' : 'text-gray-500'
                }`}
              >
                {React.cloneElement(item.icon, { size: 24 })}
                <span className="mt-1">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
};
