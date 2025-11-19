import React, { useState, useEffect } from 'react'; 
import InventoryNav from './InventoryNav';
import Dashboard from './Dashboard';
import Products from './Products';
import StockInOut from './StockInOut';
import Suppliers from './Suppliers';
import PurchaseOrders from './PurchaseOrders';
import Reports from './Reports';
import Settings from './Settings';
import './Inventory.css';

const Inventory = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Backend API URLs
  const API_URL = "http://localhost:8080/inventory";
  const SUPPLIERS_API_URL = "http://localhost:8080/suppliers";

  // State for data
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  // API Functions
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(`Failed to load inventory: ${err.message}`);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(SUPPLIERS_API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSuppliers(data);
    } catch (err) {
      console.error('Failed to load suppliers:', err.message);
      setSuppliers([]);
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return await response.json();
    } catch (err) {
      throw new Error('Failed to create product: ' + err.message);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (err) {
      throw new Error('Failed to update product: ' + err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete product');
    } catch (err) {
      throw new Error('Failed to delete product: ' + err.message);
    }
  };

  const createSupplier = async (supplierData) => {
    try {
      const response = await fetch(SUPPLIERS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData),
      });
      if (!response.ok) throw new Error('Failed to create supplier');
      return await response.json();
    } catch (err) {
      throw new Error('Failed to create supplier: ' + err.message);
    }
  };

  // KPIs
  const stats = {
    totalSKUs: products.length,
    totalProducts: products.length,
    lowStockItems: products.filter(p => p.quantity <= (p.reorderLevel || 10)).length,
    totalStockValue: products.reduce(
      (sum, p) => sum + p.quantity * (p.price || 0),
      0
    ),
  };

  // Quick Actions
  const handleQuickAction = (action) => {
    switch(action) {
      case 'add-product':
      case 'search-product':
        setActiveSection('products');
        break;
      case 'stock-in':
      case 'stock-out':
        setActiveSection('stock');
        break;
      case 'create-po':
        setActiveSection('purchase-orders');
        break;
      default:
        console.log('Action:', action);
    }
  };

  const renderSection = () => {
    if (loading && activeSection === 'dashboard') {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Inventory Data...</p>
        </div>
      );
    }

    const sectionProps = {
      products,
      suppliers,
      stats,
      loading,
      error,
      onRefresh: fetchProducts,
      onCreateProduct: createProduct,
      onUpdateProduct: updateProduct,
      onDeleteProduct: deleteProduct,
      onCreateSupplier: createSupplier,
      onQuickAction: handleQuickAction,
    };

    switch (activeSection) {
      case 'dashboard': return <Dashboard {...sectionProps} />;
      case 'products': return <Products {...sectionProps} />;
      case 'stock': return <StockInOut {...sectionProps} />;
      case 'purchase-orders': return <PurchaseOrders {...sectionProps} />;
      case 'suppliers': return <Suppliers {...sectionProps} />;
      case 'reports': return <Reports {...sectionProps} />;
      case 'settings': return <Settings {...sectionProps} darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <Dashboard {...sectionProps} />;
    }
  };

  return (
    <div className={`inventory-app ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="inventory-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon"></span>
            <h1>Inventory</h1>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Total SKUs</span>
            <span className="stat-value">{stats.totalSKUs}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Low Stock</span>
            <span className="stat-value warning">{stats.lowStockItems}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Products</span>
            <span className="stat-value">{stats.totalProducts}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Stock Value</span>
            <span className="stat-value">Rs {stats.totalStockValue.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {error && (
        <div className="global-error">
          <strong>Error:</strong> {error}
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      <div className="inventory-main">
        <InventoryNav 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          onQuickAction={handleQuickAction}
          stats={stats}
        />
        
        <main className="inventory-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Inventory;
