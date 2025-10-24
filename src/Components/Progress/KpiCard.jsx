import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './Batch';
import Batch from './Batch';

const KpiCard = ({ stage, batches, moveBatch }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.BATCH,
    drop: (item) => {
      moveBatch(item.id, stage.name);
      return { name: stage.name };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [stage.name, moveBatch]);

  const isActive = isOver && canDrop;

  const cardStyle = {
    opacity: isActive ? 0.8 : 1,
  };

  const ProcessIconPlaceholder = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.4 1.4 0 0 0 1.6-1.6l-.3-2.6a1.4 1.4 0 0 0-1.2-1.2l-2.6-.3a1.4 1.4 0 0 0-1.6-.7l-.8-2.6a1.4 1.4 0 0 0-1.2-.7H9.2a1.4 1.4 0 0 0-1.2.7l-.8 2.6a1.4 1.4 0 0 0-1.6.7l-2.6.3a1.4 1.4 0 0 0-1.2 1.2l-.3 2.6a1.4 1.4 0 0 0 1.6 1.6l2.6.3a1.4 1.4 0 0 0 1.2 1.2l.3 2.6a1.4 1.4 0 0 0 1.6 1.6l2.6-.3a1.4 1.4 0 0 0 1.2-1.2l.3-2.6a1.4 1.4 0 0 0 1.6-1.6l2.6.3a1.4 1.4 0 0 0 1.2-1.2z" />
    </svg>
  );

  const TeaLeafIcon = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21c-4.5 0-8.6-2.5-10.4-6.5C4.7 9.8 8.6 4 15 4c1 0 2 .2 3 .6" />
      <path d="M18.6 6.6c-2.3-1.6-5.8-1.6-8.1 0" />
      <path d="M17 21l-3-6 4-2" />
      <path d="M10 17l1-3 1-3" />
      <path d="M14 12l-1 2-1 2" />
    </svg>
  );

  // ... (inside the KpiCard component)

    const isSourceCard = stage.name === 'Tea Batches';

    if (isSourceCard) {
      return (
        <div ref={drop} className="kpi-card source-card-new" style={cardStyle}>
          <div className="source-card-icon-area">
            <div className="source-card-icon-wrapper">
              <TeaLeafIcon color={stage.color} />
            </div>
          </div>

          <div className="source-card-body" style={{ backgroundColor: stage.color }}>
            <h3 className="card-title-source">{stage.name}</h3>
            <p className="source-card-description">
              Tea batches ready for processing. Drag and drop batches below into the appropriate process stage.
            </p>
            <div className="batches-container source-batches-list">
              {batches.length > 0 ? (
                batches.map(batch => (
                  <Batch
                    key={batch.id}
                    id={batch.id}
                    name={batch.name}
                  />
                ))
              ) : (
                <p className="placeholder-text-source">No batches ready.</p>
              )}
            </div>
            <div className="source-card-count-indicator">{batches.length}</div>
          </div>
        </div>
      );
    }

  return (
    <div ref={drop} className="kpi-card process-card" style={cardStyle}>
      <div className="kpi-card-header-visual" style={{ backgroundColor: stage.color }}>
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="wave-separator">
          <path d="M0,0 C 50,10 50,10 100,0 L 100,10 L 0,10 Z" fill="#2c2c34" />
        </svg>
        <div className="circular-indicator-wrapper">
          <div className="circular-indicator" style={{ borderColor: stage.color }}>
            <span className="batch-count">{batches.length}</span>
          </div>
        </div>
      </div>

      <div className="kpi-card-body">
        <h3 className="card-title" style={{ color: stage.color }}>
          {stage.name}
        </h3>

        <div className="icon-placeholder">
          <ProcessIconPlaceholder color={stage.color} />
        </div>

        <div className="batches-container">
          {batches.length > 0 ? (
            batches.map(batch => (
              <Batch key={batch.id} id={batch.id} name={batch.name} />
            ))
          ) : (
            <p className="placeholder-text">Drop batches here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
