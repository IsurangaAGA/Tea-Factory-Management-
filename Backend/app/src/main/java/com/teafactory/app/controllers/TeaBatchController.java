package com.teafactory.app.controllers;

import com.teafactory.app.model.BatchStageDetails;
import com.teafactory.app.model.BatchStageDetailsDTO;
import com.teafactory.app.model.TeaBatch;
import com.teafactory.app.service.TeaBatch.ITeaBatchService;
import com.teafactory.app.service.TeaBatch.TeaBatchService;
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
    public ResponseEntity<List<BatchStageDetailsDTO>> getBatchStages(@PathVariable Long batchId) {
        List<BatchStageDetails> stages = teaBatchService.getStageDetails(batchId);
        List<BatchStageDetailsDTO> stageDTOs = stages.stream()
                .map(BatchStageDetailsDTO::new)
                .toList();
        return ResponseEntity.ok(stageDTOs);
    }

    @PostMapping("/{batchId}/stages")
    public ResponseEntity<BatchStageDetailsDTO> saveStageDetails(
            @PathVariable Long batchId,
            @RequestBody BatchStageDetailsDTO stageDetailsDTO) {
        BatchStageDetails stageDetails = stageDetailsDTO.toEntity();
        BatchStageDetails saved = teaBatchService.saveStageDetails(batchId, stageDetails);
        return ResponseEntity.ok(new BatchStageDetailsDTO(saved));
    }

    @GetMapping("/{batchId}/stages/{stageName}")
    public ResponseEntity<BatchStageDetailsDTO> getStageByName(
            @PathVariable Long batchId,
            @PathVariable String stageName) {

        BatchStageDetails stage = teaBatchService.getStageByName(batchId, stageName);
        if (stage == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(new BatchStageDetailsDTO(stage));
    }

    @PutMapping("/{batchId}/stages/{stageId}")
    public ResponseEntity<BatchStageDetailsDTO> updateStageDetails(
            @PathVariable Long batchId,
            @PathVariable Long stageId,
            @RequestBody BatchStageDetailsDTO updatedDetailsDTO) {

        BatchStageDetails existing = teaBatchService.getStageById(stageId);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        // Update existing entity with new data
        existing.setWeight(updatedDetailsDTO.getWeight());
        existing.setResponsible(updatedDetailsDTO.getResponsible());
        existing.setStatus(updatedDetailsDTO.getStatus());
        
        if (updatedDetailsDTO.getStartTime() != null && !updatedDetailsDTO.getStartTime().isEmpty()) {
            existing.setStartTime(java.time.LocalDateTime.parse(updatedDetailsDTO.getStartTime()));
        }
        
        if (updatedDetailsDTO.getEndTime() != null && !updatedDetailsDTO.getEndTime().isEmpty()) {
            existing.setEndTime(java.time.LocalDateTime.parse(updatedDetailsDTO.getEndTime()));
        }

        BatchStageDetails saved = teaBatchService.saveStageDetails(batchId, existing);
        return ResponseEntity.ok(new BatchStageDetailsDTO(saved));
    }


}


