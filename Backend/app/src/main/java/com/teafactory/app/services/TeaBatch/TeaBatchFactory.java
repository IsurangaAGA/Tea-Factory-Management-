package com.teafactory.app.services.TeaBatch;

import com.teafactory.app.entities.TeaBatch;
import com.teafactory.app.entities.LeafIntake;
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

        double totalWeight = intakes.stream()
                .mapToDouble(LeafIntake::getWeight)
                .sum();
        batch.setTotalWeight(totalWeight);

        return batch;
    }
}

