import React from 'react';

const Dashboard = ({ stats }) => {
  const quickActions = [
    { icon: '➕', label: 'Add Product', color: 'primary' },
    { icon: '🧾', label: 'New PO', color: 'success' },
    { icon: '📊', label: 'Stock Report', color: 'warning' },
    { icon: '🔔', label: 'Alerts', color: 'secondary' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Real-time inventory insights and analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 mb-6">
        <div className="kpi-card">
          <div className="kpi-icon primary">📦</div>
          <div className="kpi-content">
            <h3>Total Products</h3>
            <div className="kpi-value">{stats.totalProducts}</div>
          </div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-icon success">📊</div>
          <div className="kpi-content">
            <h3>Stock Quantity</h3>
            <div className="kpi-value">58</div>
          </div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-icon warning">⚠️</div>
          <div className="kpi-content">
            <h3>Low Stock Items</h3>
            <div className="kpi-value">{stats.lowStockItems}</div>
          </div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-icon secondary">💰</div>
          <div className="kpi-content">
            <h3>Total Stock Value</h3>
            <div className="kpi-value">Rs 1050</div>
          </div>
        </div>
      </div>
{/* {stats.totalStockValue.toLocaleString()} */}
      {/* Quick Access as small cards */}
      <div className="mb-6">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button key={index} className={`quick-action-card ${action.color}`}>
              <span className="action-icon">{action.icon}</span>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stock Movement Chart - Full Width */}
      <div className="card chart-card">
        <div className="card-header">
          <h2>Stock Movement</h2>
        </div>
        <div className="chart-placeholder">
          <div className="chart-mock">
            <div className="chart-bars">
              {[65, 45, 75, 55, 85, 35, 95].map((height, i) => (
                <div key={i} className="chart-bar" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>
          <div className="chart-legend">
            <span className="legend-in">Stock In</span>
            <span className="legend-out">Stock Out</span>
          </div>
        </div>
      </div>

      {/* Additional Stats Cards */}
      <div className="grid grid-cols-3 mt-6 gap-6">
        <div className="card">
          <div className="card-header">
            <h2>Inventory Health</h2>
          </div>
          <div className="health-stats">
            <div className="health-item">
              <span className="health-label">Optimal Stock</span>
              <span className="health-value success">72%</span>
            </div>
            <div className="health-item">
              <span className="health-label">Low Stock</span>
              <span className="health-value warning">18%</span>
            </div>
            <div className="health-item">
              <span className="health-label">Out of Stock</span>
              <span className="health-value danger">10%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Product Types</h2>
          </div>
          <div className="type-stats">
            <div className="type-item">
              <span className="type-label">Raw Materials</span>
              <span className="type-value">45%</span>
            </div>
            <div className="type-item">
              <span className="type-label">Finished Goods</span>
              <span className="type-value">55%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Monthly Summary</h2>
          </div>
          <div className="summary-stats">
            <div className="summary-item">
              <span className="summary-label">Stock In</span>
              <span className="summary-value">245 units</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Stock Out</span>
              <span className="summary-value">189 units</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Net Change</span>
              <span className="summary-value success">+56 units</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--dark-color);
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: var(--gray-color);
          font-size: 1.125rem;
        }

        .kpi-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
        }

        .kpi-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .kpi-icon.primary { background: rgba(59, 130, 246, 0.1); color: var(--primary-color); }
        .kpi-icon.success { background: rgba(16, 185, 129, 0.1); color: var(--success-color); }
        .kpi-icon.warning { background: rgba(245, 158, 11, 0.1); color: var(--warning-color); }
        .kpi-icon.secondary { background: rgba(99, 102, 241, 0.1); color: var(--secondary-color); }

        .kpi-content h3 {
          font-size: 0.875rem;
          color: var(--gray-color);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .kpi-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--dark-color);
        }

        /* Quick Actions Small Cards */
        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-color);
          margin-bottom: 1rem;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .quick-action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 1rem;
          border: none;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .quick-action-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .quick-action-card.primary {
          background: linear-gradient(135deg, var(--primary-color), #3b83f6);
          color: white;
        }

        .quick-action-card.success {
          background: linear-gradient(135deg, var(--success-color), #10b981);
          color: white;
        }

        .quick-action-card.warning {
          background: linear-gradient(135deg, var(--warning-color), #f59e0b);
          color: white;
        }

        .quick-action-card.secondary {
          background: linear-gradient(135deg, var(--secondary-color), #6366f1);
          color: white;
        }

        .action-icon {
          font-size: 1.5rem;
        }

        .action-label {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .card-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-color);
          margin: 0;
        }

        .chart-card {
          margin-bottom: 1.5rem;
        }

        .chart-placeholder {
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .chart-mock {
          flex: 1;
          display: flex;
          align-items: end;
          gap: 0.5rem;
          padding: 2rem 1rem 1rem;
          background: linear-gradient(180deg, var(--border-color) 1px, transparent 1px);
          background-size: 100% 20%;
        }

        .chart-bars {
          display: flex;
          align-items: end;
          justify-content: space-around;
          flex: 1;
          gap: 0.5rem;
        }

        .chart-bar {
          flex: 1;
          background: var(--primary-color);
          border-radius: 4px 4px 0 0;
          max-width: 40px;
          transition: all 0.3s ease;
        }

        .chart-bar:nth-child(even) {
          background: var(--secondary-color);
          height: 70% !important;
        }

        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .legend-in::before,
        .legend-out::before {
          content: '';
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 2px;
          margin-right: 0.5rem;
        }

        .legend-in::before { background: var(--primary-color); }
        .legend-out::before { background: var(--secondary-color); }

        /* Additional Stats Styles */
        .health-stats,
        .type-stats,
        .summary-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .health-item,
        .type-item,
        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .health-item:last-child,
        .type-item:last-child,
        .summary-item:last-child {
          border-bottom: none;
        }

        .health-label,
        .type-label,
        .summary-label {
          font-weight: 500;
          color: var(--dark-color);
        }

        .health-value,
        .type-value,
        .summary-value {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .health-value.success,
        .summary-value.success {
          color: var(--success-color);
        }

        .health-value.warning {
          color: var(--warning-color);
        }

        .health-value.danger {
          color: var(--danger-color);
        }

        .type-value {
          color: var(--primary-color);
        }

        .summary-value {
          color: var(--gray-color);
        }

        .mb-6 {
          margin-bottom: 1.5rem;
        }

        .mt-6 {
          margin-top: 1.5rem;
        }

        .grid-cols-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .grid-cols-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .grid-cols-4 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .grid-cols-3 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .quick-actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .grid-cols-4 {
            grid-template-columns: 1fr;
          }
          
          .grid-cols-3 {
            grid-template-columns: 1fr;
          }
          
          .quick-actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;