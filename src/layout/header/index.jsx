import React from 'react'
import './header.css';

function Header() {
  return <header>
    <img src="/medtronic-logo.png" alt="medtronic-logo" className='logo' />
    <img src="/medtronic-logo-with-text.png" alt="medtronic-logo-with-text" className='strapline' />
  </header>
}

export default Header