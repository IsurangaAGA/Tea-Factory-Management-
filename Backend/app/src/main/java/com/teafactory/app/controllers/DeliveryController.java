package com.teafactory.app.controllers;

import com.teafactory.app.models.Delivery;
import com.teafactory.app.models.Delivery.DeliveryStatus;
import com.teafactory.app.services.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = "*")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    // Create new delivery
    @PostMapping
    public ResponseEntity<?> createDelivery(@RequestBody Delivery delivery) {
        try {
            Delivery createdDelivery = deliveryService.createDelivery(delivery);
            return new ResponseEntity<>(createdDelivery, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating delivery", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all deliveries
    @GetMapping
    public ResponseEntity<List<Delivery>> getAllDeliveries() {
        List<Delivery> deliveries = deliveryService.getAllDeliveries();
        return new ResponseEntity<>(deliveries, HttpStatus.OK);
    }

    // Get delivery by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getDeliveryById(@PathVariable Long id) {
        Optional<Delivery> delivery = deliveryService.getDeliveryById(id);

        if (delivery.isPresent()) {
            return new ResponseEntity<>(delivery.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Delivery not found", HttpStatus.NOT_FOUND);
        }
    }

    // Get delivery by order ID
    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getDeliveryByOrderId(@PathVariable Long orderId) {
        Optional<Delivery> delivery = deliveryService.getDeliveryByOrderId(orderId);

        if (delivery.isPresent()) {
            return new ResponseEntity<>(delivery.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Delivery not found for order ID: " + orderId, HttpStatus.NOT_FOUND);
        }
    }

    // Update delivery
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDelivery(@PathVariable Long id, @RequestBody Delivery delivery) {
        try {
            Delivery updatedDelivery = deliveryService.updateDelivery(id, delivery);
            return new ResponseEntity<>(updatedDelivery, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating delivery", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Assign driver to delivery
    @PatchMapping("/{id}/assign-driver")
    public ResponseEntity<?> assignDriver(@PathVariable Long id, @RequestBody String driverName) {
        try {
            Delivery updatedDelivery = deliveryService.assignDriver(id, driverName);
            return new ResponseEntity<>(updatedDelivery, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Update delivery status
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateDeliveryStatus(@PathVariable Long id, @RequestBody DeliveryStatus status) {
        try {
            Delivery updatedDelivery = deliveryService.updateDeliveryStatus(id, status);
            return new ResponseEntity<>(updatedDelivery, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Delete delivery
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDelivery(@PathVariable Long id) {
        boolean deleted = deliveryService.deleteDelivery(id);

        if (deleted) {
            return new ResponseEntity<>("Delivery deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Delivery not found", HttpStatus.NOT_FOUND);
        }
    }

    // Get deliveries by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Delivery>> getDeliveriesByStatus(@PathVariable DeliveryStatus status) {
        List<Delivery> deliveries = deliveryService.getDeliveriesByStatus(status);
        return new ResponseEntity<>(deliveries, HttpStatus.OK);
    }

    // Get deliveries by driver
    @GetMapping("/driver/{driverName}")
    public ResponseEntity<List<Delivery>> getDeliveriesByDriver(@PathVariable String driverName) {
        List<Delivery> deliveries = deliveryService.getDeliveriesByDriver(driverName);
        return new ResponseEntity<>(deliveries, HttpStatus.OK);
    }

    // Get overdue deliveries
    @GetMapping("/overdue")
    public ResponseEntity<List<Delivery>> getOverdueDeliveries() {
        List<Delivery> overdueDeliveries = deliveryService.getOverdueDeliveries();
        return new ResponseEntity<>(overdueDeliveries, HttpStatus.OK);
    }
}
