import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Header with Logo */} 

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

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-header">
                <h2 className="section-title">About Our System</h2>
                <p className="section-subtitle">Revolutionizing tea factory management since 2024</p>
              </div>
              <div className="about-details">
                <p>
                  Our Tea Factory Management System is designed to streamline every aspect of tea production, 
                  from leaf collection to final packaging. We understand the unique challenges faced by tea 
                  producers and have created a comprehensive solution that addresses them all.
                </p>
                <div className="about-stats">
                  <div className="stat">
                    <h3>50+</h3>
                    <p>Factories Using Our System</p>
                  </div>
                  <div className="stat">
                    <h3>99.9%</h3>
                    <p>System Uptime</p>
                  </div>
                  <div className="stat">
                    <h3>24/7</h3>
                    <p>Customer Support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="/images/about-tea.jpg" alt="Tea production process" />
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

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">We'd love to hear from you about your tea factory needs</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h4>Visit Us</h4>
                  <p>123 Tea Garden Road<br />Kandy, Sri Lanka</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h4>Call Us</h4>
                  <p>+94 77 123 4567<br />+94 81 234 5678</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h4>Email Us</h4>
                  <p>info@teafactory.com<br />support@teafactory.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div className="contact-details">
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 8:00 - 18:00<br />Saturday: 8:00 - 14:00</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form className="form">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subject" required />
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
    </div>
  );
};

export default Home;