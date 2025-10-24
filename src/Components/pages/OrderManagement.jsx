import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../shop/OrderForm';
import OrderSummary from '../shop/OrderSummary';

const OrderManagement = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('teaFactoryCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleOrderSubmit = (customerData) => {
    // Mock API call - in a real app, this would send data to a server
    const orderData = {
      customer: customerData,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      orderDate: new Date().toISOString()
    };

    console.log('Order placed:', orderData);
    
    // Simulate API call delay
    setTimeout(() => {
      setOrderPlaced(true);
      // Clear cart after successful order
      localStorage.removeItem('teaFactoryCart');
      setCartItems([]);
    }, 1000);
  };

  const handleBackToShop = () => {
    navigate('/shop');
  };

  if (orderPlaced) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>
            Thank you for your order. We'll process it and send you a confirmation email shortly.
          </p>
          <button
            onClick={handleBackToShop}
            className="continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-card">
          <h2>Your Cart is Empty</h2>
          <p>
            Add some tea products to your cart before placing an order.
          </p>
          <button
            onClick={handleBackToShop}
            className="go-to-shop"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="mb-8">
          <button
            onClick={handleBackToShop}
            className="back-button"
          >
            ← Back to Shop
          </button>
          <h1>Order Management</h1>
        </div>

        <div className="order-layout">
          <div>
            <OrderForm onSubmit={handleOrderSubmit} />
          </div>
          <div>
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
