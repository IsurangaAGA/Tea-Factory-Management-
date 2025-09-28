import React, { useState } from 'react';

const OrderTable = ({ orders = [], onUpdateOrder, onDeleteOrder }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleStatusChange = (orderId, field, value) => {
    onUpdateOrder(orderId, { [field]: value });
  };

  const handleDelete = async (orderId) => {
    setDeletingId(orderId);
    await onDeleteOrder(orderId);
    setDeletingId(null);
  };

  const getStatusBadge = (status, type) => {
    const statusClass = {
      'Pending': 'pending',
      'Paid': 'paid',
      'Failed': 'failed',
      'Shipped': 'shipped',
      'Delivered': 'delivered'
    };
    
    return <span className={`status-badge ${statusClass[status]}`}>{status}</span>;
  };

  return (
    <div className="order-table-container">
      <div className="table-header">
        <h2>Orders</h2>
        <div className="table-actions">
          <button className="btn-export">Export CSV</button>
          <button className="btn-refresh">Refresh</button>
        </div>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Delivery Status</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.map(order => (
            <tr key={order.id}>
              <td className="customer-name">{order.customer_name}</td>
              <td>{order.product}</td>
              <td>
                <input 
                  type="number" 
                  value={order.quantity} 
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10) || 0;
                    handleStatusChange(order.id, 'quantity', newQuantity);
                  }}
                  className="quantity-input"
                />
              </td>
              <td>${order.price}</td>
              <td className="total">${(order.quantity * order.price).toFixed(2)}</td>
              <td>
                <select 
                  value={order.delivery_status} 
                  onChange={(e) => handleStatusChange(order.id, 'delivery_status', e.target.value)}
                  className="status-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td>
                <select 
                  value={order.payment_status} 
                  onChange={(e) => handleStatusChange(order.id, 'payment_status', e.target.value)}
                  className="status-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </td>
              <td className="actions">
                <button className="btn-edit">Edit</button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(order.id)}
                  disabled={deletingId === order.id}
                >
                  {deletingId === order.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;