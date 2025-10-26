package com.teafactory.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teafactory.app.entities.LeafIntake;

public interface LeafIntakeRepository extends JpaRepository<LeafIntake, Long> {
}

