package com.teafactory.app.service;

import com.teafactory.app.entities.Order;
import com.teafactory.app.entities.OrderItem;
import com.teafactory.app.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional(readOnly = true)
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Order findById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with id: " + id));
    }

    public Order create(Order order) {
        order.setId(null);
        syncItems(order);
        return orderRepository.save(order);
    }

    public Order update(Long id, Order payload) {
        Order existing = findById(id);
        existing.setCustomerName(payload.getCustomerName());
        existing.setCustomerPhone(payload.getCustomerPhone());
        existing.setCustomerAddress(payload.getCustomerAddress());
        existing.setTotal(payload.getTotal());
        existing.setItems(payload.getItems());
        syncItems(existing);
        return orderRepository.save(existing);
    }

    public void delete(Long id) {
        Order existing = findById(id);
        orderRepository.delete(existing);
    }

    private void syncItems(Order order) {
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
            }
        }
    }
}

