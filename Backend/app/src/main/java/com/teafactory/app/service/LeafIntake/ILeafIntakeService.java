package com.teafactory.app.service.LeafIntake;

import com.teafactory.app.model.LeafIntake;
import java.util.List;

public interface ILeafIntakeService {
    LeafIntake saveIntake(LeafIntake intake);
    List<LeafIntake> getAllIntakes();
    LeafIntake getIntakeById(Long id);
    void deleteIntake(Long id);
}
