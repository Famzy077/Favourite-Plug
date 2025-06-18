          'use client'
          import toast from 'react-hot-toast';
          import { Button } from '@/components/ui/button';
import React from 'react'
import { Phone } from 'lucide-react'

 const pageItem = () => {
  return (
    <div className='h-[] m-16 mb-20'>
        <main className='text-amber-400 font-semibold text-[18px] font-sans'>
          <h1 className='text-amber-500 text-[20px] font-bold'>Liquid Gold Pro</h1>
          <p>Investors and property development consultants</p>
          <p>2b Adeola drive, Allen Avenue, Ikeja.</p>
          <p>Email: <span className='text-blue-900 underline'>Liquidgoldpropertymanagers@gmail.com</span></p>
          <p className='flex gap-3.5'><Phone className='text-red-600'/> 0807260024</p>
        </main>
        <br />

        <h2 className='my-4 text-xl font-bold'>Receipt Of Payment</h2>
      <div className='text-[15px] font-sans'>
        <p><span className='font-semibold'>To:</span> Christiana Joy Agboola</p>
      <p><span className='font-semibold'>Re:</span> Payment for shop C attached to No 1 Ondo street off Ishawo Road, Agric Ikorodu</p>
      <br />
      <p>The undersigned hereby acknowledge receipt of payment of the sum of five hundred and  <br /> fifty thousand Naira (550,000), only.</p>
      <br />
      <p>Dated: 24th of May 2025</p>
      <p>Rent Period: July 1st 2025 to june 30th 2026</p>
      <p>Refundable deposit: 50,000 Naira only (with landlord)</p>
      Annual rent: 125,000 Naira Only
      </div>
      <br />
      <p>Ebenezer Fasipe</p>
      <div className="p-10 mt-20 z-[999]">
      <Button onClick={() => toast.success("Hello from Sonner!")}>
        Test Toast
      </Button>
    </div>
    </div>
  )
};
export default pageItem
// 'use client';
// const TestToast = () => {
//   return (
    
//   );
// }
// export default TestToast