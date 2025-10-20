package com.teafactory.app.service.TeaBatch;

import com.teafactory.app.model.TeaBatch;
import com.teafactory.app.model.LeafIntake;
import com.teafactory.app.repository.TeaBatchRepository;
import com.teafactory.app.repository.LeafIntakeRepository;
import com.teafactory.app.service.TeaBatch.ITeaBatchService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TeaBatchService implements ITeaBatchService {

    private final TeaBatchRepository batchRepo;
    private final LeafIntakeRepository intakeRepo;
    private final TeaBatchFactory batchFactory;

    public TeaBatchService(TeaBatchRepository batchRepo,
                           LeafIntakeRepository intakeRepo,
                           TeaBatchFactory batchFactory) {
        this.batchRepo = batchRepo;
        this.intakeRepo = intakeRepo;
        this.batchFactory = batchFactory;
    }

    @Override
    public List<TeaBatch> getAllBatches() {
        return batchRepo.findAll();
    }

    @Override
    public TeaBatch createBatch(List<Long> intakeIds) {
        List<LeafIntake> intakes = intakeRepo.findAllById(intakeIds);
        TeaBatch batch = batchFactory.createFromIntakes(intakes, intakeIds);

        // Save once to generate ID
        TeaBatch saved = batchRepo.save(batch);

        // Update batch name and resave
        saved.setBatchName("Batch-" + saved.getId());
        return batchRepo.save(saved);
    }
}

