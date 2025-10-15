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

    @PostMapping("/")
    public ItemMaster add(@RequestBody ItemMaster i){ return service.addItem(i); }

    @GetMapping("/")
    public List<ItemMaster> getAll(){ return service.getAll(); }

    @GetMapping("/supplier/{id}")
    public List<ItemMaster> getBySupplier(@PathVariable Long id){ return service.getBySupplier(id); }

    @GetMapping("/category/{category}")
    public List<ItemMaster> getByCategory(@PathVariable String category){ return service.getByCategory(category); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){ service.delete(id); }
}
