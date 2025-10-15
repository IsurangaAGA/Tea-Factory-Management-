package com.teafactory.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teafactory.app.entities.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {}
