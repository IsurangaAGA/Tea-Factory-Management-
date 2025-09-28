import React from 'react';
import OrderTable from '../components/OrderTable';
import OrderForm from '../components/OrderForm';
import { useOrders } from '../hooks/useOrders';

const OrderManagement = () => {
  const { orders, addOrder, updateOrder, deleteOrder } = useOrders();

  return (
    <div className="order-management">
      <header className="header">
        <h1>Order Management</h1>
        <p>Manage customer orders and track payment status</p>
      </header>
      
      <div className="dashboard">
        <div className="stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="number">{orders?.length ?? 0}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Payment</h3>
            <p className="number">{orders?.filter(o => o.payment_status === 'Pending').length ?? 0}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p className="number">{orders?.filter(o => o.delivery_status === 'Delivered').length ?? 0}</p>
          </div>
        </div>

        <div className="content-area">
          <OrderForm onAddOrder={addOrder} />
          <OrderTable 
            orders={orders} 
            onUpdateOrder={updateOrder}
            onDeleteOrder={deleteOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;