import React from 'react'
import logo from '../../Images/logo-small.jpg';
import Nav from '../Nav'
import  styles from './styles.module.scss';

export default function Header() {
  return (
    <header >
      <div className={styles.headerContent}>
          <img className = {styles.headerLogo} src={logo} alt="Little Lemon logo" />
          <Nav/>
      </div>
    </header>
  )
}
