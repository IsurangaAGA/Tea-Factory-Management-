package com.teafactory.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.teafactory.app.entities.POItem;
import com.teafactory.app.entities.PurchaseOrder;
import com.teafactory.app.entities.Supplier;

import com.teafactory.app.repositories.POItemRepository;
import com.teafactory.app.repositories.PurchaseOrderRepository;
import com.teafactory.app.repositories.SupplierRepository;

@Service
public class PurchaseOrderService {

    @Autowired
    private PurchaseOrderRepository poRepo;

    @Autowired
    private POItemRepository itemRepo;

    @Autowired
    private SupplierRepository supplierRepo;

    // ==========================================
    // ✅ CREATE PURCHASE ORDER
    // ==========================================
    public PurchaseOrder createPO(PurchaseOrder po) {

        // 1️⃣ Load & attach supplier
        if (po.getSupplier() != null && po.getSupplier().getId() != null) {
            Supplier supplier = supplierRepo.findById(po.getSupplier().getId())
                    .orElseThrow(() -> new RuntimeException("Invalid supplier ID"));
            po.setSupplier(supplier);
        }

        // 2️⃣ Attach each item to this purchase order
        if (po.getItems() != null) {
            for (POItem item : po.getItems()) {
                item.setPurchaseOrder(po);
            }
        }

        // 3️⃣ Save PO + items
        return poRepo.save(po);
    }

    // ==========================================
    // ✅ GET ALL — ensure supplier + items load
    // ==========================================
    public List<PurchaseOrder> getAll() {
        List<PurchaseOrder> list = poRepo.findAll();

        // Force-load lazy fields (supplier & items)
        list.forEach(po -> {
            if (po.getSupplier() != null) {
                po.getSupplier().getName();  // load supplier
            }
            if (po.getItems() != null) {
                po.getItems().size();        // load items
            }
        });

        return list;
    }

    // ==========================================
    // ✅ GET SINGLE PO
    // ==========================================
    public PurchaseOrder getById(Long id) {
        PurchaseOrder po = poRepo.findById(id).orElseThrow();

        if (po.getSupplier() != null) {
            po.getSupplier().getName();
        }
        if (po.getItems() != null) {
            po.getItems().size();
        }

        return po;
    }

    // ==========================================
    // ✅ DELETE
    // ==========================================
    public void delete(Long id) {
        poRepo.deleteById(id);
    }
}
