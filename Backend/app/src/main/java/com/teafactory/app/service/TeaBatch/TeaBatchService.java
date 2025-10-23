package com.teafactory.app.service.TeaBatch;

import com.teafactory.app.model.BatchStageDetails;
import com.teafactory.app.model.TeaBatch;
import com.teafactory.app.repository.BatchStageDetailsRepository;
import com.teafactory.app.repository.LeafIntakeRepository;
import com.teafactory.app.repository.TeaBatchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TeaBatchService implements ITeaBatchService {

    private final TeaBatchRepository batchRepo;
    private final LeafIntakeRepository intakeRepo;
    private final TeaBatchFactory batchFactory;
    private final BatchStageDetailsRepository stageRepo;

    public TeaBatchService(TeaBatchRepository batchRepo,
                           LeafIntakeRepository intakeRepo,
                           TeaBatchFactory batchFactory,
                           BatchStageDetailsRepository stageRepo) {
        this.batchRepo = batchRepo;
        this.intakeRepo = intakeRepo;
        this.batchFactory = batchFactory;
        this.stageRepo = stageRepo;
    }

    @Override
    public List<TeaBatch> getAllBatches() {
        return batchRepo.findAll();
    }

    @Override
    public TeaBatch createBatch(List<Long> intakeIds) {
        var intakes = intakeRepo.findAllById(intakeIds);
        TeaBatch batch = batchFactory.createFromIntakes(intakes, intakeIds);

        TeaBatch saved = batchRepo.save(batch);
        saved.setBatchName("Batch-" + saved.getId());
        return batchRepo.save(saved);
    }

    // --- New Stage Methods ---

    public List<BatchStageDetails> getStageDetails(Long batchId, String stageName) {
        return stageRepo.findByBatchIdAndStageNameOrderByCreatedAtDesc(batchId, stageName);
    }

    @Transactional
    public BatchStageDetails saveStageDetails(Long batchId, BatchStageDetails stageDetails) {
        TeaBatch batch = batchRepo.findById(batchId)
                .orElseThrow(() -> new RuntimeException("Batch not found: " + batchId));

        stageDetails.setBatch(batch);
        batch.setStatus(stageDetails.getStatus()); // update batch overall status
        batchRepo.save(batch);

        return stageRepo.save(stageDetails);
    }

    public BatchStageDetails getStageByName(Long batchId, String stageName) {
        List<BatchStageDetails> stages = stageRepo.findByBatchIdAndStageNameOrderByCreatedAtDesc(batchId, stageName);

        if (stages.isEmpty()) return null;

        // return the latest one (most recently created)
        return stages.get(0);
    }


    public BatchStageDetails getStageById(Long id) {
        return stageRepo.findById(id).orElse(null);
    }

    public List<BatchStageDetails> getAllStagesForBatch(Long batchId) {
        return stageRepo.findByBatchIdOrderByCreatedAtDesc(batchId);
    }



}
