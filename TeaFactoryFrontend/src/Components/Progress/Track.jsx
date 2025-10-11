import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import KpiCard from './KpiCard';
import './Track.css';

const initialBatches = [
  { id: 'Batch-T-101', stage: 'Tea Batches' },
  { id: 'Batch-T-102', stage: 'Tea Batches' },
  { id: 'Batch-G-103', stage: 'Tea Batches' },
  { id: 'Batch-G-104', stage: 'Tea Batches' },
  { id: 'Batch-B-105', stage: 'Tea Batches' },
];

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
  const [batches, setBatches] = useState(initialBatches);

  const moveBatch = useCallback((batchId, newStage) => {
    setBatches(prevBatches =>
      prevBatches.map(batch =>
        batch.id === batchId ? { ...batch, stage: newStage } : batch
      )
    );
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
    />
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kpi-dashboard-container-staggered">
        <h1>Tea Production Flow</h1>

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
    </DndProvider>
  );
};

export default Track;

