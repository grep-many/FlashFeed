import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { countryFlags } from './countryFlags';

const NavBar = () => {
  // Initialize state correctly inside the component
  const [selectedCountry, setSelectedCountry] = useState(localStorage.getItem("country") || "🇺🇸"); // Default to '🇺🇸' if no country is stored

  const handleFlagChange = (flag) => {
    localStorage.setItem("country", flag); // Store selected flag in localStorage
    setSelectedCountry(flag); // Update state to trigger re-render
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top border-bottom border-1">
      <div className="container-fluid">
        <div className="dropdown mx-3">
          <button className="btn btn-black text-white dropdown-toggle border" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {selectedCountry}
          </button>
          <ul className="dropdown-menu border bg-black scrollable-dropdown" aria-labelledby="dropdownMenuButton1">
            {Object.entries(countryFlags).map(([flag, code]) => (
              <li key={code}>
                <a className="dropdown-item" onClick={() => handleFlagChange(flag)}>{flag}</a>
              </li>
            ))}
          </ul>
        </div>
        <Link className="navbar-brand" to="/">FlashFeed</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/health">Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/science">Science</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/technology">Technology</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
