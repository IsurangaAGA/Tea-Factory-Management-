import React, { useState, useEffect } from "react";
import "./TeaBatch.css";

// --- Helper: Corrected Format date/time ---
const formatDateTime = (intakeItem) => {
    // ... (formatDateTime function remains the same) ...
    const dateString = intakeItem.date;
    let time = intakeItem.time || 'N/A';
    let dateOnly = dateString || 'Unknown Date';

    try {
        const date = new Date(dateString);
        const dateOptions = { month: 'short', day: 'numeric' };
        dateOnly = date.toLocaleDateString('en-US', dateOptions);

        if (time === 'N/A') {
             time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        }

    } catch (e) {
        time = 'N/A';
        dateOnly = dateString || 'Unknown Date';
    }

    return { time: intakeItem.time || time, date: dateOnly };
}
// -------------------------------------------------------------------


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

    const newBatch = {
      // Let backend set batchName based on generated ID
      batchDate: new Date().toISOString().split("T")[0],
      intakeIds: selectedIntakes,
    };

    fetch("http://localhost:8080/api/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBatch),
    })
      .then((res) => res.json())
      .then((batch) => {
        setBatches((prev) => [...prev, batch]);
        setSelectedIntakes([]);
        alert("✅ Batch created successfully and saved to database!");
      })
      .catch((err) => console.error("Error creating batch:", err));
  };

  return (
    <div className="batch-container">
      <h1>🍃 Create Tea Batches</h1>

      {/* The button is now placed before the lists so it can be ordered with grid-area */}
      <button className="create-btn" onClick={createBatch}>
        Create Batch
      </button>

      <div className="intake-list">
        <h2>Available Intakes</h2>
        {intakes
          .filter((i) => !batches.some((b) => b.intakeIds.includes(i.id)))
          .map((i) => {
            const { time, date } = formatDateTime(i);

            return (
              <div key={i.id} className="list-item-wrapper">

                <div
                  className={`intake-item ${
                    selectedIntakes.includes(i.id) ? "selected" : ""
                  }`}
                  onClick={() => toggleSelect(i.id)}
                >

                  <div className="intake-header">
                    <p>
                        <span className="intake-time">Time: {time}</span>
                        <span className="intake-date">Date: {date}</span>
                    </p>
                  </div>


                  <div className="intake-details">
                    <p>Supplier: {i.supplierName}</p>
                    <p>Weight: {i.weight} kg</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>


      <div className="batch-list">
        <h2>Existing Batches</h2>
        {batches.map((b) => {
            const batchTime = "Batch ID";
            const batchDate = `${b.id}`;

            return (
                <div key={b.id} className="list-item-wrapper">
                    {/* Unified Batch Card */}
                    <div className="batch-card">
                      <div className="batch-header">
                        <span className="batch-time">
                          <strong>Batch ID:</strong> {b.id}
                        </span>
                      </div>


                      <div className="batch-details">
                          <p>Total Weight: {b.totalWeight} kg</p>
                          <p>Status: {b.status}</p>
                      </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}
