package com.teafactory.app.controllers;

import com.teafactory.app.entities.LeafIntake;
import com.teafactory.app.services.LeafIntake.ILeafIntakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/intakes")
public class LeafIntakeController {

    private final ILeafIntakeService leafIntakeService;

    @Autowired
    public LeafIntakeController(ILeafIntakeService leafIntakeService) {
        this.leafIntakeService = leafIntakeService;
    }

    @PostMapping
    public LeafIntake saveIntake(@RequestBody LeafIntake intake) {
        return leafIntakeService.saveIntake(intake);
    }

    @GetMapping
    public List<LeafIntake> getAllIntakes() {
        return leafIntakeService.getAllIntakes();
    }

    @GetMapping("/{id}")
    public LeafIntake getIntakeById(@PathVariable Long id) {
        return leafIntakeService.getIntakeById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteIntake(@PathVariable Long id) {
        leafIntakeService.deleteIntake(id);
    }
}
