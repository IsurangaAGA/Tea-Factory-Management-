import React, { useState, useEffect } from 'react';
import { inventoryAPI } from '../../api/inventoryAPI';
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All types');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await inventoryAPI.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search and type
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All types' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await inventoryAPI.deleteProduct(productId);
        setProducts(products.filter(product => product.id !== productId));
        setError('');
      } catch (err) {
        setError('Failed to delete product. Please try again.');
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleAdjust = async (productId) => {
    const newQuantity = prompt('Enter new quantity:');
    if (newQuantity && !isNaN(newQuantity)) {
      try {
        const updatedProduct = await inventoryAPI.adjustQuantity(productId, {
          quantity: parseInt(newQuantity)
        });
        
        setProducts(products.map(product => 
          product.id === productId ? updatedProduct : product
        ));
        setError('');
      } catch (err) {
        setError('Failed to adjust quantity. Please try again.');
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
        const updatedProduct = await inventoryAPI.updateProduct(productId, {
          name: newName,
          price: parseFloat(newPrice)
        });
        
        setProducts(products.map(product => 
          product.id === productId ? updatedProduct : product
        ));
        setError('');
      } catch (err) {
        setError('Failed to update product. Please try again.');
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
        const newProduct = await inventoryAPI.createProduct({
          sku,
          name,
          type,
          quantity: parseInt(quantity),
          reorder: parseInt(reorder),
          price: parseFloat(price)
        });
        
        setProducts([...products, newProduct]);
        setError('');
      } catch (err) {
        setError('Failed to add product. Please try again.');
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
        product.reorder,
        `$${product.price.toFixed(2)}`
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
              {error}
              <button onClick={() => setError('')} className="error-close">×</button>
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
                      <span className={`type-badge ${product.type.toLowerCase().replace(' ', '-')}`}>
                        {product.type}
                      </span>
                    </td>
                    <td>{product.quantity}</td>
                    <td>{product.reorder}</td>
                    <td>${product.price.toFixed(2)}</td>
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

export default Inventory;