package com.teafactory.app.services;

import com.teafactory.app.entities.Inventory;
import com.teafactory.app.entities.ItemMaster;
import com.teafactory.app.repositories.InventoryRepository;
import com.teafactory.app.repositories.ItemMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private InventoryRepository inventoryRepo;
    @Autowired
    private ItemMasterRepository itemMasterRepo;

    /** Collect all dashboard KPIs */
    public Map<String, Object> getDashboardData() {
        Map<String, Object> data = new HashMap<>();

        data.put("totalItems", inventoryRepo.count());
        data.put("lowStock", inventoryRepo.countByQuantityLessThanEqual());
        data.put("teaStock", inventoryRepo.sumQuantityByType("Tea"));
        data.put("cinnamonStock", inventoryRepo.sumQuantityByType("Cinnamon"));

        return data;
    }

    /** Automatically mark item masters that need refill */
    @Transactional
    public void updateRefillStatus() {
        List<Inventory> allItems = inventoryRepo.findAll();
        for (Inventory inv : allItems) {
            if (inv.getQuantity() <= inv.getReorderLevel() && inv.getItemMaster() != null) {
                ItemMaster im = inv.getItemMaster();
                if (!im.isRefillRequired()) {
                    im.setRefillRequired(true);
                    itemMasterRepo.save(im);
                }
            }
        }
    }
}
