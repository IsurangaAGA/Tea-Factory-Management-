import React, { useState, useEffect } from 'react';

const Suppliers = () => {
  const [activeTab, setActiveTab] = useState('suppliers');
  const [suppliers, setSuppliers] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [showPOForm, setShowPOForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // API URLs
  const SUPPLIERS_API = 'http://localhost:8080/api/suppliers';
  const PURCHASE_ORDERS_API = 'http://localhost:8080/api/purchase-orders';

  // Form states
  const [supplierFormData, setSupplierFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  const [poFormData, setPoFormData] = useState({
    supplierId: '',
    orderDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    totalAmount: 0
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchSuppliers();
    fetchPurchaseOrders();
  }, []);

  // API functions
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await fetch(SUPPLIERS_API);
      if (!response.ok) throw new Error('Failed to fetch suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (err) {
      setError(`Failed to load suppliers: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchaseOrders = async () => {
    try {
      const response = await fetch(PURCHASE_ORDERS_API);
      if (!response.ok) throw new Error('Failed to fetch purchase orders');
      const data = await response.json();
      setPurchaseOrders(data);
    } catch (err) {
      setError(`Failed to load purchase orders: ${err.message}`);
    }
  };

  // Supplier CRUD operations
  const createSupplier = async (supplierData) => {
    const response = await fetch(SUPPLIERS_API, {
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
    const response = await fetch(`${SUPPLIERS_API}/${id}`, { 
      method: 'DELETE' 
    });
    if (!response.ok) throw new Error('Failed to delete supplier');
  };

  // Purchase Order CRUD operations
  const createPurchaseOrder = async (poData) => {
    const response = await fetch(PURCHASE_ORDERS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poData),
    });
    if (!response.ok) throw new Error('Failed to create purchase order');
    return await response.json();
  };

  const deletePurchaseOrder = async (id) => {
    const response = await fetch(`${PURCHASE_ORDERS_API}/${id}`, { 
      method: 'DELETE' 
    });
    if (!response.ok) throw new Error('Failed to delete purchase order');
  };

  // Supplier handlers
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

  const handleSupplierFormSubmit = async (e) => {
    e.preventDefault();
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

  // Purchase Order handlers
  const handleAddPO = () => {
    setPoFormData({
      supplierId: '',
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      totalAmount: 0
    });
    setShowPOForm(true);
  };

  const handleDeletePO = async (poId) => {
    if (window.confirm('Are you sure you want to delete this purchase order?')) {
      try {
        await deletePurchaseOrder(poId);
        setPurchaseOrders(purchaseOrders.filter(po => po.id !== poId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handlePOFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const poData = {
        ...poFormData,
        supplier: { id: poFormData.supplierId }
      };

      const newPO = await createPurchaseOrder(poData);
      setPurchaseOrders([...purchaseOrders, newPO]);
      setShowPOForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Helper functions
  const getSupplierProductCount = (supplier) => {
    return supplier.items ? supplier.items.length : 0;
  };

  const getPOTotalAmount = (po) => {
    return po.totalAmount || 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPurchaseOrders = purchaseOrders.filter(po =>
    po.supplier?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `PO-${po.id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="suppliers-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="suppliers-page">
      <div className="page-header">
        <h1>Suppliers & Purchase Orders</h1>
        <p>Manage supplier relationships and purchase orders</p>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      {/* Tabs */}
      <div className="card mb-6">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'suppliers' ? 'active' : ''}`}
            onClick={() => setActiveTab('suppliers')}
          >
            🏢 Suppliers
          </button>
          <button 
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            🧾 Purchase Orders
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder={`Search ${activeTab === 'suppliers' ? 'suppliers' : 'purchase orders'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Suppliers Tab */}
        {activeTab === 'suppliers' && (
          <div className="tab-content">
            <div className="flex justify-between items-center mb-6 p-4">
              <h2>Supplier List</h2>
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
                    <th>Products</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map(supplier => (
                    <tr key={supplier.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="supplier-avatar">🏢</div>
                          {supplier.name}
                        </div>
                      </td>
                      <td>{supplier.email}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.address}</td>
                      <td>{getSupplierProductCount(supplier)}</td>
                      <td>
                        <span className={`status-badge ${supplier.status?.toLowerCase() || 'active'}`}>
                          {supplier.status || 'Active'}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            className="btn-icon" 
                            title="Edit"
                            onClick={() => handleEditSupplier(supplier)}
                          >
                            ✏️
                          </button>
                          <button 
                            className="btn-icon text-red-600" 
                            title="Delete"
                            onClick={() => handleDeleteSupplier(supplier.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredSuppliers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {suppliers.length === 0 ? 'No suppliers available.' : 'No suppliers found.'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Purchase Orders Tab */}
        {activeTab === 'orders' && (
          <div className="tab-content">
            <div className="flex justify-between items-center mb-6 p-4">
              <h2>Purchase Orders</h2>
              <button className="btn btn-primary" onClick={handleAddPO}>
                📋 Create PO
              </button>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Supplier</th>
                    <th>Items Count</th>
                    <th>Total Amount</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurchaseOrders.map(po => (
                    <tr key={po.id}>
                      <td>
                        <strong>PO-{po.id.toString().padStart(3, '0')}</strong>
                      </td>
                      <td>{po.supplier?.name || 'N/A'}</td>
                      <td>{po.items ? po.items.length : 0}</td>
                      <td>${getPOTotalAmount(po).toLocaleString()}</td>
                      <td>{formatDate(po.orderDate)}</td>
                      <td>
                        <span className={`status-badge ${po.status?.toLowerCase() || 'pending'}`}>
                          {po.status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            className="btn-icon text-red-600" 
                            title="Delete"
                            onClick={() => handleDeletePO(po.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPurchaseOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {purchaseOrders.length === 0 ? 'No purchase orders available.' : 'No purchase orders found.'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Supplier Form Modal */}
      {showSupplierForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</h3>
            <form onSubmit={handleSupplierFormSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={supplierFormData.name}
                  onChange={(e) => setSupplierFormData({...supplierFormData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={supplierFormData.email}
                  onChange={(e) => setSupplierFormData({...supplierFormData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={supplierFormData.phone}
                  onChange={(e) => setSupplierFormData({...supplierFormData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  value={supplierFormData.address}
                  onChange={(e) => setSupplierFormData({...supplierFormData, address: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={supplierFormData.status}
                  onChange={(e) => setSupplierFormData({...supplierFormData, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowSupplierForm(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Purchase Order Form Modal */}
      {showPOForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create Purchase Order</h3>
            <form onSubmit={handlePOFormSubmit}>
              <div className="form-group">
                <label>Supplier *</label>
                <select
                  value={poFormData.supplierId}
                  onChange={(e) => setPoFormData({...poFormData, supplierId: e.target.value})}
                  required
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Order Date</label>
                <input
                  type="date"
                  value={poFormData.orderDate}
                  onChange={(e) => setPoFormData({...poFormData, orderDate: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Total Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={poFormData.totalAmount}
                  onChange={(e) => setPoFormData({...poFormData, totalAmount: parseFloat(e.target.value)})}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={poFormData.status}
                  onChange={(e) => setPoFormData({...poFormData, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Sent">Sent</option>
                  <option value="Received">Received</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Create Purchase Order
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowPOForm(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .suppliers-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: #6b7280;
          font-size: 1.125rem;
        }

        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .tabs {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
        }

        .tab {
          padding: 1rem 1.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #6b7280;
        }

        .tab:hover {
          background: rgba(59, 130, 246, 0.05);
          color: #374151;
        }

        .tab.active {
          border-bottom-color: #3b82f6;
          color: #3b82f6;
          font-weight: 600;
        }

        .tab-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .search-input {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 0.875rem;
        }

        .supplier-avatar {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge.active {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .status-badge.inactive {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .status-badge.pending {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .status-badge.approved {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .status-badge.sent {
          background: rgba(168, 85, 247, 0.1);
          color: #a855f7;
        }

        .status-badge.received {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
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
          background: #f3f4f6;
          transform: scale(1.1);
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

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
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 0.875rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        .btn-cancel {
          background: #6b7280;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-cancel:hover {
          background: #4b5563;
        }

        .error-message {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .close-error {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: #dc2626;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.125rem;
          color: #6b7280;
        }

        .table-container {
          overflow-x: auto;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th {
          background: #f9fafb;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #6b7280;
        }

        .table tr:hover {
          background: #f9fafb;
        }

        .text-red-600 {
          color: #dc2626;
        }

        .text-gray-500 {
          color: #6b7280;
        }

        .text-center {
          text-align: center;
        }

        .py-8 {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        .p-4 {
          padding: 1rem;
        }

        .mb-6 {
          margin-bottom: 1.5rem;
        }

        .border-b {
          border-bottom: 1px solid #e5e7eb;
        }

        .flex {
          display: flex;
        }

        .justify-between {
          justify-content: space-between;
        }

        .items-center {
          align-items: center;
        }

        .gap-2 {
          gap: 0.5rem;
        }

        .gap-3 {
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .tabs {
            flex-direction: column;
          }
          
          .flex.justify-between {
            flex-direction: column;
            gap: 1rem;
          }

          .modal-content {
            margin: 1rem;
            width: calc(100% - 2rem);
          }

          .table {
            font-size: 0.875rem;
          }

          .table th,
          .table td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Suppliers;