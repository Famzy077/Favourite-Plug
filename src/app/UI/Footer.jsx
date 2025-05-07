import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className='bg-gray-800 text-white py-4 text-center'>
            {FooterText}
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
const Year = new Date().getFullYear()
const FooterText = `© ${Year} Favourite Plug. All rights reserved.`

export default Footer
