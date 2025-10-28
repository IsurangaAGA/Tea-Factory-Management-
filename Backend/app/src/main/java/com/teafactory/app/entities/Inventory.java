package com.teafactory.app.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private Integer reorderLevel;
    private String type; // Tea or Cinnamon

    // ✅ NEW: link each inventory item to its ItemMaster entry
    @ManyToOne
    @JoinColumn(name = "item_master_id")
    private ItemMaster itemMaster;

    // ✅ (optional) link to supplier if you already use it elsewhere
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Integer getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public ItemMaster getItemMaster() { return itemMaster; }
    public void setItemMaster(ItemMaster itemMaster) { this.itemMaster = itemMaster; }

    public Supplier getSupplier() { return supplier; }
    public void setSupplier(Supplier supplier) { this.supplier = supplier; }
}
