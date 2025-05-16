import React from 'react'

export const Call = () => {
  return (
    <div className='max-sm:px-0 px-22 mt-5'>
      <main className='bg-white p-3 text-center font-bold text-black'>
        <h1 className='text-2xl max-sm:text-xl'>Favorite Plug & Gadget</h1>
      </main>
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
