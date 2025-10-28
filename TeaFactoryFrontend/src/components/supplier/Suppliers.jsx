import React, { useState, useEffect } from 'react';
import './Suppliers.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // ✅ matches backend controller base path
  const API_URL = "http://localhost:8080/api/suppliers";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  // 🔹 Fetch all suppliers on mount
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSuppliers(data);
    } catch (err) {
      setError('Failed to load suppliers: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create new supplier
  const createSupplier = async (supplier) => {
    const res = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplier),
    });
    if (!res.ok) throw new Error('Failed to create supplier');
    return await res.json();
  };

  // 🔹 Update existing supplier
  const updateSupplier = async (id, supplier) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplier),
    });
    if (!res.ok) throw new Error('Failed to update supplier');
    return await res.json();
  };

  // 🔹 Delete supplier
  const deleteSupplier = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete supplier');
  };

  // 🔹 Handle form submit (Create/Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Supplier name is required');
      return;
    }

    try {
      if (editingSupplier) {
        const updated = await updateSupplier(editingSupplier.id, formData);
        setSuppliers(suppliers.map(s => (s.id === editingSupplier.id ? updated : s)));
      } else {
        const created = await createSupplier(formData);
        setSuppliers([...suppliers, created]);
      }
      setShowForm(false);
      setEditingSupplier(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active'
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await deleteSupplier(id);
        setSuppliers(suppliers.filter(s => s.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // 🔹 Handle edit
  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      status: supplier.status
    });
    setShowForm(true);
  };

  // 🔹 Add new
  const handleAddNew = () => {
    setEditingSupplier(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'Active'
    });
    setShowForm(true);
  };

  // 🔹 Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Filter
  const filteredSuppliers = suppliers.filter(s =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone?.includes(searchTerm)
  );

  if (loading) return <div className="suppliers"><div className="loading">Loading Suppliers...</div></div>;

  return (
    <div className="suppliers">
      <header className="suppliers-header">
        <h1>Suppliers</h1>
        <p>Manage all registered suppliers in the system</p>
      </header>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      {/* --- Controls --- */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleAddNew} className="btn-add">
          ➕ Add Supplier
        </button>
      </div>

      {/* --- Table --- */}
      <div className="table-container">
        <table className="suppliers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
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
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <td>
                  <span className={`status-badge ${supplier.status === 'Active' ? 'active' : 'inactive'}`}>
                    {supplier.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handleEdit(supplier)} className="btn-edit">✏️ Edit</button>
                    <button onClick={() => handleDelete(supplier.id)} className="btn-delete">🗑️ Delete</button>
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

      {/* --- Modal Form --- */}
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
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
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
