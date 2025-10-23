import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KpiCard from './KpiCard';
import BatchDetailsForm from './BatchDetailsForm';
import BatchProgressTracker from './BatchProgressTracker';
import './Track.css';

const teaStages = [
  { name: 'Tea Batches', color: '#FF5783' },
  { name: 'Withering', color: '#8BC34A' },
  { name: 'Rolling', color: '#00BCD4' },
  { name: 'Fermentation', color: '#FF7043' },
  { name: 'Drying', color: '#009688' },
  { name: 'Sorting', color: '#E91E63' },
  { name: 'Packing', color: '#673AB7' },
];

// Helper to calculate progress based on stage index
const calculateProgress = (stageName) => {
  const processingStages = teaStages.slice(1); // Exclude 'Tea Batches'
  const stageIndex = processingStages.findIndex(s => s.name === stageName);

  if (stageIndex === -1) {
    // 'Tea Batches' (Source card) or unlisted stage
    return 0;
  }

  // 6 processing stages: Withering (1) -> Rolling (2) -> ... -> Packing (6)
  // Progress is calculated as (stageIndex + 1) / totalStages * 100
  return Math.round(((stageIndex + 1) / processingStages.length) * 100);
};


const Track = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedStage, setSelectedStage] = useState('');
  const [batchProgress, setBatchProgress] = useState({});

  // Fetch batches and format them for the tracking board
  useEffect(() => {
    fetch("http://localhost:8080/api/batches")
      .then((res) => res.json())
      .then((data) => {
        const validStages = teaStages.map(s => s.name);

        const formattedBatches = data.map(batch => ({
          id: batch.id,
          name: `Batch - ${batch.id}`,
          stage: validStages.includes(batch.status) ? batch.status : 'Tea Batches'
        }));

        setBatches(formattedBatches);

        // Initialize progress state
        const initialProgress = formattedBatches.reduce((acc, batch) => {
          acc[batch.id] = calculateProgress(batch.stage);
          return acc;
        }, {});
        setBatchProgress(initialProgress);
      })
      .catch((err) => console.error("Error fetching batches:", err));
  }, []);

  const moveBatch = useCallback((batchId, newStage) => {
    setBatches(prevBatches =>
      prevBatches.map(batch =>
        batch.id === batchId ? { ...batch, stage: newStage } : batch
      )
    );

    const newProgress = calculateProgress(newStage);
    setBatchProgress(prevProgress => ({
        ...prevProgress,
        [batchId]: newProgress
    }));
  }, []);

  const handleBatchClick = useCallback((batchId, batchName) => {
    const batchInfo = batches.find(b => b.id === batchId);
    if (batchInfo) {
        setSelectedBatch({ id: batchId, name: batchName });
        setSelectedStage(batchInfo.stage);
    }
  }, [batches]);

  const closeBatchForm = useCallback(() => {
    setSelectedBatch(null);
    setSelectedStage('');
  }, []);

  const sourceStage = teaStages[0];
  const rightStages = teaStages.slice(1);
  const rightCol1Stages = [rightStages[0], rightStages[2], rightStages[4]];
  const rightCol2Stages = [rightStages[1], rightStages[3], rightStages[5]];

  const renderCard = (stage) => (
    <KpiCard
      key={stage.name}
      stage={stage}
      batches={batches.filter(b => b.stage === stage.name)}
      moveBatch={moveBatch}
      onBatchClick={handleBatchClick}
    />
  );

  const trackerData = batches.map(batch => ({
    ...batch,
    progress: batchProgress[batch.id] || 0
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Independent Topic Section */}
      <h1 className="tracking-title">Tracking Tea Processing Stages</h1>

      {/* Main Content: Side-by-side layout */}
      <div className="main-content-layout">
        {/* LEFT: Tea Processing Cards */}
        <div className="stages-section">
          <div className="staggered-layout">
            <div className="left-column">{renderCard(sourceStage)}</div>

            <div className="right-columns-wrapper">
              <div className="right-column col-1">
                {rightCol1Stages.map(stage => renderCard(stage))}
              </div>
              <div className="right-column col-2">
                {rightCol2Stages.map(stage => renderCard(stage))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Batch Progress Tracker */}
        <div className="progress-section">
          <BatchProgressTracker batches={trackerData} teaStages={teaStages} />
        </div>
      </div>

      {selectedBatch && (
        <BatchDetailsForm
          batch={selectedBatch}
          currentStage={selectedStage}
          onClose={closeBatchForm}
        />
      )}
    </DndProvider>
  );
};

export default Track;