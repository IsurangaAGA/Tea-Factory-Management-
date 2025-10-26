package com.teafactory.app.controllers;

import com.teafactory.app.model.BatchStageDetails;
import com.teafactory.app.model.TeaBatch;
import com.teafactory.app.services.TeaBatch.ITeaBatchService;
import com.teafactory.app.services.TeaBatch.TeaBatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "http://localhost:5173")
public class TeaBatchController {

    private final ITeaBatchService batchService;
    private final TeaBatchService teaBatchService; // For stage details

    public TeaBatchController(ITeaBatchService batchService,
                              TeaBatchService teaBatchService) {
        this.batchService = batchService;
        this.teaBatchService = teaBatchService;
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

    // --- New Stage Endpoints ---

    @GetMapping("/{batchId}/stages")
    public ResponseEntity<List<BatchStageDetails>> getBatchStages(@PathVariable Long batchId, String stageName) {
        List<BatchStageDetails> stages = teaBatchService.getStageDetails(batchId, stageName);
        return ResponseEntity.ok(stages);
    }

    @PostMapping("/{batchId}/stages")
    public ResponseEntity<BatchStageDetails> saveStageDetails(
            @PathVariable Long batchId,
            @RequestBody BatchStageDetails stageDetails) {
        BatchStageDetails saved = teaBatchService.saveStageDetails(batchId, stageDetails);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{batchId}/stages/{stageName}")
    public ResponseEntity<BatchStageDetails> getStageByName(
            @PathVariable Long batchId,
            @PathVariable String stageName) {

        BatchStageDetails stage = teaBatchService.getStageByName(batchId, stageName);
        if (stage == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(stage);
    }

    @PutMapping("/{batchId}/stages/{stageId}")
    public ResponseEntity<BatchStageDetails> updateStageDetails(
            @PathVariable Long batchId,
            @PathVariable Long stageId,
            @RequestBody BatchStageDetails updatedDetails) {

        BatchStageDetails existing = teaBatchService.getStageById(stageId);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setWeight(updatedDetails.getWeight());
        existing.setResponsible(updatedDetails.getResponsible());
        existing.setStatus(updatedDetails.getStatus());
        existing.setStartTime(updatedDetails.getStartTime());
        existing.setEndTime(updatedDetails.getEndTime());

        BatchStageDetails saved = teaBatchService.saveStageDetails(batchId, existing);
        return ResponseEntity.ok(saved);
    }

    // Get all stages for a batch (used for the popup table)
    @GetMapping("/{batchId}/stages/all")
    public ResponseEntity<List<BatchStageDetails>> getAllStagesForBatch(@PathVariable Long batchId) {
        List<BatchStageDetails> stages = teaBatchService.getAllStagesForBatch(batchId);
        return ResponseEntity.ok(stages);
    }



}


