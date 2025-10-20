package com.teafactory.app.service.TeaBatch;

import com.teafactory.app.model.TeaBatch;
import com.teafactory.app.model.LeafIntake;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;

@Component
public class TeaBatchFactory {

    public TeaBatch createFromIntakes(List<LeafIntake> intakes, List<Long> intakeIds) {
        TeaBatch batch = new TeaBatch();
        batch.setIntakeIds(intakeIds);
        batch.setBatchDate(LocalDate.now());
        batch.setStatus("Pending");
        return batch;
    }
}

