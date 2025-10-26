package com.teafactory.app.services.LeafIntake;

import com.teafactory.app.entities.LeafIntake;
import java.util.List;

public interface ILeafIntakeService {
    LeafIntake saveIntake(LeafIntake intake);
    List<LeafIntake> getAllIntakes();
    LeafIntake getIntakeById(Long id);
    void deleteIntake(Long id);
}
