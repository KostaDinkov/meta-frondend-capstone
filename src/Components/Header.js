import React from 'react'
import logo from '../Images/logo-small.jpg';
import Nav from './Nav'
import  './Haeder.css'

export default function Header() {
  return (
    <header >
      <div className="section-content">
          <img className = "header-logo" src={logo} alt="Little Lemon logo" />
          <Nav/>
      </div>
    </header>
  )
}
