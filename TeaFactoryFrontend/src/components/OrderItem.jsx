import React from 'react';

const OrderItem = ({ order, onUpdate, onDelete }) => {
  const handleStatusChange = (e) => {
    onUpdate(order.id, { paymentStatus: e.target.value });
  };

  return (
    <div className="order-item">
      <div className="order-header">
        <h3>{order.customerName}</h3>
        <span className="order-id">#{order.id}</span>
      </div>
      
      <div className="order-details">
        <p><strong>Product:</strong> {order.productName}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Price:</strong> ${order.price}</p>
        <p><strong>Total:</strong> ${order.price * order.quantity}</p>
      </div>

      <div className="order-actions">
        <select 
          value={order.paymentStatus} 
          onChange={handleStatusChange}
          className={`status-select status-${order.paymentStatus.toLowerCase()}`}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>
        
        <button 
          onClick={() => onDelete(order.id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OrderItem;