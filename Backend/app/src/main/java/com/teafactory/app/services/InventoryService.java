package com.teafactory.app.services;

import com.teafactory.app.entities.Inventory;
import com.teafactory.app.repositories.InventoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // ✅ CREATE
    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // ✅ READ ALL
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    // ✅ READ BY ID
    public Inventory getInventoryById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found with id " + id));
    }

    // ✅ UPDATE
    public Inventory updateInventory(Long id, Inventory payload) {
        Inventory existing = inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found with id " + id));

        existing.setSku(payload.getSku());
        existing.setName(payload.getName());
        existing.setDescription(payload.getDescription());
        existing.setPrice(payload.getPrice());
        existing.setQuantity(payload.getQuantity());
        existing.setReorderLevel(payload.getReorderLevel());
        existing.setType(payload.getType());
        existing.setSupplier(payload.getSupplier());
        existing.setItemMaster(payload.getItemMaster());

        return inventoryRepository.save(existing);
    }

    // ✅ DELETE
    public void deleteInventory(Long id) {
        Inventory existing = inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found with id " + id));
        inventoryRepository.delete(existing);
    }

    // ✅ NEW: Dashboard data (Story 7)
    public Map<String, Object> getDashboardData() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalTeaStock", inventoryRepository.sumQuantityByType("Tea"));
        data.put("totalCinnamonStock", inventoryRepository.sumQuantityByType("Cinnamon"));
        data.put("lowStockCount", inventoryRepository.countByQuantityLessThanEqual());
        data.put("totalItems", inventoryRepository.count());
        return data;
    }

    // ✅ NEW: Inventory History (Story 8)
    public List<Map<String, Object>> getInventoryHistory() {
        List<Inventory> all = inventoryRepository.findAll();
        List<Map<String, Object>> history = new ArrayList<>();

        for (Inventory inv : all) {
            Map<String, Object> record = new HashMap<>();
            record.put("sku", inv.getSku());
            record.put("name", inv.getName());
            record.put("type", inv.getType());
            record.put("quantity", inv.getQuantity());
            record.put("reorderLevel", inv.getReorderLevel());
            record.put("supplier", inv.getSupplier() != null ? inv.getSupplier().getName() : "N/A");
            record.put("itemMaster", inv.getItemMaster() != null ? inv.getItemMaster().getName() : "N/A");
            history.add(record);
        }

        return history;
    }
}
