package com.teafactory.app.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "po_items")
public class POItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;
    private Double unitPrice;

    @ManyToOne
    @JoinColumn(name = "item_master_id")
    private ItemMaster item;

    @ManyToOne
    @JoinColumn(name = "po_id")
    private PurchaseOrder purchaseOrder;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }

    public ItemMaster getItem() { return item; }
    public void setItem(ItemMaster item) { this.item = item; }

    public PurchaseOrder getPurchaseOrder() { return purchaseOrder; }
    public void setPurchaseOrder(PurchaseOrder purchaseOrder) { this.purchaseOrder = purchaseOrder; }
}
