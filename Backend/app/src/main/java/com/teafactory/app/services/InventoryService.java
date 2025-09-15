package com.teafactory.app.services;

import com.teafactory.app.entities.Inventory;
import com.teafactory.app.repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public Inventory createInventory(Inventory inventory) {
        if (inventoryRepository.existsBySku(inventory.getSku())) {
            throw new IllegalArgumentException("SKU already exists!");
        }
        return inventoryRepository.save(inventory);
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
}