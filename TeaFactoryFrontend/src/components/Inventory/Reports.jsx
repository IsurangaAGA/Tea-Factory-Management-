import React, { useState } from 'react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('summary');
  
  const reportData = {
    summary: {
      title: 'Stock Summary Report',
      data: [
        { category: 'Electronics', totalProducts: 156, totalValue: 125430, lowStock: 12 },
        { category: 'Accessories', totalProducts: 89, totalValue: 45670, lowStock: 5 },
        { category: 'Computers', totalProducts: 45, totalValue: 98760, lowStock: 3 },
        { category: 'Mobile', totalProducts: 78, totalValue: 112340, lowStock: 8 }
      ]
    },
    lowStock: {
      title: 'Low Stock Alert Report',
      data: [
        { product: 'AirPods Pro', currentStock: 5, minStock: 10, supplier: 'Apple Inc' },
        { product: 'iPhone Charger', currentStock: 8, minStock: 15, supplier: 'Apple Inc' },
        { product: 'Samsung Case', currentStock: 3, minStock: 10, supplier: 'Samsung' },
        { product: 'MacBook Adapter', currentStock: 7, minStock: 12, supplier: 'Apple Inc' }
      ]
    },
    movement: {
      title: 'Stock Movement Report',
      data: [
        { product: 'iPhone 14 Pro', in: 50, out: 25, net: 25, date: 'Jan 2024' },
        { product: 'MacBook Air', in: 20, out: 15, net: 5, date: 'Jan 2024' },
        { product: 'AirPods Pro', in: 100, out: 95, net: 5, date: 'Jan 2024' },
        { product: 'iPad Pro', in: 30, out: 18, net: 12, date: 'Jan 2024' }
      ]
    }
  };

  const currentReport = reportData[selectedReport];

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Reports & Analytics</h1>
        <p>Generate insights and export inventory data</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Report Selection */}
        <div className="card">
          <h3 className="card-title">Report Types</h3>
          <div className="report-options">
            <button 
              className={`report-option ${selectedReport === 'summary' ? 'active' : ''}`}
              onClick={() => setSelectedReport('summary')}
            >
              <span className="option-icon">📊</span>
              <span className="option-text">
                <strong>Stock Summary</strong>
                <small>Overview of inventory</small>
              </span>
            </button>
            
            <button 
              className={`report-option ${selectedReport === 'lowStock' ? 'active' : ''}`}
              onClick={() => setSelectedReport('lowStock')}
            >
              <span className="option-icon">⚠️</span>
              <span className="option-text">
                <strong>Low Stock</strong>
                <small>Items needing restock</small>
              </span>
            </button>
            
            <button 
              className={`report-option ${selectedReport === 'movement' ? 'active' : ''}`}
              onClick={() => setSelectedReport('movement')}
            >
              <span className="option-icon">🔄</span>
              <span className="option-text">
                <strong>Stock Movement</strong>
                <small>In/Out tracking</small>
              </span>
            </button>
          </div>

          <div className="export-options">
            <h4>Export Options</h4>
            <div className="export-buttons">
              <button className="btn btn-outline">📄 CSV</button>
              <button className="btn btn-outline">📊 Excel</button>
              <button className="btn btn-outline">📑 PDF</button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="card col-span-3">
          <div className="report-header">
            <h2>{currentReport.title}</h2>
            <div className="report-actions">
              <button className="btn btn-primary">🖨️ Print</button>
              <button className="btn btn-success">📥 Export</button>
            </div>
          </div>

          <div className="report-content">
            {selectedReport === 'summary' && (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Total Products</th>
                      <th>Total Value</th>
                      <th>Low Stock Items</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReport.data.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{item.category}</strong>
                        </td>
                        <td>{item.totalProducts}</td>
                        <td>${item.totalValue.toLocaleString()}</td>
                        <td>
                          <span className={item.lowStock > 0 ? 'text-warning' : 'text-success'}>
                            {item.lowStock}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${item.lowStock > 5 ? 'warning' : 'success'}`}>
                            {item.lowStock > 5 ? 'Attention Needed' : 'Healthy'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedReport === 'lowStock' && (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Current Stock</th>
                      <th>Minimum Stock</th>
                      <th>Supplier</th>
                      <th>Urgency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReport.data.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{item.product}</strong>
                        </td>
                        <td>
                          <span className="text-danger">{item.currentStock}</span>
                        </td>
                        <td>{item.minStock}</td>
                        <td>{item.supplier}</td>
                        <td>
                          <span className={`urgency-badge ${item.currentStock <= 5 ? 'high' : 'medium'}`}>
                            {item.currentStock <= 5 ? 'High' : 'Medium'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedReport === 'movement' && (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Stock In</th>
                      <th>Stock Out</th>
                      <th>Net Change</th>
                      <th>Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentReport.data.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{item.product}</strong>
                        </td>
                        <td className="text-success">+{item.in}</td>
                        <td className="text-danger">-{item.out}</td>
                        <td>
                          <span className={item.net >= 0 ? 'text-success' : 'text-danger'}>
                            {item.net >= 0 ? '+' : ''}{item.net}
                          </span>
                        </td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Report Summary */}
          <div className="report-summary">
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-label">Total Records</span>
                <span className="stat-value">{currentReport.data.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Generated</span>
                <span className="stat-value">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reports-page {
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

        .card-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--dark-color);
          margin-bottom: 1rem;
        }

        .report-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .report-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .report-option:hover {
          border-color: var(--primary-color);
          background: rgba(59, 130, 246, 0.05);
        }

        .report-option.active {
          border-color: var(--primary-color);
          background: rgba(59, 130, 246, 0.1);
        }

        .option-icon {
          font-size: 1.5rem;
        }

        .option-text {
          display: flex;
          flex-direction: column;
        }

        .option-text strong {
          font-weight: 600;
          color: var(--dark-color);
        }

        .option-text small {
          font-size: 0.75rem;
          color: var(--gray-color);
        }

        .export-options h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-color);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .export-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .report-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--dark-color);
          margin: 0;
        }

        .report-actions {
          display: flex;
          gap: 0.75rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge.success {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success-color);
        }

        .status-badge.warning {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning-color);
        }

        .urgency-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .urgency-badge.high {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger-color);
        }

        .urgency-badge.medium {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning-color);
        }

        .report-summary {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .summary-stats {
          display: flex;
          gap: 2rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--gray-color);
        }

        .stat-value {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--dark-color);
        }

        .col-span-3 {
          grid-column: span 3;
        }

        @media (max-width: 1024px) {
          .grid.grid-cols-4 {
            grid-template-columns: 1fr;
          }
          
          .col-span-3 {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .report-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .summary-stats {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Reports;