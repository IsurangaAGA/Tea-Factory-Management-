package com.teafactory.app.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public class BatchStageDetailsDTO {
    private Long id;
    private String stageName;
    private Double weight;
    private String responsible;
    private String status;
    private String startTime;
    private String endTime;

    // Default constructor
    public BatchStageDetailsDTO() {}

    // Constructor from entity
    public BatchStageDetailsDTO(BatchStageDetails entity) {
        this.id = entity.getId();
        this.stageName = entity.getStageName();
        this.weight = entity.getWeight();
        this.responsible = entity.getResponsible();
        this.status = entity.getStatus();
        this.startTime = entity.getStartTime() != null ? entity.getStartTime().toString() : null;
        this.endTime = entity.getEndTime() != null ? entity.getEndTime().toString() : null;
    }

    // Convert to entity
    public BatchStageDetails toEntity() {
        BatchStageDetails entity = new BatchStageDetails();
        entity.setId(this.id);
        entity.setStageName(this.stageName);
        entity.setWeight(this.weight);
        entity.setResponsible(this.responsible);
        entity.setStatus(this.status);
        
        if (this.startTime != null && !this.startTime.isEmpty()) {
            entity.setStartTime(LocalDateTime.parse(this.startTime));
        }
        
        if (this.endTime != null && !this.endTime.isEmpty()) {
            entity.setEndTime(LocalDateTime.parse(this.endTime));
        }
        
        return entity;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStageName() { return stageName; }
    public void setStageName(String stageName) { this.stageName = stageName; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public String getResponsible() { return responsible; }
    public void setResponsible(String responsible) { this.responsible = responsible; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
}
