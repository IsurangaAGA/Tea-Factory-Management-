package com.teafactory.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.teafactory.app.entities.ItemMaster;
import com.teafactory.app.entities.Supplier;
import com.teafactory.app.repositories.ItemMasterRepository;
import com.teafactory.app.repositories.SupplierRepository;

@Service
public class ItemMasterService {

    @Autowired
    private ItemMasterRepository repo;

    @Autowired
    private SupplierRepository supplierRepo;

    // ✅ Add new item linked to a supplier
    public ItemMaster addItem(ItemMaster item) {
        if (item.getSupplier() != null && item.getSupplier().getId() != null) {
            Supplier supplier = supplierRepo.findById(item.getSupplier().getId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found with ID: " + item.getSupplier().getId()));
            item.setSupplier(supplier);
        } else {
            throw new RuntimeException("Supplier ID is required when creating a product");
        }
        return repo.save(item);
    }

    // ✅ Get all items
    public List<ItemMaster> getAll() {
        return repo.findAll();
    }

    // ✅ Get all items for a given supplier
    public List<ItemMaster> getBySupplier(Long id) {
        return repo.findBySupplier_Id(id);
    }

    // ✅ Get all items by category (Tea / Cinnamon)
    public List<ItemMaster> getByCategory(String category) {
        return repo.findByCategoryIgnoreCase(category);
    }

    // ✅ Get all items by type (Raw / Finished)
    public List<ItemMaster> getByType(String type) {
        return repo.findByTypeIgnoreCase(type);
    }

    // ✅ Delete item by ID
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
