import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KpiCard from './KpiCard';
import BatchDetailsForm from './BatchDetailsForm'; // 1. Import the new form component
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

const Track = () => {
  const [batches, setBatches] = useState([]);

  // 2. State for the pop-up form
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedStage, setSelectedStage] = useState('');

  // Fetch batches and format them for the tracking board (Existing code remains the same)
  useEffect(() => {
    fetch("http://localhost:8080/api/batches")
      .then((res) => res.json())
      .then((data) => {
        const validStages = teaStages.map(s => s.name);

        const formattedBatches = data.map(batch => ({
          // Use numeric id for DnD identity and tracking
          id: batch.id,
          // Always render display name as "Batch - <id>" for consistency
          name: `Batch - ${batch.id}`,
          // Initialize stage. If status is missing/invalid, default to 'Tea Batches'.
          stage: validStages.includes(batch.status) ? batch.status : 'Tea Batches'
        }));

        setBatches(formattedBatches);
      })
      .catch((err) => console.error("Error fetching batches:", err));
  }, []);

  const moveBatch = useCallback((batchId, newStage) => {
    setBatches(prevBatches =>
      prevBatches.map(batch =>
        batch.id === batchId ? { ...batch, stage: newStage } : batch
      )
    );

    // Optional: Add logic here to persist the stage change to the backend if needed
  }, []);

  // 3. Click handler to open the form
  const handleBatchClick = useCallback((batchId, batchName) => {
    const batchInfo = batches.find(b => b.id === batchId);
    if (batchInfo) {
        setSelectedBatch({ id: batchId, name: batchName });
        setSelectedStage(batchInfo.stage);
    }
  }, [batches]);

  // 4. Handler to close the form
  const closeBatchForm = useCallback(() => {
    setSelectedBatch(null);
    setSelectedStage('');
  }, []);

  const sourceStage = teaStages[0];
  const rightStages = teaStages.slice(1);
  const rightCol1Stages = [rightStages[0], rightStages[2], rightStages[4]];
  const rightCol2Stages = [rightStages[1], rightStages[3], rightStages[5]];

  // 5. Render card now passes the click handler
  const renderCard = (stage) => (
    <KpiCard
      key={stage.name}
      stage={stage}
      batches={batches.filter(b => b.stage === stage.name)}
      moveBatch={moveBatch}
      // Passed the new handler
      onBatchClick={handleBatchClick}
    />
  );

  return (
    <DndProvider backend={HTML5Backend}>
      {/* First container */}
      <div className="tracking-container">
        <h1>Tracking Tea Processing Stages</h1>

        {/* Second container */}
        <div className="tracking-inner-container kpi-dashboard-container-staggered">
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
      </div>

      {/* 6. Conditionally render the pop-up form */}
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