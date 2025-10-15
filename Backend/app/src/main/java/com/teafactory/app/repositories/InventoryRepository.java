package com.teafactory.app.repositories;

import com.teafactory.app.entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    boolean existsBySku(String sku);
}