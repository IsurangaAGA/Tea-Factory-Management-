package com.teafactory.app.controllers;

import com.teafactory.app.model.TeaBatch;
import com.teafactory.app.service.TeaBatch.ITeaBatchService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "http://localhost:5173")
public class TeaBatchController {

    private final ITeaBatchService batchService;

    public TeaBatchController(ITeaBatchService batchService) {
        this.batchService = batchService;
    }

    // Get all batches
    @GetMapping
    public List<TeaBatch> getAllBatches() {
        return batchService.getAllBatches();
    }

    // Create new batch
    @PostMapping
    public TeaBatch createBatch(@RequestBody Map<String, Object> payload) {
        List<Integer> intakeIdsInt = (List<Integer>) payload.get("intakeIds");
        List<Long> intakeIds = intakeIdsInt.stream().map(Long::valueOf).toList();

        return batchService.createBatch(intakeIds);
    }
}
