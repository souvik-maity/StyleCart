import React from 'react';
import './Sidebar.css';
import logo from '../assets/logo.png'; // Import your logo

const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
        &times;
      </button>
      <div className="sidebar-logo">
        {/* Critical image (logo) - eager loaded */}
        <img
          src={logo}
          alt="App Logo"
          loading="eager" // Important for above-the-fold logo
          className="sidebar-logo-img"
        />
        <span className="sidebar-brand">StyleCart</span>
      </div>
      {/* ... rest of sidebar ... */}
    </div>
  );
};

export default Sidebar;