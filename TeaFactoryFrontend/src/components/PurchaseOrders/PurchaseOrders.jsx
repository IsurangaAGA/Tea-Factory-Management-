import React, { useState, useEffect } from 'react';

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const API_URL = "http://localhost:8080/api/purchase-orders";
  const SUPPLIERS_API_URL = "http://localhost:8080/api/suppliers";
  const PRODUCTS_API_URL = "http://localhost:8080/inventory";

  const [formData, setFormData] = useState({
    supplierId: '',
    orderDate: new Date().toISOString().split('T')[0],
    totalAmount: 0,
    status: 'Pending',
    items: [{ itemId: '', quantity: 1, unitPrice: 0 }]
  });

  useEffect(() => {
    fetchPurchaseOrders();
    fetchSuppliers();
    fetchProducts();
  }, []);

  const fetchPurchaseOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setPurchaseOrders(data);
    } catch (err) {
      setError(`Failed to load purchase orders: ${err.message}`);
      setPurchaseOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(SUPPLIERS_API_URL);
      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
      }
    } catch (err) {
      console.error('Error fetching suppliers:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API_URL);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const createPurchaseOrder = async (poData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poData),
      });
      if (!response.ok) throw new Error('Failed to create purchase order');
      return await response.json();
    } catch (err) {
      throw new Error('Failed to create purchase order: ' + err.message);
    }
  };

  const updatePurchaseOrder = async (id, poData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poData),
      });
      if (!response.ok) throw new Error('Failed to update purchase order');
      return await response.json();
    } catch (err) {
      throw new Error('Failed to update purchase order: ' + err.message);
    }
  };

  const deletePurchaseOrder = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete purchase order');
    } catch (err) {
      throw new Error('Failed to delete purchase order: ' + err.message);
    }
  };

  const receivePurchaseOrder = async (poId) => {
    try {
      const po = purchaseOrders.find(p => p.id === poId);
      if (!po) return;

      // Update PO status to Received
      const updatedPO = await updatePurchaseOrder(poId, {
        ...po,
        status: 'Received'
      });

      // Update stock for each item in the PO
      if (po.items) {
        for (const item of po.items) {
          const product = products.find(p => p.id === item.item?.id);
          if (product) {
            await fetch(`${PRODUCTS_API_URL}/${product.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...product,
                quantity: product.quantity + item.quantity
              }),
            });
          }
        }
      }

      setPurchaseOrders(purchaseOrders.map(po => 
        po.id === poId ? updatedPO : po
      ));

      alert('PO marked as received — stock updated.');
    } catch (err) {
      setError(err.message);
    }
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

  const filteredPOs = purchaseOrders.filter(po => 
    `PO-${po.id}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.supplier?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.supplierId || formData.items.some(item => !item.itemId || item.quantity <= 0)) {
      alert('Please fill all fields with valid values');
      return;
    }

    try {
      // Calculate total amount from items
      const totalAmount = formData.items.reduce((total, item) => {
        const product = products.find(p => p.id == item.itemId);
        return total + (item.quantity * (product?.price || item.unitPrice));
      }, 0);

      const poData = {
        orderDate: formData.orderDate,
        totalAmount: totalAmount,
        status: formData.status,
        supplier: { id: formData.supplierId },
        items: formData.items.map(item => ({
          quantity: item.quantity,
          unitPrice: products.find(p => p.id == item.itemId)?.price || item.unitPrice,
          item: { id: item.itemId }
        }))
      };

      const newPO = await createPurchaseOrder(poData);
      setPurchaseOrders([...purchaseOrders, newPO]);
      setShowForm(false);
      setFormData({
        supplierId: '',
        orderDate: new Date().toISOString().split('T')[0],
        totalAmount: 0,
        status: 'Pending',
        items: [{ itemId: '', quantity: 1, unitPrice: 0 }]
      });
      
      alert('Purchase Order created successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { itemId: '', quantity: 1, unitPrice: 0 }]
    });
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData({ ...formData, items: updatedItems });
    }
  };

  const getPOTotalAmount = (po) => {
    if (po.items && po.items.length > 0) {
      return po.items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
    }
    return po.totalAmount || 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="purchase-orders"><div className="loading">Loading Purchase Orders...</div></div>;
  }

  return (
    <div className="purchase-orders">
      <header className="purchase-orders-header">
        <h1>Purchase Orders</h1>
        <p>Create supplier POs. When PO is marked Received, stock will increase.</p>
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
            placeholder="Search POs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-export">
          <button onClick={() => setShowForm(true)} className="add-po-btn">
            Create PO
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="purchase-orders-table">
          <thead>
            <tr>
              <th>PO#</th>
              <th>Supplier</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPOs.map(po => (
              <tr key={po.id}>
                <td><strong>PO-{po.id.toString().padStart(3, '0')}</strong></td>
                <td>{po.supplier?.name || 'N/A'}</td>
                <td>{po.items ? po.items.length : 0}</td>
                <td>${getPOTotalAmount(po).toLocaleString()}</td>
                <td>{formatDate(po.orderDate)}</td>
                <td>
                  <span className={`status-badge ${po.status?.toLowerCase()}`}>
                    {po.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {po.status !== 'Received' && (
                      <button 
                        onClick={() => receivePurchaseOrder(po.id)}
                        className="btn-receive"
                      >
                        Mark Received
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeletePO(po.id)}
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
        
        {filteredPOs.length === 0 && (
          <div className="no-pos">
            {purchaseOrders.length === 0 ? 'No purchase orders available.' : 'No POs found.'}
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create Purchase Order</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Supplier *</label>
                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a supplier</option>
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
                  name="orderDate"
                  value={formData.orderDate}
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
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Sent">Sent</option>
                  <option value="Received">Received</option>
                </select>
              </div>

              <div className="form-group">
                <label>Items</label>
                {formData.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <select
                      value={item.itemId}
                      onChange={(e) => handleItemChange(index, 'itemId', e.target.value)}
                      required
                    >
                      <option value="">Select Product</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} - ${product.price}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                      min="1"
                      required
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Unit Price"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                      min="0"
                    />
                    {formData.items.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeItem(index)}
                        className="btn-remove"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addItem} className="btn-add-item">
                  Add Item
                </button>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Create PO
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

      <style jsx>{`
        .purchase-orders {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem;
        }

        .purchase-orders-header {
          margin-bottom: 2rem;
        }

        .purchase-orders-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .purchase-orders-header p {
          color: #6b7280;
          font-size: 1.125rem;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .search-container {
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
        }

        .add-po-btn {
          background: #3b82f6;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        .add-po-btn:hover {
          background: #2563eb;
        }

        .table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .purchase-orders-table {
          width: 100%;
          border-collapse: collapse;
        }

        .purchase-orders-table th {
          background: #f9fafb;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .purchase-orders-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #6b7280;
        }

        .purchase-orders-table tr:hover {
          background: #f9fafb;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
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

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-receive {
          background: #10b981;
          color: white;
          padding: 0.25rem 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .btn-receive:hover {
          background: #059669;
        }

        .btn-delete {
          background: #ef4444;
          color: white;
          padding: 0.25rem 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .btn-delete:hover {
          background: #dc2626;
        }

        .no-pos {
          text-align: center;
          padding: 2rem;
          color: #6b7280;
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
          max-width: 600px;
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
        .form-group select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .item-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          align-items: end;
        }

        .btn-add-item {
          background: #6b7280;
          color: white;
          padding: 0.25rem 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
          margin-top: 0.5rem;
        }

        .btn-add-item:hover {
          background: #4b5563;
        }

        .btn-remove {
          background: #ef4444;
          color: white;
          padding: 0.25rem 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .btn-remove:hover {
          background: #dc2626;
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

        @media (max-width: 768px) {
          .controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container {
            max-width: none;
          }

          .item-row {
            grid-template-columns: 1fr;
            gap: 0.25rem;
          }

          .modal-content {
            margin: 1rem;
            width: calc(100% - 2rem);
          }

          .purchase-orders-table {
            font-size: 0.875rem;
          }

          .purchase-orders-table th,
          .purchase-orders-table td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PurchaseOrders;