package com.teafactory.app.repositories;

import com.teafactory.app.model.BatchStageDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BatchStageDetailsRepository extends JpaRepository<BatchStageDetails, Long> {
    List<BatchStageDetails> findByBatchIdAndStageNameOrderByCreatedAtDesc(Long batchId, String stageName);
    List<BatchStageDetails> findByBatchIdOrderByCreatedAtDesc(Long batchId);
}

