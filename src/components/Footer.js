import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import footerBG from '../assets/footer-bg.jpg'

const Footer = () => {
  return (
    <footer 
      className='text-center text-neutral-400 py-2 h-72' 
      style={{ backgroundImage: `url(${footerBG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        <div className='flex items-center justify-center gap-4'>
          <Link to={"/"}>
            <img
                src={logo}
                alt='logo'
                width={180} 
            />
          </Link>
        </div>
<p className='text-sm'>© 2025 All Rights Reserved</p>
    </footer>
  )
}

export default Footer
