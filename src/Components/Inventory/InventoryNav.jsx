import React from 'react';
import './InventoryNav.css';

const InventoryNav = ({ activeSection, setActiveSection, onQuickAction, stats }) => {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '📦', label: 'Products' },
    { id: 'stock', icon: '🔄', label: 'Stock In/Out' },
    { id: 'suppliers', icon: '🧾', label: 'Suppliers / PO' },
    { id: 'reports', icon: '📈', label: 'Reports & Export' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  const quickActions = [
    { action: 'add-product', icon: '➕', label: 'Add Product' },
    { action: 'stock-in', icon: '📥', label: 'Record Stock In' },
    { action: 'stock-out', icon: '📤', label: 'Record Stock Out' },
    { action: 'create-po', icon: '🧾', label: 'Create Purchase Order' },
    { action: 'search-product', icon: '🔍', label: 'Search Product' }
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
      
      {/* Quick Actions */}
      <div className="quick-actions">
        <h4>Quick Actions</h4>
        <div className="action-buttons">
          {quickActions.map((action) => (
            <button 
              key={action.action}
              className="action-btn"
              onClick={() => onQuickAction(action.action)}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="nav-stats">
        <h4>Quick Stats</h4>
        <div className="stat-items">
          <div className="stat-item">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{stats.totalProducts}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Low Stock</span>
            <span className="stat-value warning">{stats.lowStockItems}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default InventoryNav;