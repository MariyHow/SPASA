import React from 'react'
import logo from '../moon.png';
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="footer__container">
      <Link to="/" className="footer__logo">
          <img src={logo} alt="SPASA LOGO"/>
          <span>SPASA</span>
      </Link>
      <div className="footer__links">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/">Contact</Link>
      </div>
      <p className="footer__copyright">Copyright &copy; 2026 SPASA App. Created by Samariy Howard.</p>
    </div>
  )
}

export default Footer
