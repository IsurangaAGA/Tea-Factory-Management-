package com.teafactory.app.dto;

import com.teafactory.app.models.Order.DeliveryStatus;
import com.teafactory.app.models.Order.PaymentStatus;
import java.time.LocalDateTime;

public class OrderDto {
    private Long id;
    private String customerName;
    private String product;
    private Integer quantity;
    private Double price;
    private DeliveryStatus deliveryStatus;
    private PaymentStatus paymentStatus;
    private LocalDateTime createdDate;

    // Constructors
    public OrderDto() {}

    public OrderDto(Long id, String customerName, String product, Integer quantity,
                    Double price, DeliveryStatus deliveryStatus, PaymentStatus paymentStatus,
                    LocalDateTime createdDate) {
        this.id = id;
        this.customerName = customerName;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
        this.deliveryStatus = deliveryStatus;
        this.paymentStatus = paymentStatus;
        this.createdDate = createdDate;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getProduct() { return product; }
    public void setProduct(String product) { this.product = product; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public DeliveryStatus getDeliveryStatus() { return deliveryStatus; }
    public void setDeliveryStatus(DeliveryStatus deliveryStatus) { this.deliveryStatus = deliveryStatus; }

    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
}
