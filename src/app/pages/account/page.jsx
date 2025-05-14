'use client'
import Sidebar from '@/app/Components/Account/Sidebar';
import AccountDetails from '@/app/Components/Account/AccountDetails.';
import profileImage from  '/public/Images/Xaomi.png'
import Image from 'next/image';
import AddressBook from '@/app/Components/Account/AddressBook';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const Account = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6 border border-gray-300 m-6 rounded-[4px]">
          <h2 className="text-2xl font-bold mb-4">Account Overview</h2>
          <div className="flex flex-col gap-4">
            
            <Image src={profileImage} alt='profileImage' width={100} height={100} className='rounded-full bg-pink-200 p-2' />
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-2x'>
              <AccountDetails name="Xavier Johnson" email="xavier@gmail.com" />
              <AddressBook/>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Account;
