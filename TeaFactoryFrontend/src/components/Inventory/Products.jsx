import React, { useState } from 'react';

const Products = ({ 
  products, 
  loading, 
  error, 
  onCreateProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  onRefresh 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [productFormData, setProductFormData] = useState({
    sku: '',
    name: '',
    type: 'raw',
    quantity: 0,
    reorderLevel: 10,
    price: 0.00
  });

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedCategory || product.type === selectedCategory;
    return matchesSearch && matchesType;
  });

  const categories = [...new Set(products.map(p => p.type))];

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      sku: '',
      name: '',
      type: 'raw',
      quantity: 0,
      reorderLevel: 10,
      price: 0.00
    });
    setShowAddModal(true);
    setFormError('');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductFormData({
      sku: product.sku,
      name: product.name,
      type: product.type,
      quantity: product.quantity,
      reorderLevel: product.reorderLevel,
      price: product.price
    });
    setShowAddModal(true);
    setFormError('');
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'reorderLevel' ? parseInt(value) || 0 :
              name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    // Validation
    if (!productFormData.sku.trim()) {
      setFormError('SKU is required');
      setFormLoading(false);
      return;
    }
    if (!productFormData.name.trim()) {
      setFormError('Product name is required');
      setFormLoading(false);
      return;
    }

    try {
      if (editingProduct) {
        await onUpdateProduct(editingProduct.id, productFormData);
      } else {
        await onCreateProduct(productFormData);
      }
      setShowAddModal(false);
      onRefresh(); // Refresh the product list
    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await onDeleteProduct(productId);
        onRefresh(); // Refresh the product list
      } catch (err) {
        setFormError(err.message);
      }
    }
  };

  const handleAdjustQuantity = async (productId) => {
    const product = products.find(p => p.id === productId);
    const newQuantity = prompt('Enter new quantity:', product.quantity);
    if (newQuantity && !isNaN(newQuantity)) {
      try {
        await onUpdateProduct(productId, {
          ...product,
          quantity: parseInt(newQuantity)
        });
        onRefresh(); // Refresh the product list
      } catch (err) {
        setFormError(err.message);
      }
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['SKU', 'Name', 'Type', 'Quantity', 'Reorder Level', 'Price'],
      ...filteredProducts.map(product => [
        product.sku,
        product.name,
        product.type === 'raw' ? 'Raw material' : 'Finished goods',
        product.quantity,
        product.reorderLevel,
        `$${product.price?.toFixed(2)}`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Products...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Products Management</h1>
        <p>Manage your product inventory and stock levels</p>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
          <button onClick={() => setFormError('')} className="close-error">×</button>
        </div>
      )}

      {/* Filters and Actions */}
      <div className="card mb-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="form-group" style={{ margin: 0, minWidth: '300px' }}>
              <div className="form-input" style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                <span style={{ padding: '0 0.75rem', color: 'var(--gray-color)' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%' }}
                />
              </div>
            </div>
            
            <select 
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ minWidth: '200px' }}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'raw' ? 'Raw Material' : 'Finished Goods'}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <button onClick={exportToCSV} className="btn btn-outline">📤 Export CSV</button>
            <button onClick={onRefresh} className="btn btn-outline">🔄 Refresh</button>
            <button onClick={handleAddProduct} className="btn btn-primary">➕ Add Product</button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Reorder Level</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => {
                const isLowStock = product.quantity <= product.reorderLevel;
                const isOutOfStock = product.quantity === 0;
                
                let status = 'In Stock';
                let statusClass = 'in-stock';
                
                if (isOutOfStock) {
                  status = 'Out of Stock';
                  statusClass = 'out-of-stock';
                } else if (isLowStock) {
                  status = 'Low Stock';
                  statusClass = 'low-stock';
                }

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="product-avatar">
                          {product.type === 'raw' ? '📦' : '🏷️'}
                        </div>
                        {product.sku}
                      </div>
                    </td>
                    <td>{product.name}</td>
                    <td>
                      <span className={`type-badge ${product.type}`}>
                        {product.type === 'raw' ? 'Raw Material' : 'Finished Goods'}
                      </span>
                    </td>
                    <td>
                      <span className={isOutOfStock ? 'text-danger' : isLowStock ? 'text-warning' : 'text-success'}>
                        {product.quantity}
                      </span>
                    </td>
                    <td>{product.reorderLevel}</td>
                    <td>${product.price?.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${statusClass}`}>
                        {status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="btn-icon" 
                          title="Edit product"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleAdjustQuantity(product.id)}
                          className="btn-icon" 
                          title="Adjust quantity"
                        >
                          📊
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="btn-icon" 
                          title="Delete product"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="no-data">
              {products.length === 0 ? 'No products available.' : 'No products found matching your criteria.'}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Create Product'}</h3>
              <button onClick={() => setShowAddModal(false)} className="close-modal">×</button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="product-form">
              {formError && (
                <div className="error-message">
                  <strong>Error:</strong> {formError}
                  <button onClick={() => setFormError('')} className="close-error">×</button>
                </div>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={productFormData.sku}
                    onChange={handleFormInputChange}
                    className="form-input"
                    required
                    placeholder="e.g., RM-001 or FG-001"
                  />
                  <small>Unique stock keeping unit identifier</small>
                </div>

                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={productFormData.name}
                    onChange={handleFormInputChange}
                    className="form-input"
                    required
                    placeholder="e.g., Green Tea Leaves"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Product Type *</label>
                  <select
                    name="type"
                    value={productFormData.type}
                    onChange={handleFormInputChange}
                    className="form-select"
                    required
                  >
                    <option value="raw">Raw Material</option>
                    <option value="finished">Finished Goods</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={productFormData.quantity}
                    onChange={handleFormInputChange}
                    className="form-input"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Reorder Level</label>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={productFormData.reorderLevel}
                    onChange={handleFormInputChange}
                    className="form-input"
                    min="0"
                    required
                  />
                  <small>Alert when stock reaches this level</small>
                </div>

                <div className="form-group">
                  <label className="form-label">Unit Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={productFormData.price}
                    onChange={handleFormInputChange}
                    className="form-input"
                    min="0"
                    step="0.01"
                    required
                  />
                  <small>Price per unit</small>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={formLoading}
                >
                  {formLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .products-page {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--dark-color);
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: var(--gray-color);
          font-size: 1.125rem;
        }

        .product-avatar {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .type-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .type-badge.raw {
          background: rgba(59, 130, 246, 0.1);
          color: var(--primary-color);
        }

        .type-badge.finished {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success-color);
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge.in-stock {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success-color);
        }

        .status-badge.low-stock {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning-color);
        }

        .status-badge.out-of-stock {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger-color);
        }

        .btn-icon {
          padding: 0.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }

        .btn-icon:hover {
          background: var(--border-color);
          transform: scale(1.1);
        }

        .no-data {
          padding: 3rem;
          text-align: center;
          color: var(--gray-color);
          font-style: italic;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--light-color);
          border-radius: 12px;
          box-shadow: var(--shadow-lg);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .close-modal {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          color: var(--gray-color);
        }

        .close-modal:hover {
          color: var(--dark-color);
        }

        .product-form {
          padding: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-grid .form-group:first-child,
        .form-grid .form-group:nth-child(2) {
          grid-column: span 2;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .flex.justify-between {
            flex-direction: column;
            gap: 1rem;
          }
          
          .flex.gap-4 {
            flex-wrap: wrap;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-grid .form-group:first-child,
          .form-grid .form-group:nth-child(2) {
            grid-column: span 1;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;