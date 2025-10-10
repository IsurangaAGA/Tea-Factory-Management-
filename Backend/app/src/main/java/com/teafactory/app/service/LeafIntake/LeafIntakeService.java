package com.teafactory.app.service.LeafIntake;

import com.teafactory.app.model.LeafIntake;
import com.teafactory.app.repository.LeafIntakeRepository;
import com.teafactory.app.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeafIntakeService implements ILeafIntakeService {

    private final LeafIntakeRepository leafIntakeRepository;

    @Autowired
    public LeafIntakeService(LeafIntakeRepository leafIntakeRepository) {
        this.leafIntakeRepository = leafIntakeRepository;
    }

    @Override
    public LeafIntake saveIntake(LeafIntake intake) {
        validateIntake(intake);
        return leafIntakeRepository.save(intake);
    }

    @Override
    public List<LeafIntake> getAllIntakes() {
        return leafIntakeRepository.findAll();
    }

    @Override
    public LeafIntake getIntakeById(Long id) {
        return leafIntakeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leaf intake not found with id: " + id));
    }

    @Override
    public void deleteIntake(Long id) {
        if (!leafIntakeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Leaf intake not found with id: " + id);
        }
        leafIntakeRepository.deleteById(id);
    }

    // Business validation logic
    private void validateIntake(LeafIntake intake) {
        if (intake.getWeight() <= 0) {
            throw new IllegalArgumentException("Weight must be greater than zero.");
        }
        if (intake.getSupplierName() == null || intake.getSupplierName().isEmpty()) {
            throw new IllegalArgumentException("Supplier name is required.");
        }
        if (intake.getDate() == null) {
            throw new IllegalArgumentException("Date is required.");
        }
        // Add more rules as needed
    }
}
