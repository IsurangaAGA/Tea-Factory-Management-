package com.teafactory.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.teafactory.app.entities.ItemMaster;
import com.teafactory.app.services.ItemMasterService;

@RestController
@RequestMapping("/api/item-master")
@CrossOrigin(origins = "*")
public class ItemMasterController {

    @Autowired
    private ItemMasterService service;

    // ✅ Create new product (linked to supplier)
    @PostMapping("/")
    public ItemMaster add(@RequestBody ItemMaster item) {
        return service.addItem(item);
    }

    // ✅ Get all products
    @GetMapping("/")
    public List<ItemMaster> getAll() {
        return service.getAll();
    }

    // ✅ Get all products for a supplier
    @GetMapping("/supplier/{id}")
    public List<ItemMaster> getBySupplier(@PathVariable Long id) {
        return service.getBySupplier(id);
    }

    // ✅ Get products by category (Tea / Cinnamon)
    @GetMapping("/category/{category}")
    public List<ItemMaster> getByCategory(@PathVariable String category) {
        return service.getByCategory(category);
    }

    // ✅ Get products by type (Raw / Finished)
    @GetMapping("/type/{type}")
    public List<ItemMaster> getByType(@PathVariable String type) {
        return service.getByType(type);
    }

    // ✅ Delete product by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
