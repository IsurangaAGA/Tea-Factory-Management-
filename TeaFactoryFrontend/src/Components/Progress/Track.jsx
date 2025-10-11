import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KpiCard from './KpiCard';
import './Track.css'; // Import the CSS file

// Initial Data Setup
const initialBatches = [
  { id: 'Batch-T-101', stage: 'Tea Batches' },
  { id: 'Batch-T-102', stage: 'Tea Batches' },
  { id: 'Batch-G-103', stage: 'Tea Batches' },
  { id: 'Batch-G-104', stage: 'Tea Batches' },
  { id: 'Batch-B-105', stage: 'Tea Batches' },
];

const teaStages = [
  { name: 'Tea Batches', color: '#B0BEC5' }, // Initial Batches column
  { name: 'Withering', color: '#81C784' },
  { name: 'Rolling', color: '#FFD54F' },
  { name: 'Fermentation', color: '#FF8A65' },
  { name: 'Drying', color: '#4FC3F7' },
  { name: 'Sorting', color: '#9575CD' },
  { name: 'Packing', color: '#F06292' },
];

const App = () => {
  const [batches, setBatches] = useState(initialBatches);

  // Function to move a batch from one stage to another
  const moveBatch = useCallback((batchId, newStage) => {
    setBatches(prevBatches =>
      prevBatches.map(batch =>
        batch.id === batchId ? { ...batch, stage: newStage } : batch
      )
    );
  }, []);

  // Split stages for the two-row layout: 4 in first, 3 in second
  const firstRowStages = teaStages.slice(0, 4); // Tea Batches, Withering, Rolling, Fermentation
  const secondRowStages = teaStages.slice(4); // Drying, Sorting, Packing

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kpi-dashboard-container">
        <h1>Tea Production Process Dashboard</h1>

        {/* First Row (4 Cards) */}
        <div className="kpi-row first-row">
          {firstRowStages.map(stage => (
            <KpiCard
              key={stage.name}
              stage={stage}
              batches={batches.filter(b => b.stage === stage.name)}
              moveBatch={moveBatch}
            />
          ))}
        </div>

        {/* Second Row (3 Cards) */}
        <div className="kpi-row second-row">
          {secondRowStages.map(stage => (
            <KpiCard
              key={stage.name}
              stage={stage}
              batches={batches.filter(b => b.stage === stage.name)}
              moveBatch={moveBatch}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;