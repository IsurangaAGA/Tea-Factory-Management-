import React, { useState } from 'react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('summary');
  
  const reportData = {
    summary: {
      title: 'Tea Stock Summary Report',
      data: [
        { category: 'Black Tea', totalProducts: 156, totalValue: 1250000, lowStock: 12 },
        { category: 'Green Tea', totalProducts: 89, totalValue: 980000, lowStock: 5 },
        { category: 'White Tea', totalProducts: 45, totalValue: 750000, lowStock: 3 },
        { category: 'Oolong Tea', totalProducts: 78, totalValue: 890000, lowStock: 8 }
      ]
    },
    lowStock: {
      title: 'Low Stock Alert Report',
      data: [
        { product: 'Ceylon Tea Bags (50g)', currentStock: 5, minStock: 10, supplier: 'Local Packaging Co' },
        { product: 'Green Tea Loose Leaf (100g)', currentStock: 8, minStock: 15, supplier: 'Highland Estates' },
        { product: 'Cinnamon Sticks (250g)', currentStock: 3, minStock: 10, supplier: 'Spice Traders Ltd' },
        { product: 'Cardamom Pods (100g)', currentStock: 7, minStock: 12, supplier: 'Ceylon Spices' }
      ]
    },
    movement: {
      title: 'Tea Stock Movement Report',
      data: [
        { product: 'Black Tea Loose Leaf', in: 50, out: 25, net: 25, date: 'Nov 2025' },
        { product: 'Green Tea Bags', in: 20, out: 15, net: 5, date: 'Nov 2025' },
        { product: 'White Tea Premium', in: 100, out: 95, net: 5, date: 'Nov 2025' },
        { product: 'Oolong Tea Special', in: 30, out: 18, net: 12, date: 'Nov 2025' }
      ]
    }
  };

  const currentReport = reportData[selectedReport];

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Reports & Analytics</h1>
        <p>Generate insights and export tea inventory data</p>
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
                <strong>Tea Stock Summary</strong>
                <small>Overview of tea inventory</small>
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
                      <th>Tea Category</th>
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
                        <td>Rs {item.totalValue.toLocaleString()}</td>
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
          animation: fadeIn 0.6s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-header {
          margin-bottom: 2rem;
          position: relative;
        }

        .page-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--dark-color);
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-header p {
          color: var(--gray-color);
          font-size: 1.125rem;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(59, 130, 246, 0.1);
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.08), 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .report-content {
          animation: fadeIn 0.5s ease-in;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--dark-color);
        }

        .form-input, .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #3b82f6;
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
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .report-option::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.5s;
        }

        .report-option:hover::before {
          left: 100%;
        }

        .report-option:hover {
          border-color: #3b82f6;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .report-option.active {
          border-color: #3b82f6;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .report-option.active .option-text strong,
        .report-option.active .option-text small {
          color: white;
        }

        .option-icon {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }

        .report-option:hover .option-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .report-option.active .option-icon {
          animation: bounce 0.6s ease;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
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

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-outline {
          background: white;
          border: 2px solid #e5e7eb;
          color: var(--dark-color);
        }

        .btn-outline:hover {
          background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .btn-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-success:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
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
          display: inline-block;
          transition: all 0.3s ease;
          animation: slideIn 0.5s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .status-badge:hover {
          transform: scale(1.1);
        }

        .status-badge.success {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.1) 100%);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-badge.warning {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%);
          color: #d97706;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .urgency-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: inline-block;
          transition: all 0.3s ease;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .urgency-badge:hover {
          transform: scale(1.1);
          animation: none;
        }

        .urgency-badge.high {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.3);
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
        }

        .urgency-badge.medium {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.1) 100%);
          color: #d97706;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .report-summary {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 2px solid transparent;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #3b82f6, #8b5cf6) border-box;
        }

        .summary-stats {
          display: flex;
          gap: 2rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%);
          transition: all 0.3s ease;
        }

        .stat:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--gray-color);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .col-span-3 {
          grid-column: span 3;
        }

        .report-actions {
          display: flex;
          gap: 0.75rem;
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