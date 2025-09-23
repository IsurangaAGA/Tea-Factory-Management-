import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/employees";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: "", email: "", position: "" });

    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => setEmployees(res.data))
            .catch((err) => console.error("Error fetching employees:", err));
    }, []);

    const handleEditClick = (emp) => {
        setEditingId(emp.id);
        setEditData({ name: emp.name, email: emp.email, position: emp.position });
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = (id) => {
        axios
            .put(`${API_URL}/${id}`, editData)
            .then((res) => {
                setEmployees(
                    employees.map((emp) => (emp.id === id ? res.data : emp))
                );
                setEditingId(null);
            })
            .catch((err) => console.error("Error updating employee:", err));
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                minHeight: "100vh",
                backgroundColor: "#e0e0e0",
            }}
        >
            <div
                style={{
                    background: "linear-gradient(90deg, #4caf50, #81c784)",
                    color: "white",
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: "bold",
                    padding: "20px 0",
                    borderRadius: "8px",
                    marginBottom: "20px",
                }}
            >
                Employee List
            </div>

            <table
                style={{
                    width: "90%",
                    margin: "0 auto",
                    borderCollapse: "collapse",
                    backgroundColor: "white",
                }}
            >
                <thead>
                <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
                    <th style={{ padding: "12px" }}>ID</th>
                    <th style={{ padding: "12px" }}>Name</th>
                    <th style={{ padding: "12px" }}>Email</th>
                    <th style={{ padding: "12px" }}>Position</th>
                    <th style={{ padding: "12px" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "12px" }}>
                            No employees found
                        </td>
                    </tr>
                ) : (
                    employees.map((emp, index) => (
                        <tr
                            key={emp.id}
                            style={{
                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                            }}
                        >
                            <td style={{ padding: "12px" }}>{emp.id}</td>

                            <td style={{ padding: "12px" }}>
                                {editingId === emp.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    emp.name
                                )}
                            </td>

                            <td style={{ padding: "12px" }}>
                                {editingId === emp.id ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    emp.email
                                )}
                            </td>

                            <td style={{ padding: "12px" }}>
                                {editingId === emp.id ? (
                                    <input
                                        type="text"
                                        name="position"
                                        value={editData.position}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    emp.position
                                )}
                            </td>

                            <td style={{ padding: "12px" }}>
                                {editingId === emp.id ? (
                                    <>
                                        <button
                                            onClick={() => handleSave(emp.id)}
                                            style={{
                                                padding: "6px 12px",
                                                background: "#4caf50",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                marginRight: "5px",
                                            }}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            style={{
                                                padding: "6px 12px",
                                                background: "#f44336",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleEditClick(emp)}
                                        style={{
                                            padding: "6px 12px",
                                            background: "#2196f3",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
