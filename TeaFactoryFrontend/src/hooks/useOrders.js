import { useState, useEffect } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);

  // Simple ID generator (moved from orderUtils)
  const generateOrderId = () => {
    return 'ORD-' + Date.now();
  };

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: generateOrderId(),
      ...orderData,
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrder = (orderId, updatedData) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, ...updatedData } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  return {
    orders,
    addOrder,
    updateOrder,
    deleteOrder
  };
};