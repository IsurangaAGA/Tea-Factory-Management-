import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-content">
      <h2 className="cart-header">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <div className="cart-item-controls">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="remove-item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-total">
            <div className="total">Total: ${total.toFixed(2)}</div>
            <button
              onClick={onCheckout}
              className="checkout-btn"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;