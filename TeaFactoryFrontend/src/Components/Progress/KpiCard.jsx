import React from 'react';
import { useDrop } from 'react-dnd';
import Batch from './Batch';

// Define the item type for drag-and-drop
const ItemTypes = {
  BATCH: 'batch',
};

const KpiCard = ({ stage, batches, moveBatch }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.BATCH,
    // When an item is dropped, update its stage
    drop: (item, monitor) => {
      moveBatch(item.id, stage.name);
      return { name: stage.name };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [stage.name, moveBatch]); // Dependencies

  const isActive = isOver && canDrop;
  let backgroundColor = stage.color;

  if (isActive) {
    backgroundColor = 'darkgreen'; // Visual feedback on drop hover
  } else if (canDrop) {
    backgroundColor = stage.color;
  }

  const cardStyle = {
    backgroundColor: backgroundColor,
    opacity: isActive ? 0.8 : 1,
  };

  return (
    <div
      ref={drop}
      className="kpi-card"
      style={cardStyle}
    >
      {/* Card Header (Stage Name & Count) */}
      <div className="card-header">
        <h3 className="card-title">{stage.name}</h3>
        <span className="batch-count">{batches.length}</span>
      </div>

      <div className="batches-container">
        {batches.length > 0 ? (
          // Render the batches
          batches.map(batch => (
            <Batch key={batch.id} id={batch.id} name={batch.id} />
          ))
        ) : (
          // Placeholder text when empty
          <p className="placeholder-text">Drop batches here</p>
        )}
      </div>
    </div>
  );
};

export default KpiCard;