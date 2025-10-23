package com.teafactory.app.repository;

import com.teafactory.app.model.BatchStageDetails;
import com.teafactory.app.model.TeaBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BatchStageDetailsRepository extends JpaRepository<BatchStageDetails, Long> {
    List<BatchStageDetails> findByBatchIdOrderByCreatedAt(Long batchId);
    BatchStageDetails findByBatchIdAndStageName(Long batchId, String stageName);
}
