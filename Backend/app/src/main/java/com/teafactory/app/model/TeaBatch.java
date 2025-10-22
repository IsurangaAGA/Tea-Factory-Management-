package com.teafactory.app.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tea_batches")
public class TeaBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String batchName;
    private LocalDate batchDate;
    private double totalWeight;
    private String status = "Pending"; // default

    @ElementCollection
    @CollectionTable(name = "batch_intake_ids", joinColumns = @JoinColumn(name = "batch_id"))
    @Column(name = "intake_id")
    private List<Long> intakeIds;

    private LocalDateTime createdAt = LocalDateTime.now();

    public TeaBatch() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBatchName() { return batchName; }
    public void setBatchName(String batchName) { this.batchName = batchName; }

    public LocalDate getBatchDate() { return batchDate; }
    public void setBatchDate(LocalDate batchDate) { this.batchDate = batchDate; }

    public double getTotalWeight() { return totalWeight; }
    public void setTotalWeight(double totalWeight) { this.totalWeight = totalWeight; }

    public List<Long> getIntakeIds() { return intakeIds; }
    public void setIntakeIds(List<Long> intakeIds) { this.intakeIds = intakeIds; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

