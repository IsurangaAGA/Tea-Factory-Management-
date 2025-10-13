// Generate unique order IDs
export const generateOrderId = () => {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Calculate order total
export const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Payment status options
export const paymentStatuses = [
  'Pending',
  'Paid',
  'Failed',
  'Refunded'
];