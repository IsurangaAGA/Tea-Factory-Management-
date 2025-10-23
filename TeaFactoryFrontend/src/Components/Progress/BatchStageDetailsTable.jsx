// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// //
// // /**
// //  * BatchStageDetailsTable
// //  * Props:
// //  *   batchId: number | string - the ID of the batch to fetch stage details for
// //  */
// // const BatchStageDetailsTable = ({ batchId }) => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //
// //   useEffect(() => {
// //     if (!batchId) return;
// //
// //     const fetchBatchStages = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axios.get(`http://localhost:8080/api/batches/${batchId}/stages/all`);
// //         setData(res.data || []);
// //       } catch (err) {
// //         console.error('Failed to fetch batch stage details:', err);
// //         setData([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //
// //     fetchBatchStages();
// //   }, [batchId]);
// //
// //   const columns = [
// //     { key: 'id', header: 'ID' },
// //     { key: 'batch.id', header: 'Batch ID' }, // optional, can also display batchId directly
// //     { key: 'stageName', header: 'Stage Name' },
// //     { key: 'weight', header: 'Weight (kg)' },
// //     { key: 'responsible', header: 'Responsible' },
// //     { key: 'status', header: 'Status' },
// //     { key: 'startTime', header: 'Start Time' },
// //     { key: 'endTime', header: 'End Time' },
// //     { key: 'createdAt', header: 'Created At' },
// //   ];
// //
// //   return (
// //     <div className="batch-stage-details-container">
// //       <h2>Batch Stage Details (Batch ID: {batchId})</h2>
// //
// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <table className="batch-stage-details-table">
// //           <thead>
// //             <tr>
// //               {columns.map(col => (
// //                 <th key={col.key}>{col.header}</th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {data.length > 0 ? (
// //               data.map((row) => (
// //                 <tr key={row.id}>
// //                   {columns.map(col => {
// //                     let value = col.key.split('.').reduce((o, k) => (o ? o[k] : null), row);
// //                     return <td key={`${row.id}-${col.key}`}>{value !== null && value !== undefined ? value : '-'}</td>;
// //                   })}
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan={columns.length} style={{ textAlign: 'center' }}>
// //                   No batch stage details found.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       )}
// //
// //       <style jsx="true">{`
// //         .batch-stage-details-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //           font-family: Arial, sans-serif;
// //         }
// //         .batch-stage-details-table th, .batch-stage-details-table td {
// //           border: 1px solid #ddd;
// //           padding: 8px;
// //           text-align: left;
// //         }
// //         .batch-stage-details-table th {
// //           background-color: #f2f2f2;
// //           font-weight: bold;
// //         }
// //         .batch-stage-details-table tr:nth-child(even) {
// //           background-color: #f9f9f9;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };
// //
// // export default BatchStageDetailsTable;
//
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// /**
//  * BatchStageDetailsTable
//  * Props:
//  * batchId: number | string - the ID of the batch to fetch stage details for
//  */
// const BatchStageDetailsTable = ({ batchId }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRowId, setSelectedRowId] = useState(null); // State for single selection/highlight
//
//   useEffect(() => {
//     if (!batchId) return;
//
//     const fetchBatchStages = async () => {
//       try {
//         setLoading(true);
//         // NOTE: Adjusted to match your data structure for clarity (e.g., stageName, startTime)
//         const res = await axios.get(`http://localhost:8080/api/batches/${batchId}/stages/all`);
//         setData(res.data || []);
//       } catch (err) {
//         console.error('Failed to fetch batch stage details:', err);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchBatchStages();
//   }, [batchId]);
//
//   // Map the keys from your schema to column headers
//   const columns = [
//     { key: 'select', header: '' }, // Add an empty column for the radio/checkbox
//     { key: 'id', header: 'ID' },
//     { key: 'stageName', header: 'Stage Name' },
//     { key: 'responsible', header: 'Responsible' },
//     { key: 'status', header: 'Status' },
//     { key: 'startTime', header: 'Start Time' },
//     { key: 'weight', header: 'Weight (kg)' },
//     // Add an empty column for the action/ellipsis menu
//     { key: 'actions', header: '' },
//   ];
//
//   // Helper function to render the status pill (e.g., Active/Pending with a dot)
//   const renderStatus = (statusValue) => {
//     if (!statusValue) return '-';
//     const lowerStatus = statusValue.toLowerCase();
//     let dotColor = '#999'; // Default for pending/unknown
//
//     if (lowerStatus === 'completed') {
//       dotColor = '#4CAF50'; // Green
//     } else if (lowerStatus === 'in progress') {
//       dotColor = '#FFC107'; // Yellow/Orange
//     } else if (lowerStatus === 'pending') {
//       dotColor = '#2196F3'; // Blue
//     }
//
//     return (
//       <span className="status-cell">
//         <span className="status-dot" style={{ backgroundColor: dotColor }}></span>
//         {statusValue}
//       </span>
//     );
//   };
//
//   return (
//     <div className="batch-stage-details-container">
//       <h2>Batch Stage Details (Batch ID: {batchId})</h2>
//
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="modern-table">
//             <thead>
//               <tr>
//                 {columns.map(col => (
//                   <th key={col.key}>
//                     {col.header}
//                     {/* Add a sort arrow icon for sortable columns like in the image */}
//                     {(col.key === 'id' || col.key === 'stageName' || col.key === 'startTime') && (
//                       <span className="sort-icon">↓</span>
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.length > 0 ? (
//                 data.map((row) => {
//                   const isSelected = row.id === selectedRowId;
//                   return (
//                     // Highlight the row if it's selected
//                     <tr
//                       key={row.id}
//                       className={isSelected ? 'selected-row' : ''}
//                       onClick={() => setSelectedRowId(row.id)} // Example click handler
//                     >
//                       {columns.map(col => {
//                         // Safely retrieve nested values if needed, otherwise grab top-level key
//                         let value = col.key.split('.').reduce((o, k) => (o ? o[k] : null), row);
//
//                         // Handle special columns
//                         if (col.key === 'select') {
//                           return (
//                             <td key={`${row.id}-${col.key}`} className="selection-cell">
//                               <span className={`custom-radio ${isSelected ? 'checked' : ''}`}>
//                                 {isSelected && <span className="inner-dot"></span>}
//                               </span>
//                             </td>
//                           );
//                         }
//
//                         if (col.key === 'status') {
//                           return <td key={`${row.id}-${col.key}`}>{renderStatus(value)}</td>;
//                         }
//
//                         if (col.key === 'actions') {
//                           return (
//                             <td key={`${row.id}-${col.key}`} className="actions-cell">
//                               <span className="ellipsis-menu">...</span>
//                             </td>
//                           );
//                         }
//
//                         // Default cell rendering
//                         return (
//                           <td key={`${row.id}-${col.key}`}>
//                             {value !== null && value !== undefined ? value : '-'}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
//                     No batch stage details found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//
//       {/* --- Styling for the Modern Table (Matching the Image) --- */}
//       <style jsx="true">{`
//         .table-wrapper {
//           /* Add subtle shadow/border to the container like a card */
//           background-color: #fff;
//           border-radius: 8px;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//           overflow: hidden; /* Keeps borders/shadows clean */
//           width: 100%;
//         }
//
//         .modern-table {
//           width: 150%;
//           border-collapse: separate; /* Required for rounded corners on rows */
//           border-spacing: 0 10px; /* Space between rows (card effect) */
//           font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
//           font-size: 14px;
//         }
//
//         .modern-table thead tr {
//           color: #6c757d; /* Light grey header text */
//           font-weight: 500;
//           text-transform: uppercase;
//           background-color: #f7f9fc; /* Very light blue/grey background for the header */
//         }
//
//         .modern-table th {
//           padding: 12px 15px;
//           text-align: left;
//           border: none;
//           cursor: pointer;
//         }
//
//         .sort-icon {
//           margin-left: 5px;
//           font-size: 12px;
//           transform: translateY(1px);
//           display: inline-block;
//         }
//
//         /* --- Table Body Rows --- */
//         .modern-table tbody tr {
//           background-color: #ffffff;
//           transition: background-color 0.2s, box-shadow 0.2s;
//           border: none;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle row separator/shadow */
//           border-radius: 4px; /* Slight rounding on rows */
//         }
//
//         .modern-table tbody tr:hover {
//           background-color: #f0f7ff; /* Light blue on hover */
//           cursor: pointer;
//         }
//
//         /* The selected row styling */
//         .modern-table tbody .selected-row {
//             background-color: #e6f0ff; /* Slightly darker light blue for selection */
//             border-left: 3px solid #007bff; /* Blue indicator bar on the left */
//         }
//
//         .modern-table td {
//           padding: 15px;
//           border-top: 1px solid #eee; /* Light separator line within the row */
//           border-bottom: 1px solid #eee;
//           border-left: none;
//           border-right: none;
//           color: #333;
//           vertical-align: middle;
//         }
//
//         /* Remove the internal border on the first and last cells of the row */
//         .modern-table tr td:first-child {
//             border-left: none;
//         }
//         .modern-table tr td:last-child {
//             border-right: none;
//         }
//
//         /* Remove top/bottom border for the entire row (using row shadow instead) */
//         .modern-table tbody tr td {
//           border-top: none;
//           border-bottom: none;
//         }
//
//         /* --- Custom UI Elements --- */
//
//         /* Status Dot/Pill styling */
//         .status-cell {
//           display: flex;
//           align-items: center;
//           font-weight: 600;
//         }
//         .status-dot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           margin-right: 8px;
//           display: inline-block;
//         }
//
//         /* Custom Radio/Select styling */
//         .selection-cell {
//           width: 10px; /* Make the cell narrow */
//           text-align: center;
//         }
//         .custom-radio {
//           display: inline-block;
//           width: 16px;
//           height: 16px;
//           border-radius: 50%;
//           border: 2px solid #ccc;
//           position: relative;
//           cursor: pointer;
//           transition: border-color 0.2s;
//         }
//         .custom-radio.checked {
//           border-color: #007bff; /* Blue border when checked */
//         }
//         .inner-dot {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background-color: #007bff; /* Inner blue dot */
//         }
//
//         /* Actions Ellipsis Menu */
//         .actions-cell {
//             text-align: right;
//             width: 30px;
//         }
//         .ellipsis-menu {
//           font-size: 18px;
//           font-weight: bold;
//           line-height: 1;
//           color: #999;
//           padding: 0 5px;
//           cursor: pointer;
//         }
//       `}</style>
//     </div>
//   );
// };
//
// export default BatchStageDetailsTable;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * BatchStageDetailsTable
 * Props:
 * batchId: number | string - the ID of the batch to fetch stage details for
 */
const BatchStageDetailsTable = ({ batchId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    if (!batchId) return;

    const fetchBatchStages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/api/batches/${batchId}/stages/all`);
        setData(res.data || []);
      } catch (err) {
        console.error('Failed to fetch batch stage details:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBatchStages();
  }, [batchId]);

  const columns = [

    { key: 'id', header: 'ID' },
    { key: 'stageName', header: 'Stage Name' },
    { key: 'weight', header: 'Weight (kg)' },
    { key: 'responsible', header: 'Responsible' },
    { key: 'status', header: 'Status' },
    { key: 'startTime', header: 'Start Time' },
    { key: 'endTime', header: 'End Time' },
    { key: 'actions', header: '' },
  ];

  const renderStatus = (statusValue) => {
    if (!statusValue) return '-';
    const lowerStatus = statusValue.toLowerCase();
    let dotColor = '#999';

    if (lowerStatus === 'completed') {
      dotColor = '#4CAF50';
    } else if (lowerStatus === 'in progress') {
      dotColor = '#FFC107';
    } else if (lowerStatus === 'pending') {
      dotColor = '#2196F3';
    }

    return (
      <span className="status-cell">
        <span className="status-dot" style={{ backgroundColor: dotColor }}></span>
        {statusValue}
      </span>
    );
  };

  return (
    <div className="batch-stage-details-container">
      <h2>Batch Stage Details (Batch ID: {batchId})</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-wrapper">
          {/* 👇 START OF FIX: Wrapper for horizontal scrolling */}
          <div className="table-scroll-container">
            <table className="modern-table">
              <thead>
                <tr>
                  {columns.map(col => (
                    <th key={col.key}>
                      {col.header}
                      {(col.key === 'id' || col.key === 'stageName' || col.key === 'startTime') && (
                        <span className="sort-icon">↓</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row) => {
                    const isSelected = row.id === selectedRowId;
                    return (
                      <tr
                        key={row.id}
                        className={isSelected ? 'selected-row' : ''}
                        onClick={() => setSelectedRowId(row.id)}
                      >
                        {columns.map(col => {
                          let value = col.key.split('.').reduce((o, k) => (o ? o[k] : null), row);

                          if (col.key === 'select') {
                            return (
                              <td key={`${row.id}-${col.key}`} className="selection-cell">
                                <span className={`custom-radio ${isSelected ? 'checked' : ''}`}>
                                  {isSelected && <span className="inner-dot"></span>}
                                </span>
                              </td>
                            );
                          }

                          if (col.key === 'status') {
                            return <td key={`${row.id}-${col.key}`}>{renderStatus(value)}</td>;
                          }

                          if (col.key === 'actions') {
                            return (
                              <td key={`${row.id}-${col.key}`} className="actions-cell">
                                <span className="ellipsis-menu">...</span>
                              </td>
                            );
                          }

                          return (
                            <td key={`${row.id}-${col.key}`}>
                              {value !== null && value !== undefined ? value : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                      No batch stage details found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* 👆 END OF FIX: Scrolling wrapper */}
        </div>
      )}

      {/* --- Styling for the Modern Table (Matching the Image) --- */}
      <style jsx="true">{`
        .table-wrapper {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        /* 👇 FIX APPLIED HERE: Enables horizontal scrolling */
        .table-scroll-container {
            overflow-x: auto;
            width: 100%;
        }

        .modern-table {
          /* Set a minimum width for the table so it doesn't shrink when scrolling is needed */
          min-width: 900px; /* Example minimum width to ensure all columns have space */
          border-collapse: separate;
          border-spacing: 0 10px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          font-size: 14px;
        }

        .modern-table thead tr {
          color: #6c757d;
          font-weight: 500;
          text-transform: uppercase;
          background-color: #f7f9fc;
        }

        .modern-table th {
          padding: 12px 15px;
          text-align: left;
          border: none;
          cursor: pointer;
          /* Prevents headers from collapsing/wrapping */
          white-space: nowrap;
        }

        .sort-icon {
          margin-left: 5px;
          font-size: 12px;
          transform: translateY(1px);
          display: inline-block;
        }

        /* --- Table Body Rows --- */
        .modern-table tbody tr {
          background-color: #ffffff;
          transition: background-color 0.2s, box-shadow 0.2s;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }

        .modern-table tbody tr:hover {
          background-color: #f0f7ff;
          cursor: pointer;
        }

        .modern-table tbody .selected-row {
            background-color: #e6f0ff;
            border-left: 3px solid #007bff;
        }

        .modern-table td {
          padding: 15px;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          border-left: none;
          border-right: none;
          color: #333;
          vertical-align: middle;
          /* Prevents text content in cells from wrapping */
          white-space: nowrap;
        }

        .modern-table tr td:first-child {
            border-left: none;
        }
        .modern-table tr td:last-child {
            border-right: none;
        }

        .modern-table tbody tr td {
          border-top: none;
          border-bottom: none;
        }

        /* --- Custom UI Elements --- */

        /* Status Dot/Pill styling */
        .status-cell {
          display: flex;
          align-items: center;
          font-weight: 600;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 8px;
          display: inline-block;
        }

        /* Custom Radio/Select styling */
        .selection-cell {
          width: 10px;
          text-align: center;
        }
        .custom-radio {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid #ccc;
          position: relative;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .custom-radio.checked {
          border-color: #007bff;
        }
        .inner-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #007bff;
        }

        /* Actions Ellipsis Menu */
        .actions-cell {
            text-align: right;
            width: 30px;
        }
        .ellipsis-menu {
          font-size: 18px;
          font-weight: bold;
          line-height: 1;
          color: #999;
          padding: 0 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default BatchStageDetailsTable;
