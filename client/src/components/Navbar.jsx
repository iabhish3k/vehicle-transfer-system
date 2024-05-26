import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/drivers">Drivers</Link></li>
        <li><Link to="/vehicles">Vehicles</Link></li>
        <li><Link to="/transfer">Transfer</Link></li>
        <li><Link to="/history">History</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar