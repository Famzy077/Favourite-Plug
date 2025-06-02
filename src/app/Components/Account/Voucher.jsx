import React from 'react'
import { FaBoxOpen } from "react-icons/fa";
import { useState, useEffect } from 'react'

const Voucher = () => {
    const [voucher, setVoucher] = useState(null)
    useEffect(() => {
       setVoucher('You\'re not eligible for the voucher yet')
    }, [])
  return (
    <div className='place-items-center place-content-center min-h-[70vh]'>
      <div className='border rounded-[5px] items-center flex w-[30rem] border-zinc-400 justify-between px-4 py-2'>
        <h1 className='text-zinc-600'>{voucher}</h1>
        <div>
            <FaBoxOpen className='text-[2.5rem] text-zinc-600'/>
        </div>
      </div>
      <p className='text-start text-zinc-600'>Shop more to be eligible for the free voucher</p>
    </div>
  )
}

export default Voucher