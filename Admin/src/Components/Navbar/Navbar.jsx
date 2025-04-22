import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/nav-logo.png';
import navprofile from '../../assets/nav-profile.jpg';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="Logo" className="nav-logo" />
      <div className="nav-profile-container">
        <img src={navprofile} alt="Profile" className="nav-profile" />
        <span>Admin</span>
      </div>
    </div>
  );
};

export default Navbar;