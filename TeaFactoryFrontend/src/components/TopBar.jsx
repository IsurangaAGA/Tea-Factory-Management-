import React from 'react';
import './TopBar.css';

const TopBar = ({ onEmployeesClick, onInventoryClick, onTasksClick }) => {
    return (
        <nav className="topbar">
            <div className="topbar-container">
                <div className="logo">
                    <img 
                        src="/images/logo.png" 
                        alt="TreeWhiff Logo" 
                        className="logo-icon"
                    />
                    <span className="logo-text">TreeWhiff</span>
                </div>

                <div className="nav-links">
                    <a href="/" className="nav-link">Home</a>
                    <a href="#about" className="nav-link">About</a>
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#gallery" className="nav-link">Gallery</a>
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