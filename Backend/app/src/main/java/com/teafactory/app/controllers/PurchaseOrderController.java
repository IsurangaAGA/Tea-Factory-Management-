package com.teafactory.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.teafactory.app.entities.PurchaseOrder;
import com.teafactory.app.services.PurchaseOrderService;

@RestController
@RequestMapping("/api/purchase-orders")
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderService service;

    @PostMapping("/")
    public PurchaseOrder create(@RequestBody PurchaseOrder po) {
        return service.createPO(po);
    }

    @GetMapping("/")
    public List<PurchaseOrder> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public PurchaseOrder getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
