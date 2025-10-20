package com.teafactory.app.repository;

import com.teafactory.app.model.TeaBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeaBatchRepository extends JpaRepository<TeaBatch, Long> {
}
