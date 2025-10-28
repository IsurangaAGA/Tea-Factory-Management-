package com.teafactory.app.entities;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "item_master")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ItemMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;         // Item name
    private String category;     // Tea / Cinnamon
    private String type;         // Raw / Finished
    private String description;
    private String status;       // Active / Inactive
    private boolean refillRequired = false;

    // --- Relationships ---

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    @JsonIgnoreProperties({"items"}) // 👈 Ignore supplier.items to avoid recursion
    private Supplier supplier;

    @OneToMany(mappedBy = "itemMaster", fetch = FetchType.LAZY)
    @JsonIgnore // 👈 Ignore inventories when serializing
    private List<Inventory> inventories;

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isRefillRequired() { return refillRequired; }
    public void setRefillRequired(boolean refillRequired) { this.refillRequired = refillRequired; }

    public Supplier getSupplier() { return supplier; }
    public void setSupplier(Supplier supplier) { this.supplier = supplier; }

    public List<Inventory> getInventories() { return inventories; }
    public void setInventories(List<Inventory> inventories) { this.inventories = inventories; }
}
