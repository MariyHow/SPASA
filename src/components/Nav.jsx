import React from 'react'
import '../App.css'
import logo from '../moon.png';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='nav__container'>
        <Link to="/" className='logo__wrapper'>
            <img className='logo' src={logo} alt='Spasa Logo'></img>
            <h2>SPASA</h2>
        </Link>
        <ul className='nav__links'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/" /* onClick={toggleModal()} */ >Contact</Link></li>
        </ul>
    </div>
  )
}

export default Nav
