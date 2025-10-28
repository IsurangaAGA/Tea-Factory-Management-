package com.teafactory.app.repositories;

import com.teafactory.app.entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    // ✅ Prevent duplicate SKU creation
    boolean existsBySku(String sku);

    // ✅ Count low-stock items
    @Query("SELECT COUNT(i) FROM Inventory i WHERE i.quantity <= i.reorderLevel")
    Long countByQuantityLessThanEqual();

    // ✅ Sum total stock quantity by type (Tea or Cinnamon)
    @Query("SELECT COALESCE(SUM(i.quantity), 0) FROM Inventory i WHERE i.type = :type")
    Integer sumQuantityByType(@Param("type") String type);
}
