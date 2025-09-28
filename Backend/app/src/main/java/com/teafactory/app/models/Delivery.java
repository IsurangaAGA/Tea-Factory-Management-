package com.teafactory.app.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryId;

    @Column(nullable = false)
    private Long orderId; // Foreign key reference to Order

    @Column(nullable = false)
    private LocalDateTime deliveryDate;

    @Column(nullable = false)
    private LocalDateTime expectedDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryStatus status;

    @Column
    private String assignedDriver;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Constructors
    public Delivery() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = DeliveryStatus.PENDING;
    }

    public Delivery(Long orderId, LocalDateTime expectedDate) {
        this();
        this.orderId = orderId;
        this.expectedDate = expectedDate;
        this.deliveryDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(Long deliveryId) {
        this.deliveryId = deliveryId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getExpectedDate() {
        return expectedDate;
    }

    public void setExpectedDate(LocalDateTime expectedDate) {
        this.expectedDate = expectedDate;
        this.updatedAt = LocalDateTime.now();
    }

    public DeliveryStatus getStatus() {
        return status;
    }

    public void setStatus(DeliveryStatus status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    public String getAssignedDriver() {
        return assignedDriver;
    }

    public void setAssignedDriver(String assignedDriver) {
        this.assignedDriver = assignedDriver;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // toString method for debugging
    @Override
    public String toString() {
        return "Delivery{" +
                "deliveryId=" + deliveryId +
                ", orderId=" + orderId +
                ", deliveryDate=" + deliveryDate +
                ", expectedDate=" + expectedDate +
                ", status=" + status +
                ", assignedDriver='" + assignedDriver + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }

    // equals and hashCode for JPA
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Delivery delivery = (Delivery) o;
        return deliveryId != null && deliveryId.equals(delivery.deliveryId);
    }

    @Override
    public int hashCode() {
        return deliveryId != null ? deliveryId.hashCode() : 0;
    }

    // Inner Enum - Part of the same class
    public enum DeliveryStatus {
        PENDING("Order confirmed, delivery pending"),
        IN_TRANSIT("Package is on the way"),
        DELIVERED("Package delivered successfully"),
        CANCELLED("Delivery cancelled");

        private final String description;

        DeliveryStatus(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }
}