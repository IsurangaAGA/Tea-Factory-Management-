import React from 'react';
import './BatchProgressTracker.css';

// --- Sub-Component: ProgressItem (renders one batch's progress) ---
const ProgressItem = ({ batch, teaStages }) => {
  const { name, progress } = batch;

  // 1. Find the corresponding stage object to get its color
  const currentStage = teaStages.find(stage => stage.name === batch.stage);

  // 2. Determine the color
  // Default to the Source Card color if the stage isn't found
  let progressColor = '#FF5783';

  if (currentStage) {
      progressColor = currentStage.color;
  }

  // Override color if completed to provide a unified 'Done' color
  if (progress === 100) {
    progressColor = '#8BC34A'; // Green for 100% completion
  }

  // Helper to convert hex to rgba for the icon background
  const hexToRgba = (hex, alpha = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Circular Progress Bar implementation (SVG)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  // Dash offset decreases as progress increases
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-item">
      {/* Icon Area - Background color is derived from the progress color */}
      <div className="progress-icon-wrapper" style={{ backgroundColor: hexToRgba(progressColor) }}>
          <span style={{ fontSize: '24px' }} role="img" aria-label="tea leaf">
                    🍃
                  </span>
      </div>

      {/* Content Area */}
      <div className="progress-content">
        <h4 className="progress-title">{name}</h4>
        <p className="progress-description">
          Current Stage: {batch.stage}
        </p>
      </div>

      {/* Progress Indicator Area (Circular Progress Bar) */}
      <div className="progress-indicator">
        <svg className="circular-progress" width="50" height="50" viewBox="0 0 50 50">
          <circle
            className="progress-bg"
            cx="25" cy="25" r={radius}
            strokeWidth="5"
          />
          <circle
            className="progress-bar"
            cx="25" cy="25" r={radius}
            strokeWidth="5"
            stroke={progressColor} // Use stage-based color
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 25 25)"
          />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={progressColor} className="progress-text">
            {progress}%
          </text>
        </svg>
      </div>
    </div>
  );
};

// --- Main Component: BatchProgressTracker ---
const BatchProgressTracker = ({ batches, teaStages }) => {
  // Filter batches into two groups
  const inProgressBatches = batches.filter(batch => batch.progress < 100);
  const completedBatches = batches.filter(batch => batch.progress === 100);

  return (
    <div className="batch-progress-tracker-container">
      {/* In Progress Section */}
      <div className="progress-section in-progress-section">
        <h2 className="section-title">In Progress 🏃‍♂️ ({inProgressBatches.length})</h2>
        <div className="progress-list">
          {inProgressBatches.length > 0 ? (
            inProgressBatches.map(batch => (
              // Pass teaStages to ProgressItem
              <ProgressItem key={batch.id} batch={batch} teaStages={teaStages} />
            ))
          ) : (
            <p className="empty-message">No batches currently in progress.</p>
          )}
        </div>
      </div>

      {/* Completed Section */}
      <div className="progress-section completed-section">
        <h2 className="section-title">Completed 🎉 ({completedBatches.length})</h2>
        <div className="progress-list">
          {completedBatches.length > 0 ? (
            completedBatches.map(batch => (
              // Pass teaStages to ProgressItem
              <ProgressItem key={batch.id} batch={batch} teaStages={teaStages} />
            ))
          ) : (
            <p className="empty-message">No batches completed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchProgressTracker;