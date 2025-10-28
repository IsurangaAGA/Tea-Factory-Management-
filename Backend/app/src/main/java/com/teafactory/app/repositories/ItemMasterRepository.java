package com.teafactory.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.teafactory.app.entities.ItemMaster;

@Repository
public interface ItemMasterRepository extends JpaRepository<ItemMaster, Long> {

    // 🔹 Find all products for a specific supplier
    List<ItemMaster> findBySupplier_Id(Long supplierId);

    // 🔹 Filter by category (Tea / Cinnamon)
    List<ItemMaster> findByCategoryIgnoreCase(String category);

    // 🔹 Filter by type (Raw / Finished)
    List<ItemMaster> findByTypeIgnoreCase(String type);
}
