import React from 'react';
import { useDrag } from 'react-dnd';

// Define the item type for drag-and-drop
const ItemTypes = {
  BATCH: 'batch',
};

const Batch = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BATCH,
    item: { id: id }, // Data passed when dragging starts
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id]);

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={drag}
      className="batch-button"
      style={style}
      title={name} // Tooltip on hover
    >
      {name}
    </button>
  );
};

export default Batch;