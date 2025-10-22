package com.teafactory.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teafactory.app.entities.POItem;

public interface POItemRepository extends JpaRepository<POItem, Long> {}
