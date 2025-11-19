import React, { useState, useEffect } from 'react'; 

const StockInOut = () => {
  const [activeTab, setActiveTab] = useState('in');
  const [inventory, setInventory] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [stockHistory, setStockHistory] = useState([]);
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    source: '',
    reason: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  // API base URLs
  const INVENTORY_API = 'http://localhost:8080/inventory';
  const SUPPLIERS_API = 'http://localhost:8080/api/suppliers';
  const PURCHASE_ORDERS_API = 'http://localhost:8080/api/purchase-orders';

  // Fetch inventory data
  const fetchInventory = async () => {
    try {
      const response = await fetch(INVENTORY_API);
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${INVENTORY_API}/dashboard`);
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Fetch inventory history
  const fetchInventoryHistory = async () => {
    try {
      const response = await fetch(`${INVENTORY_API}/history`);
      const data = await response.json();
      setStockHistory(data);
    } catch (error) {
      console.error('Error fetching inventory history:', error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchInventory();
    fetchDashboardData();
    fetchInventoryHistory();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle stock in
  const handleStockIn = async () => {
    if (!formData.product || !formData.quantity || !formData.source) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const selectedItem = inventory.find(item => item.id == formData.product);
      const updatedQuantity = selectedItem.quantity + parseInt(formData.quantity);

      const updateData = {
        ...selectedItem,
        quantity: updatedQuantity
      };

      const response = await fetch(`${INVENTORY_API}/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        alert('Stock in recorded successfully!');
        setFormData({
          product: '',
          quantity: '',
          source: '',
          reason: '',
          date: new Date().toISOString().split('T')[0],
          notes: ''
        });
        // Refresh data
        fetchInventory();
        fetchDashboardData();
        fetchInventoryHistory();
      }
    } catch (error) {
      console.error('Error recording stock in:', error);
      alert('Error recording stock in');
    } finally {
      setLoading(false);
    }
  };

  // Handle stock out
  const handleStockOut = async () => {
    if (!formData.product || !formData.quantity || !formData.reason) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const selectedItem = inventory.find(item => item.id == formData.product);
      
      if (selectedItem.quantity < parseInt(formData.quantity)) {
        alert('Insufficient stock quantity');
        setLoading(false);
        return;
      }

      const updatedQuantity = selectedItem.quantity - parseInt(formData.quantity);

      const updateData = {
        ...selectedItem,
        quantity: updatedQuantity
      };

      const response = await fetch(`${INVENTORY_API}/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        alert('Stock out recorded successfully!');
        setFormData({
          product: '',
          quantity: '',
          source: '',
          reason: '',
          date: new Date().toISOString().split('T')[0],
          notes: ''
        });
        // Refresh data
        fetchInventory();
        fetchDashboardData();
        fetchInventoryHistory();
      }
    } catch (error) {
      console.error('Error recording stock out:', error);
      alert('Error recording stock out');
    } finally {
      setLoading(false);
    }
  };

  // Dashboard summary component
  const DashboardSummary = () => (
    <div className="dashboard-summary mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="summary-card bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800">Total Tea Stock</h3>
          <p className="text-2xl font-bold text-blue-600">
            {dashboardData?.totalTeaStock || 0}
          </p>
        </div>
        <div className="summary-card bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-orange-800">Total Cinnamon Stock</h3>
          <p className="text-2xl font-bold text-orange-600">
            {dashboardData?.totalCinnamonStock || 0}
          </p>
        </div>
        <div className="summary-card bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-800">Low Stock Items</h3>
          <p className="text-2xl font-bold text-red-600">
            {dashboardData?.lowStockCount || 0}
          </p>
        </div>
        <div className="summary-card bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800">Total Items</h3>
          <p className="text-2xl font-bold text-green-600">
            {dashboardData?.totalItems || 0}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="stock-page">
      <div className="page-header">
        <h1>Stock Management</h1>
        <p>Record stock movements and track inventory changes</p>
      </div>

      {/* Dashboard Summary */}
      {dashboardData && <DashboardSummary />}

      {/* Stock Action Tabs */}
      <div className="card mb-6">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'in' ? 'active' : ''}`}
            onClick={() => setActiveTab('in')}
          >
            📥 Stock In
          </button>
          <button 
            className={`tab ${activeTab === 'out' ? 'active' : ''}`}
            onClick={() => setActiveTab('out')}
          >
            📤 Stock Out
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📋 Stock History
          </button>
        </div>

        {/* Stock In Form */}
        {activeTab === 'in' && (
          <div className="tab-content">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Product</label>
                <select 
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Product</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.sku}) - Stock: {item.quantity}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input 
                  type="number" 
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="form-input" 
                  placeholder="Enter quantity" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Source</label>
                <select 
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Source</option>
                  <option value="Purchase Order">Purchase Order</option>
                  <option value="Supplier Delivery">Supplier Delivery</option>
                  <option value="Return">Return</option>
                  <option value="Adjustment">Adjustment</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input" 
                />
              </div>
              <div className="form-group col-span-2">
                <label className="form-label">Notes</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-textarea" 
                  rows="3" 
                  placeholder="Additional notes..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button 
                className="btn btn-outline"
                onClick={() => setFormData({
                  product: '',
                  quantity: '',
                  source: '',
                  reason: '',
                  date: new Date().toISOString().split('T')[0],
                  notes: ''
                })}
              >
                Cancel
              </button>
              <button 
                className="btn btn-success"
                onClick={handleStockIn}
                disabled={loading}
              >
                {loading ? 'Processing...' : '📥 Record Stock In'}
              </button>
            </div>
          </div>
        )}

        {/* Stock Out Form */}
        {activeTab === 'out' && (
          <div className="tab-content">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Product</label>
                <select 
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Product</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.sku}) - Stock: {item.quantity}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input 
                  type="number" 
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="form-input" 
                  placeholder="Enter quantity" 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Reason</label>
                <select 
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Reason</option>
                  <option value="Sale">Sale</option>
                  <option value="Damage">Damage</option>
                  <option value="Store Transfer">Store Transfer</option>
                  <option value="Adjustment">Adjustment</option>
                  <option value="Return to Supplier">Return to Supplier</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input" 
                />
              </div>
              <div className="form-group col-span-2">
                <label className="form-label">Notes</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-textarea" 
                  rows="3" 
                  placeholder="Additional notes..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button 
                className="btn btn-outline"
                onClick={() => setFormData({
                  product: '',
                  quantity: '',
                  source: '',
                  reason: '',
                  date: new Date().toISOString().split('T')[0],
                  notes: ''
                })}
              >
                Cancel
              </button>
              <button 
                className="btn btn-warning"
                onClick={handleStockOut}
                disabled={loading}
              >
                {loading ? 'Processing...' : '📤 Record Stock Out'}
              </button>
            </div>
          </div>
        )}

        {/* Stock History */}
        {activeTab === 'history' && (
          <div className="tab-content">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Product Name</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Reorder Level</th>
                    <th>Supplier</th>
                    <th>Item Master</th>
                  </tr>
                </thead>
                <tbody>
                  {stockHistory.map((record, index) => (
                    <tr key={index}>
                      <td className="font-mono">{record.sku}</td>
                      <td className="font-semibold">{record.name}</td>
                      <td>
                        <span className={`type-badge ${record.type?.toLowerCase()}`}>
                          {record.type}
                        </span>
                      </td>
                      <td>
                        <span className={record.quantity <= record.reorderLevel ? 'text-danger font-bold' : 'text-success'}>
                          {record.quantity}
                          {record.quantity <= record.reorderLevel && ' ⚠️'}
                        </span>
                      </td>
                      <td>{record.reorderLevel}</td>
                      <td>{record.supplier}</td>
                      <td>{record.itemMaster}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {stockHistory.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No inventory history available
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .stock-page {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--dark-color);
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: var(--gray-color);
          font-size: 1.125rem;
        }

        .tabs {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 1.5rem;
        }

        .tab {
          padding: 1rem 1.5rem;
          border: none;
          background: transparent;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .tab:hover {
          background: rgba(59, 130, 246, 0.05);
        }

        .tab.active {
          border-bottom-color: var(--primary-color);
          color: var(--primary-color);
          font-weight: 600;
        }

        .tab-content {
          padding: 0 0.5rem;
        }

        .type-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .type-badge.tea {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success-color);
        }

        .type-badge.cinnamon {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning-color);
        }

        .summary-card {
          transition: transform 0.2s ease;
        }

        .summary-card:hover {
          transform: translateY(-2px);
        }

        .col-span-2 {
          grid-column: span 2;
        }

        .text-danger {
          color: #ef4444;
        }

        .text-success {
          color: #10b981;
        }

        @media (max-width: 768px) {
          .tabs {
            flex-direction: column;
          }
          
          .grid.grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          .col-span-2 {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default StockInOut;