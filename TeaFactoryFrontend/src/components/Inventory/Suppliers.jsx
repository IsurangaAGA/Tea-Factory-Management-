import React, { useState } from 'react';

const Suppliers = () => {
  const [activeTab, setActiveTab] = useState('suppliers');
  
  const suppliers = [
    { id: 1, name: 'Apple Inc', contact: 'John Appleseed', email: 'john@apple.com', phone: '+1-800-692-7753', products: 45, status: 'Active' },
    { id: 2, name: 'Samsung Electronics', contact: 'Kim Lee', email: 'kim.lee@samsung.com', phone: '+1-800-726-7864', products: 32, status: 'Active' },
    { id: 3, name: 'Dell Technologies', contact: 'Michael Dell', email: 'm.dell@dell.com', phone: '+1-800-433-2392', products: 28, status: 'Active' },
    { id: 4, name: 'HP Inc', contact: 'Sarah Johnson', email: 's.johnson@hp.com', phone: '+1-800-752-0900', products: 0, status: 'Inactive' }
  ];

  const purchaseOrders = [
    { id: 'PO-001', supplier: 'Apple Inc', products: 'iPhone 14 Pro (50)', total: 49950, date: '2024-01-10', status: 'Received' },
    { id: 'PO-002', supplier: 'Samsung Electronics', products: 'Galaxy S23 (25)', total: 19975, date: '2024-01-12', status: 'Ordered' },
    { id: 'PO-003', supplier: 'Apple Inc', products: 'AirPods Pro (100)', total: 24900, date: '2024-01-08', status: 'Received' },
    { id: 'PO-004', supplier: 'Dell Technologies', products: 'XPS 13 (15)', total: 17985, date: '2024-01-15', status: 'Draft' }
  ];

  return (
    <div className="suppliers-page">
      <div className="page-header">
        <h1>Suppliers & Purchase Orders</h1>
        <p>Manage supplier relationships and purchase orders</p>
      </div>

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

        {/* Suppliers Tab */}
        {activeTab === 'suppliers' && (
          <div className="tab-content">
            <div className="flex justify-between items-center mb-6">
              <h2>Supplier List</h2>
              <button className="btn btn-primary">➕ Add Supplier</button>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Supplier Name</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Products</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map(supplier => (
                    <tr key={supplier.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="supplier-avatar">🏢</div>
                          {supplier.name}
                        </div>
                      </td>
                      <td>{supplier.contact}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.products}</td>
                      <td>
                        <span className={`status-badge ${supplier.status.toLowerCase()}`}>
                          {supplier.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn-icon" title="Edit">✏️</button>
                          <button className="btn-icon" title="View">👁️</button>
                          <button className="btn-icon" title="Create PO">🧾</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Purchase Orders Tab */}
        {activeTab === 'orders' && (
          <div className="tab-content">
            <div className="flex justify-between items-center mb-6">
              <h2>Purchase Orders</h2>
              <button className="btn btn-primary">📋 Create PO</button>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Supplier</th>
                    <th>Products</th>
                    <th>Total Amount</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map(po => (
                    <tr key={po.id}>
                      <td>
                        <strong>{po.id}</strong>
                      </td>
                      <td>{po.supplier}</td>
                      <td>{po.products}</td>
                      <td>${po.total.toLocaleString()}</td>
                      <td>{po.date}</td>
                      <td>
                        <span className={`status-badge ${po.status.toLowerCase()}`}>
                          {po.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {po.status === 'Draft' && (
                            <button className="btn-icon" title="Edit">✏️</button>
                          )}
                          {po.status === 'Ordered' && (
                            <button className="btn-icon" title="Mark Received">✅</button>
                          )}
                          <button className="btn-icon" title="View">👁️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .suppliers-page {
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

        .tab-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--dark-color);
          margin: 0;
        }

        .supplier-avatar {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: var(--border-color);
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
          color: var(--success-color);
        }

        .status-badge.inactive {
          background: rgba(107, 114, 128, 0.1);
          color: var(--gray-color);
        }

        .status-badge.received {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success-color);
        }

        .status-badge.ordered {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning-color);
        }

        .status-badge.draft {
          background: rgba(107, 114, 128, 0.1);
          color: var(--gray-color);
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
          background: var(--border-color);
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .tabs {
            flex-direction: column;
          }
          
          .flex.justify-between {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Suppliers;