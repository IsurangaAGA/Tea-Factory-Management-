package com.teafactory.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.teafactory.app.entities.*;
import com.teafactory.app.repositories.*;

@Service
public class PurchaseOrderService {

    @Autowired
    private PurchaseOrderRepository poRepo;

    @Autowired
    private POItemRepository itemRepo;

    // ✅ Fixed: getItems() now works because entity has proper getter
    public PurchaseOrder createPO(PurchaseOrder po) {
        if (po.getItems() != null) {
            po.getItems().forEach(i -> i.setPurchaseOrder(po));
        }
        return poRepo.save(po);
    }

    public List<PurchaseOrder> getAll() {
        return poRepo.findAll();
    }

    public PurchaseOrder getById(Long id) {
        return poRepo.findById(id).orElseThrow();
    }

    public void delete(Long id) {
        poRepo.deleteById(id);
    }
}
