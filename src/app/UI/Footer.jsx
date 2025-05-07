import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className='bg-gray-800 text-white py-4 text-center'>
            <p>&copy; 2023 Favourite Plug. All rights reserved.</p>
            <p>Follow us on:</p>
            <div className='flex justify-center space-x-4'>
            <a href='#' className='text-blue-400'>Facebook</a>
            <a href='#' className='text-blue-400'>Twitter</a>
            <a href='#' className='text-blue-400'>Instagram</a>
            </div>
        </footer>
    </div>
  )
}

export default Footer
