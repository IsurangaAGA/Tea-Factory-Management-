import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ cartItemCount }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div>
          <Link to="/" className="navbar-brand">
            Tea Factory Management
          </Link>
        </div>
        
        <nav>
          <Link to="/shop">Shop</Link>
          <Link to="/orders">Orders</Link>
          {cartItemCount > 0 && (
            <span className="cart-badge">
              {cartItemCount} items
            </span>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Navigation;