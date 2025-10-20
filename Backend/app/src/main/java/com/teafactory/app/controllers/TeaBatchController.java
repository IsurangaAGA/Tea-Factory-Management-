package com.teafactory.app.controllers;

import com.teafactory.app.model.TeaBatch;
import com.teafactory.app.service.TeaBatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

        import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "http://localhost:5173") // change if different frontend port
public class TeaBatchController {

    @Autowired
    private TeaBatchService batchService;

    @GetMapping
    public List<TeaBatch> getAllBatches() {
        return batchService.getAllBatches();
    }

    @PostMapping
    public TeaBatch createBatch(@RequestBody Map<String, Object> payload) {
        List<Integer> intakeIdsInt = (List<Integer>) payload.get("intakeIds");
        List<Long> intakeIds = intakeIdsInt.stream().map(Long::valueOf).toList();

        return batchService.createBatch(intakeIds);
    }
}

