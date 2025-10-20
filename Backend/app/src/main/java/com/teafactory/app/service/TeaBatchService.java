package com.teafactory.app.service;

import com.teafactory.app.model.TeaBatch;
import com.teafactory.app.model.LeafIntake;
import com.teafactory.app.repository.TeaBatchRepository;
import com.teafactory.app.repository.LeafIntakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TeaBatchService {

    @Autowired
    private TeaBatchRepository batchRepo;

    @Autowired
    private LeafIntakeRepository intakeRepo;

    public List<TeaBatch> getAllBatches() {
        return batchRepo.findAll();
    }

    public TeaBatch createBatch(List<Long> intakeIds) {
        List<LeafIntake> intakes = intakeRepo.findAllById(intakeIds);

        double totalWeight = intakes.stream()
                .mapToDouble(LeafIntake::getWeight)
                .sum();

        TeaBatch batch = new TeaBatch();
        batch.setIntakeIds(intakeIds);
        batch.setBatchDate(LocalDate.now());
        batch.setTotalWeight(totalWeight);

        // First save to get the ID assigned by the database
        TeaBatch savedBatch = batchRepo.save(batch);

        // Now set the batch name as "Batch-ID"
        savedBatch.setBatchName("Batch-" + savedBatch.getId());

        // Save again with batchName updated
        return batchRepo.save(savedBatch);
    }

}

