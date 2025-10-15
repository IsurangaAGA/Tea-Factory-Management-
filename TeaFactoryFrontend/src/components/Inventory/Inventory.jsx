import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);

  const API_URL = "http://localhost:8080/inventory";
  const SUPPLIERS_API_URL = "http://localhost:8080/suppliers";

  // Add Product Form State
  const [productFormData, setProductFormData] = useState({
    sku: '',
    name: '',
    type: 'raw',
    quantity: 0,
    reorderLevel: 10,
    price: 0.00
  });
  const [productFormLoading, setProductFormLoading] = useState(false);
  const [productFormError, setProductFormError] = useState('');

  // Add Supplier Form State
  const [supplierFormData, setSupplierFormData] = useState({
    name: '',
    contact: ''
  });
  const [supplierFormLoading, setSupplierFormLoading] = useState(false);
  const [supplierFormError, setSupplierFormError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      const errorMsg = `Failed to load inventory: ${err.message}`;
      setError(errorMsg);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      return await response.json();
    } catch (err) {
      throw new Error('Failed to create product: ' + err.message);
    }
  };

  const createSupplier = async (supplierData) => {
    try {
      const response = await fetch(SUPPLIERS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });
      if (!response.ok) {
        throw new Error('Failed to create supplier');
      }
      return await response.json();
    } catch (err) {
      throw new Error('Failed to create supplier: ' + err.message);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      return await response.json();
    } catch (err) {
      throw new Error('Failed to update product: ' + err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
    } catch (err) {
      throw new Error('Failed to delete product: ' + err.message);
    }
  };

  // Calculate KPIs
  const totalSKUs = products.length;
  const totalValue = products.reduce((sum, product) => 
    sum + (product.quantity * (product.price || 0)), 0
  ).toFixed(2);
  const lowStockCount = products.filter(product => 
    product.quantity <= product.reorderLevel
  ).length;

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || product.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(product => product.id !== productId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleAdjust = async (productId) => {
    const product = products.find(p => p.id === productId);
    const newQuantity = prompt('Enter new quantity:', product.quantity);
    if (newQuantity && !isNaN(newQuantity)) {
      try {
        const updatedProduct = await updateProduct(productId, {
          ...product,
          quantity: parseInt(newQuantity)
        });
        setProducts(products.map(product => 
          product.id === productId ? updatedProduct : product
        ));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = async (productId) => {
    const product = products.find(p => p.id === productId);
    const newName = prompt('Enter new product name:', product.name);
    const newPrice = prompt('Enter new price:', product.price);
    const newReorderLevel = prompt('Enter new reorder level:', product.reorderLevel);
    
    if (newName && newPrice && newReorderLevel) {
      try {
        const updatedProduct = await updateProduct(productId, {
          ...product,
          name: newName,
          price: parseFloat(newPrice),
          reorderLevel: parseInt(newReorderLevel)
        });
        setProducts(products.map(product => 
          product.id === productId ? updatedProduct : product
        ));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Add Product Form Handlers
  const handleAddProductClick = () => {
    setShowAddProduct(true);
    setProductFormData({
      sku: '',
      name: '',
      type: 'raw',
      quantity: 0,
      reorderLevel: 10,
      price: 0.00
    });
    setProductFormError('');
  };

  const handleProductFormInputChange = (e) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'reorderLevel' ? parseInt(value) || 0 :
              name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleProductFormSubmit = async (e) => {
    e.preventDefault();
    setProductFormLoading(true);
    setProductFormError('');

    // Validation
    if (!productFormData.sku.trim()) {
      setProductFormError('SKU is required');
      setProductFormLoading(false);
      return;
    }
    if (!productFormData.name.trim()) {
      setProductFormError('Product name is required');
      setProductFormLoading(false);
      return;
    }
    if (productFormData.quantity < 0) {
      setProductFormError('Quantity cannot be negative');
      setProductFormLoading(false);
      return;
    }
    if (productFormData.price < 0) {
      setProductFormError('Price cannot be negative');
      setProductFormLoading(false);
      return;
    }

    try {
      const createdProduct = await createProduct(productFormData);
      setProducts([...products, createdProduct]);
      setShowAddProduct(false);
      alert('Product created successfully!');
    } catch (err) {
      setProductFormError(err.message);
    } finally {
      setProductFormLoading(false);
    }
  };

  const handleProductFormCancel = () => {
    setShowAddProduct(false);
    setProductFormError('');
  };

  // Add Supplier Form Handlers
  const handleAddSupplierClick = () => {
    setShowAddSupplier(true);
    setSupplierFormData({
      name: '',
      contact: ''
    });
    setSupplierFormError('');
  };

  const handleSupplierFormInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSupplierFormSubmit = async (e) => {
    e.preventDefault();
    setSupplierFormLoading(true);
    setSupplierFormError('');

    // Validation
    if (!supplierFormData.name.trim()) {
      setSupplierFormError('Supplier name is required');
      setSupplierFormLoading(false);
      return;
    }

    try {
      await createSupplier(supplierFormData);
      setShowAddSupplier(false);
      alert('Supplier created successfully!');
    } catch (err) {
      setSupplierFormError(err.message);
    } finally {
      setSupplierFormLoading(false);
    }
  };

  const handleSupplierFormCancel = () => {
    setShowAddSupplier(false);
    setSupplierFormError('');
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
      <div className="inventory">
        <div className="loading">Loading Inventory...</div>
      </div>
    );
  }

  return (
    <div className="inventory">
      <header className="inventory-header">
        <h1>Products</h1>
        <p>Raw materials & Finished goods</p>
      </header>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-export">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="type-filter"
          >
            <option value="">All types</option>
            <option value="raw">Raw material</option>
            <option value="finished">Finished goods</option>
          </select>
          
          <button onClick={exportToCSV} className="export-btn">
            Export CSV
          </button>
          
          <button onClick={fetchProducts} className="refresh-btn">
            Refresh
          </button>

          <button onClick={handleAddSupplierClick} className="add-supplier-btn">
            Add Supplier
          </button>

          <button onClick={handleAddProductClick} className="add-product-btn">
            Add Product
          </button>
        </div>
      </div>

      <div className="kpi-cards">
        <div className="kpi-card">
          <div className="kpi-label">Total SKUs</div>
          <div className="kpi-value">{totalSKUs}</div>
          <div className="kpi-description">Raw materials & finished goods</div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-label">Total Stock Value</div>
          <div className="kpi-value">${totalValue}</div>
          <div className="kpi-description">Estimated value (price × qty)</div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-label">Low Stock Count</div>
          <div className="kpi-value danger">{lowStockCount}</div>
          <div className="kpi-description">Products at/under reorder level</div>
        </div>
      </div>

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Reorder</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.type === 'raw' ? 'Raw material' : 'Finished goods'}</td>
                <td className={product.quantity <= product.reorderLevel ? 'low-stock' : ''}>
                  {product.quantity}
                </td>
                <td>{product.reorderLevel}</td>
                <td>${product.price?.toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => handleEdit(product.id)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleAdjust(product.id)}
                      className="btn-adjust"
                    >
                      Adjust
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="no-products">
            {products.length === 0 ? 'No products available.' : 'No products found matching your criteria.'}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create Product</h3>
              <button onClick={handleProductFormCancel} className="close-modal">×</button>
            </div>
            
            <form onSubmit={handleProductFormSubmit} className="product-form">
              {productFormError && (
                <div className="error-message">
                  <strong>Error:</strong> {productFormError}
                  <button onClick={() => setProductFormError('')} className="close-error">×</button>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="sku">SKU *</label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={productFormData.sku}
                    onChange={handleProductFormInputChange}
                    required
                    placeholder="e.g., RM-001 or FG-001"
                  />
                  <small>Unique stock keeping unit identifier</small>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={productFormData.name}
                    onChange={handleProductFormInputChange}
                    required
                    placeholder="e.g., Green Tea Leaves"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Product Type *</label>
                  <select
                    id="type"
                    name="type"
                    value={productFormData.type}
                    onChange={handleProductFormInputChange}
                    required
                  >
                    <option value="raw">Raw Material</option>
                    <option value="finished">Finished Goods</option>
                  </select>
                  <small>
                    {productFormData.type === 'raw' 
                      ? 'Raw materials are used in production' 
                      : 'Finished goods are ready for sale'}
                  </small>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Initial Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={productFormData.quantity}
                    onChange={handleProductFormInputChange}
                    min="0"
                    required
                  />
                  <small>Starting stock quantity</small>
                </div>

                <div className="form-group">
                  <label htmlFor="reorderLevel">Reorder Level</label>
                  <input
                    type="number"
                    id="reorderLevel"
                    name="reorderLevel"
                    value={productFormData.reorderLevel}
                    onChange={handleProductFormInputChange}
                    min="0"
                    required
                  />
                  <small>Alert when stock reaches this level</small>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Unit Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productFormData.price}
                    onChange={handleProductFormInputChange}
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
                  className="btn-primary"
                  disabled={productFormLoading}
                >
                  {productFormLoading ? 'Creating...' : 'Create Product'}
                </button>
                <button 
                  type="button" 
                  onClick={handleProductFormCancel}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Supplier Modal */}
      {showAddSupplier && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Supplier</h3>
              <button onClick={handleSupplierFormCancel} className="close-modal">×</button>
            </div>
            
            <form onSubmit={handleSupplierFormSubmit} className="product-form">
              {supplierFormError && (
                <div className="error-message">
                  <strong>Error:</strong> {supplierFormError}
                  <button onClick={() => setSupplierFormError('')} className="close-error">×</button>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="supplier-name">Supplier Name *</label>
                  <input
                    type="text"
                    id="supplier-name"
                    name="name"
                    value={supplierFormData.name}
                    onChange={handleSupplierFormInputChange}
                    required
                    placeholder="e.g., Local Tea Supplier"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="supplier-contact">Contact Information</label>
                  <input
                    type="text"
                    id="supplier-contact"
                    name="contact"
                    value={supplierFormData.contact}
                    onChange={handleSupplierFormInputChange}
                    placeholder="e.g., phone number or email"
                  />
                  <small>Phone number, email, or other contact details</small>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={supplierFormLoading}
                >
                  {supplierFormLoading ? 'Creating...' : 'Add Supplier'}
                </button>
                <button 
                  type="button" 
                  onClick={handleSupplierFormCancel}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;