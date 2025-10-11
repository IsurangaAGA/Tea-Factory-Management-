import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  BATCH: 'batch',
};

const Batch = ({ id, name }) => {
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
    >
      {name}
    </button>
  );
};

export default Batch;
export { ItemTypes };
