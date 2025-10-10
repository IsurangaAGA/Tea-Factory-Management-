package com.teafactory.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.teafactory.app.service.LeafIntakeService;
import com.teafactory.app.model.LeafIntake;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/intakes")
public class LeafIntakeController {

    @Autowired
    private LeafIntakeService leafIntakeService;

    // Save intake
    @PostMapping
    public LeafIntake saveIntake(@RequestBody LeafIntake intake) {
        return leafIntakeService.saveIntake(intake);
    }

    // Get all
    @GetMapping
    public List<LeafIntake> getAllIntakes() {
        return leafIntakeService.getAllIntakes();
    }

    // Get by ID
    @GetMapping("/{id}")
    public LeafIntake getIntakeById(@PathVariable Long id) {
        return leafIntakeService.getIntakeById(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void deleteIntake(@PathVariable Long id) {
        leafIntakeService.deleteIntake(id);
    }
}

