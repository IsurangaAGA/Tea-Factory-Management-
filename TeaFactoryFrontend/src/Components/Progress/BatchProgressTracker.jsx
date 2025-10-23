import React, { useState } from 'react';
import BatchDetailsForm from './BatchDetailsForm';
import BatchStageDetailsTable from './BatchStageDetailsTable'
import './BatchProgressTracker.css';

// --- Sub-Component: ProgressItem (renders one batch's progress) ---
const ProgressItem = ({ batch, teaStages, onClick }) => {
  const { name, progress } = batch;

  // Find the corresponding stage object to get its color
  const currentStage = teaStages.find(stage => stage.name === batch.stage);

  // Determine the color
  let progressColor = '#FF5783';
  if (currentStage) progressColor = currentStage.color;
  if (progress === 100) progressColor = '#8BC34A'; // Green for 100% completion

  // Convert hex to rgba for icon background
  const hexToRgba = (hex, alpha = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="progress-item"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Icon Area */}
      <div
        className="progress-icon-wrapper"
        style={{ backgroundColor: hexToRgba(progressColor) }}
      >
        <span style={{ fontSize: '24px' }} role="img" aria-label="tea leaf">
          🍃
        </span>
      </div>

      {/* Content Area */}
      <div className="progress-content">
        <h4 className="progress-title">{name}</h4>
        <p className="progress-description">Current Stage: {batch.stage}</p>
      </div>

      {/* Progress Indicator Area */}
      <div className="progress-indicator">
        <svg className="circular-progress" width="50" height="50" viewBox="0 0 50 50">
          <circle className="progress-bg" cx="25" cy="25" r={radius} strokeWidth="5" />
          <circle
            className="progress-bar"
            cx="25"
            cy="25"
            r={radius}
            strokeWidth="5"
            stroke={progressColor}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 25 25)"
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={progressColor}
            className="progress-text"
          >
            {progress}%
          </text>
        </svg>
      </div>
    </div>
  );
};

// --- Main Component: BatchProgressTracker ---
const BatchProgressTracker = ({ batches, teaStages }) => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [currentStage, setCurrentStage] = useState(null);

  // Filter batches into two groups
  const inProgressBatches = batches.filter(batch => batch.progress < 100);
  const completedBatches = batches.filter(batch => batch.progress === 100);

  const handleBatchClick = (batch) => {
    if (batch.progress === 100) { // Only allow completed batches to open
      setSelectedBatch(batch);
      setCurrentStage(batch.stage);
    }
  };

  const closeModal = () => {
    setSelectedBatch(null);
    setCurrentStage(null);
  };

  return (
    <>
      <div className="batch-progress-tracker-container">
        {/* In Progress Section */}
        <div className="progress-section in-progress-section">
          <h2 className="section-title">
            In Progress 🏃‍♂️ ({inProgressBatches.length})
          </h2>
          <div className="progress-list">
            {inProgressBatches.length > 0 ? (
              inProgressBatches.map(batch => (
                <ProgressItem
                  key={batch.id}
                  batch={batch}
                  teaStages={teaStages}
                  onClick={null} // in-progress batches are not clickable
                />
              ))
            ) : (
              <p className="empty-message">No batches currently in progress.</p>
            )}
          </div>
        </div>

        {/* Completed Section */}
        <div className="progress-section completed-section">
          <h2 className="section-title">
            Completed 🎉 ({completedBatches.length})
          </h2>
          <div className="progress-list">
            {completedBatches.length > 0 ? (
              completedBatches.map(batch => (
                <ProgressItem
                  key={batch.id}
                  batch={batch}
                  teaStages={teaStages}
                  onClick={() => handleBatchClick(batch)} // open popup
                />
              ))
            ) : (
              <p className="empty-message">No batches completed yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* BatchDetailsForm Popup */}
      {selectedBatch && (
        <div className="popup-overlay" onClick={closeModal}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <BatchStageDetailsTable batchId={selectedBatch.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default BatchProgressTracker;
