import React from 'react';
import './InventoryNav.css';

const InventoryNav = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '📦', label: 'Products' },
    { id: 'stock', icon: '🔄', label: 'Stock In/Out' },
    { id: 'purchase-orders', icon: '📋', label: 'Purchase Orders' },
    { id: 'suppliers', icon: '🧾', label: 'Suppliers' },
    { id: 'reports', icon: '📈', label: 'Reports & Export' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <nav className="inventory-nav">
      <div className="nav-header">
        <h3>Navigation</h3>
      </div>
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default InventoryNav;