package com.teafactory.app.controllers;

import com.teafactory.app.entities.Inventory;
import com.teafactory.app.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "http://localhost:5173") // adjust for your frontend
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // ✅ POST - Create new inventory item
    @PostMapping
    public Inventory createInventory(@RequestBody Inventory inventory) {
        return inventoryService.createInventory(inventory);
    }

    // ✅ GET - All inventory
    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    // ✅ GET - Single by ID
    @GetMapping("/{id}")
    public Inventory getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    // ✅ PUT - Update existing record
    @PutMapping("/{id}")
    public Inventory updateInventory(@PathVariable Long id, @RequestBody Inventory inventory) {
        return inventoryService.updateInventory(id, inventory);
    }

    // ✅ DELETE - Remove record
    @DeleteMapping("/{id}")
    public void deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
    }

    // ✅ NEW: Dashboard overview (Tea/Cinnamon totals + low stock)
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        return ResponseEntity.ok(inventoryService.getDashboardData());
    }

    // ✅ NEW: Inventory history endpoint
    @GetMapping("/history")
    public ResponseEntity<List<Map<String, Object>>> getInventoryHistory() {
        return ResponseEntity.ok(inventoryService.getInventoryHistory());
    }
}
