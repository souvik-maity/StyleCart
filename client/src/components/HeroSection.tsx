import React from 'react';
import './HeroSection.css';
import heroBg from '../assets/hero-bg.jpg'; // Main background
import secondaryImage from '../assets/secondary-image.jpg'; // Optional image

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Background image - consider CSS background-image instead */}
      <div 
        className="hero-bg" 
        style={{ backgroundImage: `url(${heroBg})` }}
        role="img"
        aria-label="Fashion showcase background"
      ></div>
      
      {/* Content */}
      <span className="hero-badge">New Collection 2024</span>
      <h1>Discover <span className="highlight">Unique</span> Styles</h1>
      <p>Shop the latest trends in fashion and lifestyle</p>
      
      <div className="hero-buttons">
        <button className="shop-btn">Shop Now</button>
        <button className="lookbook-btn">View Lookbook</button>
      </div>

      {/* Optional lazy-loaded image */}
      <img
        src={secondaryImage}
        alt="Featured product"
        loading="lazy"
        className="hero-featured-image"
      />
    </section>
  );
};

export default HeroSection;