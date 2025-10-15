package com.teafactory.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.teafactory.app.entities.ItemMaster;

public interface ItemMasterRepository extends JpaRepository<ItemMaster, Long> {
    List<ItemMaster> findBySupplier_Id(Long supplierId);
    List<ItemMaster> findByCategory(String category);
}
