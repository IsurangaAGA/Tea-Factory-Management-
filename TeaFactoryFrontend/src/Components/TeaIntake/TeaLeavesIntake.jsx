import React, { useEffect, useState } from 'react';
import './TeaLeavesIntake.css';

const TeaLeavesIntake = () => {
  const [intakeData, setIntakeData] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/intakes') // Adjust port if needed
      .then((res) => res.json())
      .then((data) => setIntakeData(data))
      .catch((err) => console.error('Error fetching intake data:', err));
  }, []);

  const handleView = (id) => console.log(`View intake ${id}`);
  const handleEdit = (id) => console.log(`Edit intake ${id}`);
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/intakes/${id}`, {
      method: 'DELETE',
    })
      .then(() => setIntakeData(intakeData.filter((item) => item.id !== id)))
      .catch((err) => console.error('Error deleting intake:', err));
  };
  const handleAddIntake = () => console.log('Add new intake');

  return (
    <div className="app-center-container">
      <div className="main-form-container">
        <div className="container-header">
          <h2 className="container-topic">Tea Leaves Intake</h2>
        </div>

        <div className="table-wrapper">
          <table className="intake-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Supplier</th>
                <th>Estate</th>
                <th>Vehicle No.</th>
                <th>Weight (kg)</th>
                <th>Quality</th>
                <th>Remarks</th>
                <th>Receiver ID</th>
                <th>Receiver Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {intakeData.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.date}</td>
                  <td>{data.time}</td>
                  <td>{data.supplierName}</td>
                  <td>{data.estateName}</td>
                  <td>{data.vehicleNumber}</td>
                  <td>{data.weight}</td>
                  <td>{data.quality}</td>
                  <td>{data.remarks}</td>
                  <td>{data.receiverId}</td>
                  <td>{data.receiverName}</td>
                  <td className="action-buttons">
                    <button
                      className="btn btn-view"
                      onClick={() => handleView(data.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(data.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeaLeavesIntake;
