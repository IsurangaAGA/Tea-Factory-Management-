package com.teafactory.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.teafactory.app.entities.Supplier;
import com.teafactory.app.services.SupplierService;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "*")
public class SupplierController {

    @Autowired
    private SupplierService service;

    @PostMapping("/")
    public Supplier add(@RequestBody Supplier s){ return service.addSupplier(s); }

    @GetMapping("/")
    public List<Supplier> getAll(){ return service.getAll(); }

    @PutMapping("/{id}")
    public Supplier update(@PathVariable Long id, @RequestBody Supplier s){ return service.update(id,s); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){ service.delete(id); }
}
