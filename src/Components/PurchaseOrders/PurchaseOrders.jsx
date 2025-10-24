import React, { useState, useEffect } from 'react';
import './PurchaseOrders.css';

const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const API_URL = "http://localhost:8080/purchase-orders";
  const SUPPLIERS_API_URL = "http://localhost:8080/suppliers";
  const PRODUCTS_API_URL = "http://localhost:8080/inventory";

  const [formData, setFormData] = useState({
    supplierId: '',
    productId: '',
    quantity: 10
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

  const receivePurchaseOrder = async (poId) => {
    try {
      const po = purchaseOrders.find(p => p.id === poId);
      if (!po) return;

      // Update PO status
      const updatedPO = await updatePurchaseOrder(poId, {
        ...po,
        status: 'RECEIVED'
      });

      // Update stock for each item in the PO
      for (const item of po.items) {
        const product = products.find(p => p.id === item.productId);
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

      setPurchaseOrders(purchaseOrders.map(po => 
        po.id === poId ? updatedPO : po
      ));

      alert('PO marked as received — stock updated.');
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredPOs = purchaseOrders.filter(po => 
    po.poNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.supplier?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.supplierId || !formData.productId || formData.quantity <= 0) {
      alert('Please fill all fields with valid values');
      return;
    }

    try {
      const supplier = suppliers.find(s => s.id == formData.supplierId);
      const product = products.find(p => p.id == formData.productId);
      
      const poData = {
        poNo: `PO-${String(purchaseOrders.length + 1).padStart(4, '0')}`,
        supplierId: formData.supplierId,
        supplierName: supplier.name,
        items: [{
          productId: formData.productId,
          name: product.name,
          quantity: parseInt(formData.quantity)
        }],
        status: 'OPEN'
      };

      const newPO = await createPurchaseOrder(poData);
      setPurchaseOrders([...purchaseOrders, newPO]);
      setShowForm(false);
      setFormData({ supplierId: '', productId: '', quantity: 10 });
      
      alert('PO created. Mark as Received when goods arrive.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPOs.map(po => (
              <tr key={po.id}>
                <td>{po.poNo}</td>
                <td>{po.supplierName}</td>
                <td>
                  <span className={`status-badge ${po.status?.toLowerCase()}`}>
                    {po.status}
                  </span>
                </td>
                <td>
                  {po.status === 'OPEN' && (
                    <button 
                      onClick={() => receivePurchaseOrder(po.id)}
                      className="btn-receive"
                    >
                      Mark Received
                    </button>
                  )}
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
                <label>Supplier</label>
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
                <label>Product</label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.sku} - {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
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
    </div>
  );
};

export default PurchaseOrders;