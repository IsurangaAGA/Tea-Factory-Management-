import React from 'react';

const OrderList = ({ orders, onDeleteOrder, onUpdateOrder }) => {
  if (orders.length === 0) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
        <h2>Orders</h2>
        <p>No orders yet. Create your first order!</p>
      </div>
    );
  }

  const handleStatusChange = (orderId, newStatus) => {
    onUpdateOrder(orderId, newStatus);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h2>Orders ({orders.length})</h2>
      {orders.map(order => (
        <div key={order.id} style={{ 
          border: '1px solid #eee', 
          padding: '10px', 
          margin: '5px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <strong>{order.customerName}</strong> - {order.productName}
            <br />
            <span>Status: </span>
            <select 
              value={order.status} 
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <button 
            onClick={() => onDeleteOrder(order.id)}
            style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderList;