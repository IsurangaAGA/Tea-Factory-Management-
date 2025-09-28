import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All types');
  const [loading, setLoading] = useState(false);

  // Mock data - no API calls
  const mockProducts = [
    {
      id: 1,
      sku: 'RM-001',
      name: 'Green Tea Leaves',
      type: 'Raw material',
      quantity: 250,
      reorder: 100,
      price: 1.20
    },
    {
      id: 2,
      sku: 'RM-002',
      name: 'Tea Bags',
      type: 'Raw material',
      quantity: 1200,
      reorder: 500,
      price: 0.05
    },
    {
      id: 3,
      sku: 'FG-001',
      name: 'Packaged Ceylon Tea 25kg',
      type: 'Finished goods',
      quantity: 80,
      reorder: 50,
      price: 4.50
    }
  ];

  // Load mock data on component mount
  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Filter products based on search and type
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All types' || product.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const handleAdjust = (productId) => {
    const newQuantity = prompt('Enter new quantity:');
    if (newQuantity && !isNaN(newQuantity)) {
      setProducts(products.map(product => 
        product.id === productId 
          ? { ...product, quantity: parseInt(newQuantity) }
          : product
      ));
    }
  };

  const handleEdit = (productId) => {
    const product = products.find(p => p.id === productId);
    const newName = prompt('Enter new product name:', product.name);
    const newPrice = prompt('Enter new price:', product.price);
    
    if (newName && newPrice) {
      setProducts(products.map(product => 
        product.id === productId 
          ? { ...product, name: newName, price: parseFloat(newPrice) }
          : product
      ));
    }
  };

  const handleAddProduct = () => {
    const sku = prompt('Enter SKU:');
    const name = prompt('Enter product name:');
    const type = prompt('Enter type (Raw material/Finished goods):');
    const quantity = prompt('Enter quantity:');
    const reorder = prompt('Enter reorder level:');
    const price = prompt('Enter price:');
    
    if (sku && name && type && quantity && reorder && price) {
      const newProduct = {
        id: Date.now(), // Simple ID generation
        sku,
        name,
        type,
        quantity: parseInt(quantity),
        reorder: parseInt(reorder),
        price: parseFloat(price)
      };
      
      setProducts([...products, newProduct]);
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
              
              <button onClick={() => window.location.reload()} className="refresh-btn">
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