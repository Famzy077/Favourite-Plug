import React from 'react'

export const Call = () => {
  return (
    <div className='max-sm:px-0 px-22 my-10'>
      <main className='bg-white p-3 text-center font-bold text-black'>
        <h1 className='text-2xl max-sm:text-xl'>Favorite Plug & Gadget</h1>
      </main>
      <div className='bg-blue-400 max-sm:my-5  my-10 p-3 text-center font-bold text-white'>
        <h1 className='text-2xl max-sm:text-[17px]'>Tech & Gadget +61-876161-8826</h1>
      </div>
    </div>
  )
}

export const CallPhone = () => {
  return(
    <div className='bg-pink-200 p-2 hidden max-sm:block text-center font-medium'>
      <h1 >Call to order 09123882828</h1>
    </div>
  )
}
