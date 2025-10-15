package com.teafactory.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teafactory.app.entities.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {}
