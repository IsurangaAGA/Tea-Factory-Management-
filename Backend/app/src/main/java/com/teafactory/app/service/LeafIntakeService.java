package com.teafactory.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.teafactory.app.repository.LeafIntakeRepository;
import com.teafactory.app.model.LeafIntake;

import java.util.List;

@Service
public class LeafIntakeService {

    @Autowired
    private LeafIntakeRepository leafIntakeRepository;

    public LeafIntake saveIntake(LeafIntake intake) {
        return leafIntakeRepository.save(intake);
    }

    public List<LeafIntake> getAllIntakes() {
        return leafIntakeRepository.findAll();
    }

    public LeafIntake getIntakeById(Long id) {
        return leafIntakeRepository.findById(id).orElse(null);
    }

    public void deleteIntake(Long id) {
        leafIntakeRepository.deleteById(id);
    }
}

