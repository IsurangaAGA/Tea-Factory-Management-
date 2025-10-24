import React from 'react';

const OrderSummary = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      
      <div className="summary-items">
        {cartItems.map((item) => (
          <div key={item.id} className="summary-item">
            <div>
              <span>{item.name}</span>
              <span> x{item.quantity}</span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="summary-total">
        <div>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;