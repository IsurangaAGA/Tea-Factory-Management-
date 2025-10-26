package com.teafactory.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teafactory.app.model.LeafIntake;

public interface LeafIntakeRepository extends JpaRepository<LeafIntake, Long> {
}

