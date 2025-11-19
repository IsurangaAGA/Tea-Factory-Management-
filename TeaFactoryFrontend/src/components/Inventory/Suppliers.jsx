import React, { useState, useEffect } from 'react';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const SUPPLIERS_API = 'http://localhost:8080/api/suppliers';

  const [supplierFormData, setSupplierFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await fetch(SUPPLIERS_API + '/');
      if (!response.ok) throw new Error('Failed to fetch suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (err) {
      setError(`Failed to load suppliers: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createSupplier = async (supplierData) => {
    const response = await fetch(SUPPLIERS_API + '/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplierData),
    });
    if (!response.ok) throw new Error('Failed to create supplier');
    return await response.json();
  };

  const updateSupplier = async (id, supplierData) => {
    const response = await fetch(`${SUPPLIERS_API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplierData),
    });
    if (!response.ok) throw new Error('Failed to update supplier');
    return await response.json();
  };

  const deleteSupplier = async (id) => {
    const response = await fetch(`${SUPPLIERS_API}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete supplier');
  };

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setSupplierFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'Active'
    });
    setShowSupplierForm(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setSupplierFormData({
      name: supplier.name || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
      status: supplier.status || 'Active'
    });
    setShowSupplierForm(true);
  };

  const handleDeleteSupplier = async (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await deleteSupplier(supplierId);
        setSuppliers(suppliers.filter(s => s.id !== supplierId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSupplierFormSubmit = async () => {
    if (!supplierFormData.name) {
      setError('Supplier name is required');
      return;
    }

    try {
      if (editingSupplier) {
        const updatedSupplier = await updateSupplier(editingSupplier.id, supplierFormData);
        setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? updatedSupplier : s));
      } else {
        const newSupplier = await createSupplier(supplierFormData);
        setSuppliers([...suppliers, newSupplier]);
      }
      setShowSupplierForm(false);
      setEditingSupplier(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading Suppliers...</div>;

  return (
    <div className="suppliers-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: #f5f7fa;
        }

        .suppliers-page {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        h1 {
          font-size: 2rem;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        p {
          color: #718096;
          margin-bottom: 2rem;
        }

        .error-message {
          background: #fed7d7;
          color: #c53030;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .close-error {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #c53030;
        }

        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .search-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #4299e1;
          color: white;
        }

        .btn-primary:hover {
          background: #3182ce;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table thead {
          background: #f7fafc;
        }

        .table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #4a5568;
          border-bottom: 2px solid #e2e8f0;
        }

        .table td {
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .table tbody tr:hover {
          background: #f7fafc;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-badge.active {
          background: #c6f6d5;
          color: #22543d;
        }

        .status-badge.inactive {
          background: #fed7d7;
          color: #742a2a;
        }

        .btn-icon {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.25rem;
          margin: 0 0.25rem;
          transition: transform 0.2s;
        }

        .btn-icon:hover {
          transform: scale(1.2);
        }

        .text-red-600 {
          color: #e53e3e;
        }

        .text-center {
          text-align: center;
        }

        .py-6 {
          padding: 3rem 0;
        }

        .text-gray-600 {
          color: #718096;
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
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease-out;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h3 {
          font-size: 1.5rem;
          color: #1a202c;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 2rem;
          color: #a0aec0;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: #f7fafc;
          color: #4a5568;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #4a5568;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          font-family: inherit;
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          padding: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .btn-cancel {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: white;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background: #f7fafc;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.25rem;
          color: #718096;
        }
      `}</style>

      <h1>Suppliers</h1>
      <p>Manage all suppliers registered in the system</p>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      <div className="controls">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <button className="btn btn-primary" onClick={handleAddSupplier}>
          ➕ Add Supplier
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map(supplier => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <td>
                  <span className={`status-badge ${supplier.status?.toLowerCase()}`}>
                    {supplier.status}
                  </span>
                </td>
                <td>
                  <button className="btn-icon" onClick={() => handleEditSupplier(supplier)}>✏️</button>
                  <button className="btn-icon text-red-600" onClick={() => handleDeleteSupplier(supplier.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-6 text-gray-600">No suppliers found.</div>
        )}
      </div>

      {showSupplierForm && (
        <div className="modal-overlay" onClick={() => setShowSupplierForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</h3>
              <button 
                type="button" 
                className="modal-close" 
                onClick={() => setShowSupplierForm(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={supplierFormData.name}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, name: e.target.value })}
                  placeholder="Enter supplier name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={supplierFormData.email}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, email: e.target.value })}
                  placeholder="supplier@example.com"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={supplierFormData.phone}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  rows="3"
                  value={supplierFormData.address}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, address: e.target.value })}
                  placeholder="Enter supplier address"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={supplierFormData.status}
                  onChange={(e) => setSupplierFormData({ ...supplierFormData, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => setShowSupplierForm(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSupplierFormSubmit}>
                {editingSupplier ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;