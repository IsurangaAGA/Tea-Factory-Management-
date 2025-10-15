import React from 'react';
import './TopBar.css';

const TopBar = ({ onEmployeesClick, onInventoryClick, onTasksClick }) => {
  return (
    <nav className="topbar">
      <div className="topbar-container">
        <div className="logo">
          <span className="logo-icon">🌳</span>
          <span className="logo-text">TreeWhiff</span>
        </div>
        
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#impact" className="nav-link">Impact</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <div className="topbar-actions">
          <button className="btn-employees" onClick={onEmployeesClick}>
            Employees
          </button>
          <button className="btn-inventory" onClick={onInventoryClick}>
            Inventory
          </button>
          <button className="btn-tasks" onClick={onTasksClick}>
            Tasks
          </button>
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;