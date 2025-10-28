import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
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
              <h4>Company</h4>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
              <a href="/careers">Careers</a>
              <a href="/news">News</a>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <a href="/help">Help Center</a>
              <a href="/contact">Contact Us</a>
              <a href="/docs">Documentation</a>
              <a href="/status">System Status</a>
            </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
              <a href="/security">Security</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Tea Factory Management System. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="Instagram">📷</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;