import { useState, useEffect, useCallback } from 'react';

const mockOrders = [
  {
    id: 1,
    customer_name: 'John Doe',
    product: 'Black Tea',
    quantity: 2,
    price: 15.50,
    delivery_status: 'Pending',
    payment_status: 'Paid',
  },
  {
    id: 2,
    customer_name: 'Jane Smith',
    product: 'Green Tea',
    quantity: 1,
    price: 12.00,
    delivery_status: 'Shipped',
    payment_status: 'Paid',
  },
  {
    id: 3,
    customer_name: 'Peter Jones',
    product: 'Lemon Tea',
    quantity: 5,
    price: 10.00,
    delivery_status: 'Delivered',
    payment_status: 'Completed',
  },
  {
    id: 4,
    customer_name: 'Alice Williams',
    product: 'Black Tea',
    quantity: 3,
    price: 15.50,
    delivery_status: 'Pending',
    payment_status: 'Pending',
  },
];

export const useOrders = () => {
  const [orders, setOrders] = useState(undefined);

  useEffect(() => {
    // Simulate fetching data from an API
    const timer = setTimeout(() => {
      setOrders(mockOrders);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, []);

  const addOrder = useCallback(async (newOrderData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    const newOrder = {
      ...newOrderData,
      id: Date.now(), // Generate a unique ID
    };
    setOrders(prevOrders => [...(prevOrders ?? []), newOrder]);
  }, []);

  const updateOrder = useCallback(async (orderId, updates) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    setOrders(prevOrders =>
      (prevOrders ?? []).map(order =>
        order.id === orderId ? { ...order, ...updates } : order
      )
    );
  }, []);

  const deleteOrder = useCallback(async (orderId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    setOrders(prevOrders => (prevOrders ?? []).filter(order => order.id !== orderId));
  }, []);

  return { orders, addOrder, updateOrder, deleteOrder };
};