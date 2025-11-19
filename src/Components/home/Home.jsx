import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/shop');
  };

  const handleAboutClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleSignUpClick = () => {
    navigate('/auth');
  };

  return (
    <div className="home">
      {/* Header with Logo and Navigation */}
      <header className="home-header">
        <div className="container">
          <div className="header-content">
            <div className="logo-container">
              <div className="logo-icon-large">🍃</div>
              <div className="logo-text">
                <h1>TreeWhiff Tea Factory</h1>
                <p>Management System</p>
              </div>
            </div>
            <nav className="home-nav">
              <button className="nav-btn" onClick={handleAboutClick}>About</button>
              <button className="nav-btn" onClick={handleContactClick}>Contact</button>
              <button className="nav-btn nav-btn-outline" onClick={handleLoginClick}>Login</button>
              <button className="nav-btn nav-btn-primary" onClick={handleSignUpClick}>Sign Up</button>
            </nav>
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
              <button className="btn btn-shop" onClick={handleShopClick}>
                🛍️ Visit Our Shop
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-gradient-card">
              <div className="gradient-pattern"></div>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Products</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Suppliers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>
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
            <div className="feature-card shop-card" onClick={handleShopClick}>
              <div className="feature-icon">🛍️</div>
              <h3>Online Shop</h3>
              <p>Browse and purchase our premium tea products directly from our online store.</p>
              <button className="shop-link-btn">Visit Shop →</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About TreeWhiff Tea Factory</h2>
            <p className="section-subtitle">Excellence in tea production and management</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Our Story</h3>
              <p>
                TreeWhiff Tea Factory is a leading name in the tea industry, dedicated to producing 
                premium quality teas while maintaining sustainable practices. Our comprehensive 
                management system ensures efficiency, quality, and transparency at every stage 
                of production.
              </p>
              <h3>Our Mission</h3>
              <p>
                To revolutionize tea factory operations through innovative technology, ensuring 
                quality products reach customers while maintaining the highest standards of 
                environmental responsibility and operational excellence.
              </p>
            </div>
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-number">15+</div>
                <div className="about-stat-label">Years of Experience</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">500+</div>
                <div className="about-stat-label">Happy Customers</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">1000+</div>
                <div className="about-stat-label">Products Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Tea Production Process</h2>
            <p className="section-subtitle">From leaf to cup - quality at every stage</p>
          </div>
          <div className="process-grid">
            <div className="process-item">
              <div className="process-icon">🍃</div>
              <h3>Leaf Collection</h3>
              <p>Carefully handpicked tea leaves from premium gardens</p>
            </div>
            <div className="process-item">
              <div className="process-icon">⚙️</div>
              <h3>Processing</h3>
              <p>State-of-the-art processing techniques for optimal flavor</p>
            </div>
            <div className="process-item">
              <div className="process-icon">✅</div>
              <h3>Quality Control</h3>
              <p>Rigorous testing ensures consistent quality standards</p>
            </div>
            <div className="process-item">
              <div className="process-icon">📦</div>
              <h3>Packaging</h3>
              <p>Eco-friendly packaging preserving freshness and aroma</p>
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
            <div className="cta-visual">
              <div className="cta-card">
                <div className="cta-icon">🚀</div>
                <h3>Get Started Today</h3>
                <p>Transform your tea factory operations with our comprehensive management platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">We'd love to hear from you</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Address</h3>
                  <p>123 Tea Garden Road<br />Colombo, Sri Lanka</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+94 11 234 5678</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>info@treewhiff.com</p>
                </div>
              </div>
            </div>
            <div className="contact-form-container">
              <form className="contact-form">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-large">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="footer-logo-icon">🍃</div>
              <div className="footer-text">
                <h3>TreeWhiff Tea Factory</h3>
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