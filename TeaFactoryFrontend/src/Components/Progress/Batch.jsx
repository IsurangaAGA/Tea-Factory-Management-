import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  BATCH: 'batch',
};

// Added onClick prop
const Batch = ({ id, name, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BATCH,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id]);

  const batchStyle = {
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <button
      ref={drag}
      className="batch-button"
      style={batchStyle}
      // Added click handler
      onClick={() => onClick(id, name)}
    >
      {name}
    </button>
  );
};

export default Batch;
export { ItemTypes };
