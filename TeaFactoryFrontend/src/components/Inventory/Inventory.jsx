import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All types');
  const [loading, setLoading] = useState(true); // Start with true to show loading
  const [error, setError] = useState('');

  const API_URL = "http://localhost:8080/inventory";

  // Load products from backend API
  useEffect(() => {
    console.log('Component mounted, fetching products...');
    fetchProducts();
  }, []);

  // Fetch all products from backend
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Making API call to:', API_URL);
      const response = await fetch(API_URL);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Data received:', data);
      setProducts(data);
    } catch (err) {
      const errorMsg = `Failed to load inventory: ${err.message}`;
      setError(errorMsg);
      console.error('Error fetching products:', err);
      
      // Fallback to empty array if API fails
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new product
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

  // Update product
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

  // Delete product
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

  // Filter products based on search and type
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All types' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(product => product.id !== productId));
      } catch (err) {
        setError(err.message);
        console.error('Error deleting product:', err);
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
        console.error('Error adjusting quantity:', err);
      }
    }
  };

  const handleEdit = async (productId) => {
    const product = products.find(p => p.id === productId);
    const newName = prompt('Enter new product name:', product.name);
    const newPrice = prompt('Enter new price:', product.price);
    
    if (newName && newPrice) {
      try {
        const updatedProduct = await updateProduct(productId, {
          ...product,
          name: newName,
          price: parseFloat(newPrice)
        });
        setProducts(products.map(product => 
          product.id === productId ? updatedProduct : product
        ));
      } catch (err) {
        setError(err.message);
        console.error('Error updating product:', err);
      }
    }
  };

  const handleAddProduct = async () => {
    const sku = prompt('Enter SKU:');
    const name = prompt('Enter product name:');
    const type = prompt('Enter type (Raw material/Finished goods):');
    const quantity = prompt('Enter quantity:');
    const reorder = prompt('Enter reorder level:');
    const price = prompt('Enter price:');
    
    if (sku && name && type && quantity && reorder && price) {
      try {
        const newProduct = {
          sku,
          name,
          type,
          quantity: parseInt(quantity),
          reorderLevel: parseInt(reorder),
          price: parseFloat(price)
        };
        
        const createdProduct = await createProduct(newProduct);
        setProducts([...products, createdProduct]);
      } catch (err) {
        setError(err.message);
        console.error('Error adding product:', err);
      }
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['SKU', 'Name', 'Type', 'Quantity', 'Reorder', 'Price'],
      ...filteredProducts.map(product => [
        product.sku,
        product.name,
        product.type,
        product.quantity,
        product.reorderLevel || product.reorder,
        `$${product.price?.toFixed(2)}`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
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
        <h1>Inventory</h1>
        <p>Manage raw materials via finished goods</p>
        
        <nav className="sidebar">
          <ul>
            <li><span className="inactive">Dashboard</span></li>
            <li><span className="active">Products</span></li>
            <li><span className="inactive">Add Product</span></li>
            <li><span className="inactive">Stock In / Out</span></li>
            <li><span className="active">Suppliers / PO</span></li>
            <li><span className="inactive">Reports & Export</span></li>
            <li><span className="active">Settings</span></li>
          </ul>
        </nav>
      </header>

      <main className="inventory-main">
        <section className="products-section">
          <h2>Products</h2>
          <p>Products (Raw materials & Finished goods)</p>

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
              <br />
              <small>Check if backend is running on http://localhost:8080</small>
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
                <option value="All types">All types</option>
                <option value="Raw material">Raw material</option>
                <option value="Finished goods">Finished goods</option>
              </select>
              
              <button onClick={exportToCSV} className="export-btn">
                Export CSV
              </button>
              
              <button onClick={fetchProducts} className="refresh-btn">
                Refresh
              </button>
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
                    <td>
                      <span className={`type-badge ${product.type?.toLowerCase().replace(' ', '-')}`}>
                        {product.type}
                      </span>
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.reorderLevel || product.reorder}</td>
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
                {products.length === 0 ? 'No products available. Make sure your backend is running.' : 'No products found matching your criteria.'}
              </div>
            )}
          </div>

          <div className="add-product-section">
            <button onClick={handleAddProduct} className="add-product-btn">
              Add Product
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
//comment

export default Inventory;