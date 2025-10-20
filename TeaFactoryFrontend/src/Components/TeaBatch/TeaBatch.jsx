// import React, { useState, useEffect } from "react";
// import "./TeaBatch.css";
//
// export default function TeaBatch() {
//   const [intakes, setIntakes] = useState([]);
//   const [selectedIntakes, setSelectedIntakes] = useState([]);
//   const [batches, setBatches] = useState([]);
//
//   useEffect(() => {
//     fetch("http://localhost:8080/api/intakes")
//       .then((res) => res.json())
//       .then(setIntakes);
//     fetch("http://localhost:8080/api/batches")
//       .then((res) => res.json())
//       .then(setBatches);
//   }, []);
//
//   const toggleSelect = (id) => {
//     setSelectedIntakes((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };
//
//   const createBatch = () => {
//     if (selectedIntakes.length === 0) return alert("Select at least one intake");
//     fetch("http://localhost:8080/api/batches", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ intakeIds: selectedIntakes }),
//     })
//       .then((res) => res.json())
//       .then((batch) => {
//         setBatches((prev) => [...prev, batch]);
//         setSelectedIntakes([]);
//         alert("Batch created successfully!");
//       });
//   };
//
//   return (
//     <div className="batch-container">
//       <h1>🍃 Create Tea Batches</h1>
//       <div className="intake-list">
//         <h2>Available Intakes</h2>
//         {intakes
//           .filter((i) => !batches.some((b) => b.intakeIds.includes(i.id)))
//           .map((i) => (
//             <div
//               key={i.id}
//               className={`intake-item ${
//                 selectedIntakes.includes(i.id) ? "selected" : ""
//               }`}
//               onClick={() => toggleSelect(i.id)}
//             >
//               <p><strong>{i.supplierName}</strong> - {i.weight} kg</p>
//               <p>{i.date}</p>
//             </div>
//           ))}
//       </div>
//
//       <button className="create-btn" onClick={createBatch}>
//         Create Batch
//       </button>
//
//       <div className="batch-list">
//         <h2>Existing Batches</h2>
//         {batches.map((b) => (
//           <div key={b.id} className="batch-card">
//             <p><strong>Batch ID:</strong> {b.id}</p>
//             <p><strong>Total Weight:</strong> {b.totalWeight} kg</p>
//             <p><strong>Status:</strong> {b.status}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./TeaBatch.css";

export default function TeaBatch() {
  const [intakes, setIntakes] = useState([]);
  const [selectedIntakes, setSelectedIntakes] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/intakes")
      .then((res) => res.json())
      .then(setIntakes);
    fetch("http://localhost:8080/api/batches")
      .then((res) => res.json())
      .then(setBatches);
  }, []);

  const toggleSelect = (id) => {
    setSelectedIntakes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const createBatch = () => {
    if (selectedIntakes.length === 0) return alert("Select at least one intake");
    fetch("http://localhost:8080/api/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intakeIds: selectedIntakes }),
    })
      .then((res) => res.json())
      .then((batch) => {
        setBatches((prev) => [...prev, batch]);
        setSelectedIntakes([]);
        alert("Batch created successfully!");
      });
  };

  // Helper to format the date/time from the intake.date property
  const formatDateTime = (dateString) => {
      // Assuming 'dateString' is a full ISO date string or similar.
      // Adjust this logic if the 'i.date' property holds a different format.
      try {
          const date = new Date(dateString);
          // Format Time (e.g., 10:00 AM)
          const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
          const time = date.toLocaleTimeString('en-US', timeOptions);
          // Format Date (e.g., Oct 20) - You can adjust this to show the day too.
          const dateOptions = { month: 'short', day: 'numeric' };
          const dateOnly = date.toLocaleDateString('en-US', dateOptions);
          return { time: time, date: dateOnly };
      } catch (e) {
          return { time: 'N/A', date: dateString || 'Unknown Date' };
      }
  }


  return (
    <div className="batch-container">
      <h1>🍃 Create Tea Batches</h1>
      <div className="intake-list">
        <h2>Available Intakes</h2>
        {intakes
          .filter((i) => !batches.some((b) => b.intakeIds.includes(i.id)))
          .map((i) => {
            const { time, date } = formatDateTime(i.date);
            return (
              <div key={i.id} className="list-item-wrapper">
                {/* LEFT SIDE: Time and Date */}
                <div className="list-item-time">
                    <strong>{time}</strong>
                    <p>{date}</p>
                </div>

                {/* RIGHT SIDE: Intake Details (Supplier Name & Weight) */}
                <div
                  className={`intake-item ${
                    selectedIntakes.includes(i.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleSelect(i.id)}
                >
                  <p><strong>{i.supplierName}</strong></p>
                  <p>{i.weight} kg</p>
                </div>
              </div>
            );
          })}
      </div>

      <button className="create-btn" onClick={createBatch}>
        Create Batch
      </button>

      <div className="batch-list">
        <h2>Existing Batches</h2>
        {batches.map((b) => {
            // Placeholder: Use a standard time/date for batches since the API response is simple
            const batchTime = "Batch";
            const batchDate = `ID: ${b.id}`;

            return (
                <div key={b.id} className="list-item-wrapper">
                    {/* LEFT SIDE: Batch ID/Time */}
                    <div className="list-item-time">
                        <strong>{batchTime}</strong>
                        <p>{batchDate}</p>
                    </div>

                    {/* RIGHT SIDE: Batch Details */}
                    <div className="batch-card">
                      <p><strong>Total Weight:</strong> {b.totalWeight} kg</p>
                      <p><strong>Status:</strong> {b.status}</p>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}
