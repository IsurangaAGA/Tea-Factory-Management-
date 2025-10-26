package com.teafactory.app.services.TeaBatch;
import com.teafactory.app.model.TeaBatch;
import java.util.List;

public interface ITeaBatchService {
    List<TeaBatch> getAllBatches();
    TeaBatch createBatch(List<Long> intakeIds);
}
