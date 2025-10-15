import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    type: 'raw',
    quantity: 0,
    reorderLevel: 10,
    price: 0.00
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = "http://localhost:8080/inventory";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'reorderLevel' ? parseInt(value) || 0 :
              name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.sku.trim()) {
      setError('SKU is required');
      setLoading(false);
      return;
    }
    if (!formData.name.trim()) {
      setError('Product name is required');
      setLoading(false);
      return;
    }
    if (formData.quantity < 0) {
      setError('Quantity cannot be negative');
      setLoading(false);
      return;
    }
    if (formData.price < 0) {
      setError('Price cannot be negative');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const createdProduct = await response.json();
      alert('Product created successfully!');
      navigate('/inventory'); // Redirect back to inventory page
      
    } catch (err) {
      setError(err.message);
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/inventory');
  };

  return (
    <div className="add-product">
      <header className="add-product-header">
        <h1>Create Product</h1>
        <p>Add new raw material or finished goods to inventory</p>
      </header>

      <div className="add-product-card">
        <form onSubmit={handleSubmit} className="product-form">
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
              <button onClick={() => setError('')} className="close-error">×</button>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sku">SKU *</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
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
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="raw">Raw Material</option>
                <option value="finished">Finished Goods</option>
              </select>
              <small>
                {formData.type === 'raw' 
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
                value={formData.quantity}
                onChange={handleInputChange}
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
                value={formData.reorderLevel}
                onChange={handleInputChange}
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
                value={formData.price}
                onChange={handleInputChange}
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
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;