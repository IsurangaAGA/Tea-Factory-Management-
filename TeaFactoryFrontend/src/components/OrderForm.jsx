import React, { useState } from 'react';

const OrderForm = ({ onAddOrder }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    product: 'Black Tea',
    quantity: 1,
    price: 0,
    delivery_status: 'Pending',
    payment_status: 'Pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.customer_name && formData.product) {
      setIsSubmitting(true);
      await onAddOrder(formData);
      setIsSubmitting(false);
      setFormData({
        customer_name: '',
        product: 'Black Tea',
        quantity: 1,
        price: 0,
        delivery_status: 'Pending',
        payment_status: 'Pending'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
    });
  };

  return (
    <div className="order-form">
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Customer Name *</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Product *</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
            >
              <option value="Black Tea">Black Tea</option>
              <option value="Green Tea">Green Tea</option>
              <option value="Lemon Tea">Lemon Tea</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Delivery Status</label>
            <select
              name="delivery_status"
              value={formData.delivery_status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Payment Status</label>
            <select
              name="payment_status"
              value={formData.payment_status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting && <div className="spinner"></div>}
          {isSubmitting ? 'Creating...' : 'Create Order'}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;