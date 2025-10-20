import React from 'react';

const Dashboard = ({ stats }) => {
  const recentActivities = [
    { id: 1, type: 'in', product: 'iPhone 14 Pro', quantity: 50, time: '2 min ago' },
    { id: 2, type: 'out', product: 'MacBook Air', quantity: 5, time: '15 min ago' },
    { id: 3, type: 'in', product: 'AirPods Pro', quantity: 100, time: '1 hour ago' },
    { id: 4, type: 'out', product: 'iPad Pro', quantity: 12, time: '2 hours ago' }
  ];

  const topProducts = [
    { name: 'AirPods Pro', quantity: 245, value: 48900 },
    { name: 'iPhone 14 Pro', quantity: 189, value: 132300 },
    { name: 'MacBook Air', quantity: 78, value: 93600 },
    { name: 'iPad Pro', quantity: 92, value: 73600 }
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
            <div className="kpi-value">158</div>
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
            <div className="kpi-value">${stats.totalStockValue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h2>Recent Activity</h2>
            <button className="btn btn-outline">View All</button>
          </div>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'in' ? '📥' : '📤'}
                </div>
                <div className="activity-details">
                  <div className="activity-title">
                    Stock {activity.type === 'in' ? 'In' : 'Out'}
                  </div>
                  <div className="activity-description">
                    {activity.product} - {activity.quantity} units
                  </div>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="card">
          <div className="card-header">
            <h2>Top Products by Quantity</h2>
          </div>
          <div className="products-list">
            {topProducts.map((product, index) => (
              <div key={product.name} className="product-item">
                <div className="product-rank">#{index + 1}</div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-stats">
                    <span className="quantity">{product.quantity} units</span>
                    <span className="value">${product.value.toLocaleString()}</span>
                  </div>
                </div>
                <div className="product-trend">📈</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="card">
          <div className="card-header">
            <h2>Quick Access</h2>
          </div>
          <div className="quick-access-grid">
            <button className="quick-access-tile">
              <span className="tile-icon">➕</span>
              <span className="tile-label">Add Product</span>
            </button>
            <button className="quick-access-tile">
              <span className="tile-icon">🧾</span>
              <span className="tile-label">New PO</span>
            </button>
            <button className="quick-access-tile">
              <span className="tile-icon">📊</span>
              <span className="tile-label">Stock Report</span>
            </button>
            <button className="quick-access-tile">
              <span className="tile-icon">🔔</span>
              <span className="tile-label">Alerts</span>
            </button>
          </div>
        </div>

        {/* Stock Movement Chart */}
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

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
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

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .activity-item:hover {
          background: rgba(59, 130, 246, 0.05);
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.125rem;
          background: rgba(59, 130, 246, 0.1);
        }

        .activity-details {
          flex: 1;
        }

        .activity-title {
          font-weight: 600;
          color: var(--dark-color);
          margin-bottom: 0.25rem;
        }

        .activity-description {
          font-size: 0.875rem;
          color: var(--gray-color);
        }

        .activity-time {
          font-size: 0.75rem;
          color: var(--gray-color);
          white-space: nowrap;
        }

        .products-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .product-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .product-item:hover {
          background: rgba(59, 130, 246, 0.05);
        }

        .product-rank {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .product-info {
          flex: 1;
        }

        .product-name {
          font-weight: 600;
          color: var(--dark-color);
          margin-bottom: 0.25rem;
        }

        .product-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
        }

        .quantity {
          color: var(--success-color);
          font-weight: 600;
        }

        .value {
          color: var(--gray-color);
        }

        .product-trend {
          font-size: 1.25rem;
        }

        .quick-access-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .quick-access-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem 1rem;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quick-access-tile:hover {
          border-color: var(--primary-color);
          background: rgba(59, 130, 246, 0.05);
          transform: translateY(-2px);
        }

        .tile-icon {
          font-size: 2rem;
        }

        .tile-label {
          font-weight: 600;
          color: var(--dark-color);
          text-align: center;
        }

        .chart-card {
          grid-column: 1 / -1;
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

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          
          .grid-cols-4 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .grid-cols-4 {
            grid-template-columns: 1fr;
          }
          
          .quick-access-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;