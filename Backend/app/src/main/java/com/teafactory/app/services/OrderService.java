package com.teafactory.app.services;

import com.teafactory.app.models.Order;
import com.teafactory.app.models.Order.DeliveryStatus;
import com.teafactory.app.models.Order.PaymentStatus;
import com.teafactory.app.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Create new order
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get order by ID
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    // Update order
    public Order updateOrder(Long id, Order orderDetails) {
        Optional<Order> optionalOrder = orderRepository.findById(id);

        if (optionalOrder.isPresent()) {
            Order existingOrder = optionalOrder.get();
            existingOrder.setCustomerName(orderDetails.getCustomerName());
            existingOrder.setProduct(orderDetails.getProduct());
            existingOrder.setQuantity(orderDetails.getQuantity());
            existingOrder.setPrice(orderDetails.getPrice());
            existingOrder.setDeliveryStatus(orderDetails.getDeliveryStatus());
            existingOrder.setPaymentStatus(orderDetails.getPaymentStatus());

            return orderRepository.save(existingOrder);
        }
        return null;
    }

    // Delete order
    public boolean deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Get orders by payment status
    public List<Order> getOrdersByPaymentStatus(PaymentStatus paymentStatus) {
        return orderRepository.findByPaymentStatus(paymentStatus);
    }

    // Get orders by delivery status
    public List<Order> getOrdersByDeliveryStatus(DeliveryStatus deliveryStatus) {
        return orderRepository.findByDeliveryStatus(deliveryStatus);
    }

    // Search orders by customer name
    public List<Order> searchOrdersByCustomerName(String customerName) {
        return orderRepository.findByCustomerNameContainingIgnoreCase(customerName);
    }

    // Get pending orders (both payment and delivery pending)
    public List<Order> getPendingOrders() {
        return orderRepository.findPendingOrders();
    }

    // Get top customers by order count
    public List<Object[]> getTopCustomers() {
        return orderRepository.findTopCustomersByOrderCount();
    }
}