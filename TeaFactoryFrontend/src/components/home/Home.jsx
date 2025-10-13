import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Header with Logo */}
      <header className="home-header">
        <div className="container">
          <div className="logo-container">
            <img 
              src="/images/logo.png" 
              alt="Tea Factory Logo" 
              className="home-logo"
            />
            <div className="logo-text">
              <h1>Tea Factory</h1>
              <p>Management System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              From Leaves to Legacy.
              <span className="hero-subtitle">Quality in Every Cup.</span>
            </h1>
            <p className="hero-description">
              Streamline tea production with our Tea Factory Management System. From leaf collection to packaging, 
              our platform helps you manage inventory, employees, and daily operations efficiently. Improve productivity, 
              reduce waste, and ensure quality at every stage — for a smarter, sustainable tea industry.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-container">
              <img 
                src="/images/hero-tree.jpg" 
                alt="Tea plantation"
                className="hero-image"
              />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">System Features</h2>
            <p className="section-subtitle">Comprehensive tools for tea factory management</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Inventory Management</h3>
              <p>Track raw materials, finished goods, and manage stock levels efficiently.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Supplier Management</h3>
              <p>Manage supplier relationships and purchase orders seamlessly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍃</div>
              <h3>Item Master</h3>
              <p>Organize tea and cinnamon items with detailed categorization.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Purchase Orders</h3>
              <p>Create and track purchase orders with automated calculations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Tea Production Process</h2>
            <p className="section-subtitle">From leaf to cup - quality at every stage</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/gallery-1.jpg" alt="Tea leaf collection" />
              <div className="gallery-caption">Leaf Collection</div>
            </div>
            <div className="gallery-item">
              <img src="/images/gallery-2.jpg" alt="Tea processing" />
              <div className="gallery-caption">Processing</div>
            </div>
            <div className="gallery-item">
              <img src="/images/gallery-3.jpg" alt="Quality control" />
              <div className="gallery-caption">Quality Control</div>
            </div>
            <div className="gallery-item">
              <img src="/images/gallery-4.jpg" alt="Packaging" />
              <div className="gallery-caption">Packaging</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Streamline Your Tea Factory?</h2>
              <p>Join successful tea producers who trust our management system for their daily operations.</p>
              <div className="cta-buttons">
                <button className="btn btn-primary btn-large">Start Managing Now</button>
                <button className="btn btn-secondary btn-large">Request Demo</button>
              </div>
            </div>
            <div className="cta-image">
              <img src="/images/cta-bg.png" alt="Tea factory management" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img 
                src="/images/logo.png" 
                alt="Tea Factory Logo" 
                className="footer-logo-img"
              />
              <div className="footer-text">
                <h3>Tea Factory Management System</h3>
                <p>Quality in Every Cup</p>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Modules</h4>
                <a href="/inventory">Inventory</a>
                <a href="/suppliers">Suppliers</a>
                <a href="/items">Items Master</a>
                <a href="/purchase-orders">Purchase Orders</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="/help">Help Center</a>
                <a href="/contact">Contact Us</a>
                <a href="/docs">Documentation</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Tea Factory Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;