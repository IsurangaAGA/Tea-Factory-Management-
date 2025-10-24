import React, { useState, useEffect } from 'react';
import './Suppliers.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const API_URL = "http://localhost:8080/suppliers";

  const [formData, setFormData] = useState({
    name: '',
    contact: ''
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSuppliers(data);
    } catch (err) {
      setError(`Failed to load suppliers: ${err.message}`);
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  const createSupplier = async (supplierData) => {
    try {
      const response = await fetch(API_URL, {
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

  const updateSupplier = async (id, supplierData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData),
      });
      if (!response.ok) throw new Error('Failed to update supplier');
      return await response.json();
    } catch (err) {
      throw new Error('Failed to update supplier: ' + err.message);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete supplier');
    } catch (err) {
      throw new Error('Failed to delete supplier: ' + err.message);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact?.includes(searchTerm)
  );

  const handleDelete = async (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await deleteSupplier(supplierId);
        setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name || '',
      contact: supplier.contact || ''
    });
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingSupplier(null);
    setFormData({ name: '', contact: '' });
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Supplier name is required');
      return;
    }

    try {
      if (editingSupplier) {
        const updatedSupplier = await updateSupplier(editingSupplier.id, formData);
        setSuppliers(suppliers.map(supplier => 
          supplier.id === editingSupplier.id ? updatedSupplier : supplier
        ));
      } else {
        const newSupplier = await createSupplier(formData);
        setSuppliers([...suppliers, newSupplier]);
      }
      
      setShowForm(false);
      setEditingSupplier(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="suppliers"><div className="loading">Loading Suppliers...</div></div>;
  }

  return (
    <div className="suppliers">
      <header className="suppliers-header">
        <h1>Suppliers</h1>
        <p>Manage your suppliers and purchase orders</p>
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
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-export">
          <button onClick={handleAddNew} className="add-supplier-btn">
            Add Supplier
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="suppliers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map(supplier => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.contact}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => handleEdit(supplier)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(supplier.id)}
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
        
        {filteredSuppliers.length === 0 && (
          <div className="no-suppliers">
            {suppliers.length === 0 ? 'No suppliers available.' : 'No suppliers found.'}
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
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

export default Suppliers;