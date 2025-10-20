import React, { useState } from 'react';

const StockInOut = () => {
  const [activeTab, setActiveTab] = useState('in');
  
  const stockHistory = [
    { id: 1, type: 'in', product: 'iPhone 14 Pro', quantity: 50, source: 'Purchase Order', date: '2024-01-15', notes: 'New stock received' },
    { id: 2, type: 'out', product: 'MacBook Air', quantity: 5, reason: 'Sale', date: '2024-01-14', notes: 'Online order fulfillment' },
    { id: 3, type: 'in', product: 'AirPods Pro', quantity: 100, source: 'Supplier Delivery', date: '2024-01-13', notes: 'Bulk order' },
    { id: 4, type: 'out', product: 'iPad Pro', quantity: 12, reason: 'Store Transfer', date: '2024-01-12', notes: 'Transferred to downtown store' }
  ];

  return (
    <div className="stock-page">
      <div className="page-header">
        <h1>Stock Management</h1>
        <p>Record stock movements and track inventory changes</p>
      </div>

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
                <select className="form-select">
                  <option>Select Product</option>
                  <option>iPhone 14 Pro</option>
                  <option>MacBook Air M2</option>
                  <option>AirPods Pro</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-input" placeholder="Enter quantity" />
              </div>
              <div className="form-group">
                <label className="form-label">Source</label>
                <select className="form-select">
                  <option>Purchase Order</option>
                  <option>Supplier Delivery</option>
                  <option>Return</option>
                  <option>Adjustment</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group col-span-2">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" rows="3" placeholder="Additional notes..."></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button className="btn btn-outline">Cancel</button>
              <button className="btn btn-success">📥 Record Stock In</button>
            </div>
          </div>
        )}

        {/* Stock Out Form */}
        {activeTab === 'out' && (
          <div className="tab-content">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Product</label>
                <select className="form-select">
                  <option>Select Product</option>
                  <option>iPhone 14 Pro</option>
                  <option>MacBook Air M2</option>
                  <option>AirPods Pro</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-input" placeholder="Enter quantity" />
              </div>
              <div className="form-group">
                <label className="form-label">Reason</label>
                <select className="form-select">
                  <option>Sale</option>
                  <option>Damage</option>
                  <option>Store Transfer</option>
                  <option>Adjustment</option>
                  <option>Return to Supplier</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group col-span-2">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" rows="3" placeholder="Additional notes..."></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button className="btn btn-outline">Cancel</button>
              <button className="btn btn-warning">📤 Record Stock Out</button>
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
                    <th>Type</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Source/Reason</th>
                    <th>Date</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {stockHistory.map(record => (
                    <tr key={record.id}>
                      <td>
                        <span className={`type-badge ${record.type}`}>
                          {record.type === 'in' ? '📥 In' : '📤 Out'}
                        </span>
                      </td>
                      <td>{record.product}</td>
                      <td>
                        <span className={record.type === 'in' ? 'text-success' : 'text-danger'}>
                          {record.type === 'in' ? '+' : '-'}{record.quantity}
                        </span>
                      </td>
                      <td>{record.source || record.reason}</td>
                      <td>{record.date}</td>
                      <td>{record.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

        .type-badge.in {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success-color);
        }

        .type-badge.out {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger-color);
        }

        .col-span-2 {
          grid-column: span 2;
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