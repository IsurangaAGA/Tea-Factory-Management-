package com.teafactory.app.services;

import com.teafactory.app.entities.Inventory;
import com.teafactory.app.repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // CREATE
    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // READ ALL
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    // READ BY ID
    public Inventory getInventoryById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found with id " + id));
    }

    // UPDATE
    public Inventory updateInventory(Long id, Inventory payload) {
        Inventory existing = inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found with id " + id));

        // update fields that exist in Inventory entity
        existing.setSku(payload.getSku());
        existing.setName(payload.getName());
        existing.setDescription(payload.getDescription());
        existing.setPrice(payload.getPrice());
        existing.setQuantity(payload.getQuantity());
        existing.setReorderLevel(payload.getReorderLevel());

        return inventoryRepository.save(existing);
    }

    // DELETE
    public void deleteInventory(Long id) {
        Inventory existing = inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found with id " + id));
        inventoryRepository.delete(existing);
    }
}
