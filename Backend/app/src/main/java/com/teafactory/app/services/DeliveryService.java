package com.teafactory.app.services;

import com.teafactory.app.models.Delivery;
import com.teafactory.app.models.Delivery.DeliveryStatus;
import com.teafactory.app.repositories.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    // Create new delivery
    public Delivery createDelivery(Delivery delivery) {
        // Check if delivery already exists for this order
        Optional<Delivery> existingDelivery = deliveryRepository.findByOrderId(delivery.getOrderId());
        if (existingDelivery.isPresent()) {
            throw new IllegalArgumentException("Delivery already exists for order ID: " + delivery.getOrderId());
        }

        return deliveryRepository.save(delivery);
    }

    // Get all deliveries
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    // Get delivery by ID
    public Optional<Delivery> getDeliveryById(Long id) {
        return deliveryRepository.findById(id);
    }

    // Get delivery by order ID
    public Optional<Delivery> getDeliveryByOrderId(Long orderId) {
        return deliveryRepository.findByOrderId(orderId);
    }

    // Update delivery
    public Delivery updateDelivery(Long id, Delivery updatedDelivery) {
        Optional<Delivery> existingDelivery = deliveryRepository.findById(id);

        if (existingDelivery.isPresent()) {
            Delivery delivery = existingDelivery.get();

            if (updatedDelivery.getExpectedDate() != null) {
                delivery.setExpectedDate(updatedDelivery.getExpectedDate());
            }
            if (updatedDelivery.getStatus() != null) {
                delivery.setStatus(updatedDelivery.getStatus());
            }
            if (updatedDelivery.getAssignedDriver() != null) {
                delivery.setAssignedDriver(updatedDelivery.getAssignedDriver());
            }

            delivery.setUpdatedAt(LocalDateTime.now());
            return deliveryRepository.save(delivery);
        }

        throw new IllegalArgumentException("Delivery not found with ID: " + id);
    }

    // Assign driver to delivery
    public Delivery assignDriver(Long deliveryId, String driverName) {
        Optional<Delivery> deliveryOpt = deliveryRepository.findById(deliveryId);

        if (deliveryOpt.isPresent()) {
            Delivery delivery = deliveryOpt.get();
            delivery.setAssignedDriver(driverName);
            delivery.setStatus(DeliveryStatus.IN_TRANSIT);
            return deliveryRepository.save(delivery);
        }

        throw new IllegalArgumentException("Delivery not found with ID: " + deliveryId);
    }

    // Update delivery status
    public Delivery updateDeliveryStatus(Long deliveryId, DeliveryStatus status) {
        Optional<Delivery> deliveryOpt = deliveryRepository.findById(deliveryId);

        if (deliveryOpt.isPresent()) {
            Delivery delivery = deliveryOpt.get();
            delivery.setStatus(status);

            // If delivered, set delivery date to current time
            if (status == DeliveryStatus.DELIVERED) {
                delivery.setDeliveryDate(LocalDateTime.now());
            }

            return deliveryRepository.save(delivery);
        }

        throw new IllegalArgumentException("Delivery not found with ID: " + deliveryId);
    }

    // Delete delivery
    public boolean deleteDelivery(Long id) {
        if (deliveryRepository.existsById(id)) {
            deliveryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Get deliveries by status
    public List<Delivery> getDeliveriesByStatus(DeliveryStatus status) {
        return deliveryRepository.findByStatus(status);
    }

    // Get deliveries by driver
    public List<Delivery> getDeliveriesByDriver(String driverName) {
        return deliveryRepository.findByAssignedDriver(driverName);
    }

    // Get overdue deliveries
    public List<Delivery> getOverdueDeliveries() {
        return deliveryRepository.findOverdueDeliveries(LocalDateTime.now());
    }
}
