import React from "react";
import "./Sidebar.css";
import logo from "../assets/logo.png";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => (
  <aside className={`sidebar${open ? " open" : ""}`}>
    <button className="sidebar-close" onClick={onClose} aria-label="Close Sidebar">
      &times;
    </button>
    <div className="sidebar-logo">
      <img src={logo} alt="StyleCart Logo" />
      <span className="sidebar-brand">StyleCart</span>
    </div>
    <nav className="sidebar-nav">
      <a href="/" className="sidebar-link">Catalogue</a>
      <a href="/" className="sidebar-link">Fashion</a>
      <a href="/" className="sidebar-link">Favourite</a>
      <a href="/" className="sidebar-link">Lifestyle</a>
    </nav>
  </aside>
);

export default Sidebar;
