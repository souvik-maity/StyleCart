import React from "react";
import "./HeroSection.css";

const HeroSection: React.FC = () => (
  <section className="hero-section">
    <div className="hero-badge">✨ New Collection Available</div>
    <h1>
      Discover Your <span className="highlight">Perfect Style</span>
    </h1>
    <p>
      Explore our curated collection of premium fashion pieces designed to make you stand out with confidence and elegance.
    </p>
    <div className="hero-buttons">
      <button className="shop-btn">Shop Collection →</button>
      <button className="lookbook-btn">View Lookbook</button>
    </div>
    <div className="hero-stats">
      <div>
        <span className="stat-number">10K+</span>
        <span className="stat-label">Happy Customers</span>
      </div>
      <div>
        <span className="stat-number">500+</span>
        <span className="stat-label">Premium Items</span>
      </div>
      <div>
        <span className="stat-number">50+</span>
        <span className="stat-label">Top Brands</span>
      </div>
      <div>
        <span className="stat-number">24/7</span>
        <span className="stat-label">Support</span>
      </div>
    </div>
  </section>
);

export default HeroSection;