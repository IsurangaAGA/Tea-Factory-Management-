import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../shop/OrderForm';
import OrderSummary from '../shop/OrderSummary';
import { createOrder } from '../../services/api';

const OrderManagement = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('teaFactoryCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleOrderSubmit = async (customerData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Calculate total
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Map cart items to OrderItem structure for Spring Boot
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      // Create Order payload matching Spring Boot Order entity
      const payload = {
        customerName: customerData.name,
        customerPhone: customerData.phone,
        customerAddress: customerData.address,
        total: total,
        items: orderItems
      };

      await createOrder(payload);
      setOrderPlaced(true);
      localStorage.removeItem('teaFactoryCart');
      setCartItems([]);
    } catch (apiError) {
      console.error('Order submission failed', apiError);
      setError('Failed to place the order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}
          <div>
            <OrderForm onSubmit={handleOrderSubmit} isSubmitting={isSubmitting} />
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
