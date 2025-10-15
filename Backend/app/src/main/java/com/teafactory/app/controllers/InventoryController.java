package com.teafactory.app.controllers;

import com.teafactory.app.entities.Inventory;
import com.teafactory.app.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "http://localhost:5173") // adjust for your frontend port
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // POST - Create
    @PostMapping
    public Inventory createInventory(@RequestBody Inventory inventory) {
        return inventoryService.createInventory(inventory);
    }

    // GET - All
    @GetMapping
    public List<Inventory> getInventory() {
        return inventoryService.getAllInventory();
    }

    // GET - Single by ID
    @GetMapping("/{id}")
    public Inventory getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    // PUT - Update
    @PutMapping("/{id}")
    public Inventory updateInventory(@PathVariable Long id, @RequestBody Inventory inventory) {
        return inventoryService.updateInventory(id, inventory);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
    }
}