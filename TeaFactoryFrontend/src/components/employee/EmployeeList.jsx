import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/employees";

function EmployeeList() {
    const navigate = useNavigate();
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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setEmployees(employees.filter((emp) => emp.id !== id));
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
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
            {/* Gradient bar with title and Add button */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "linear-gradient(90deg, #4caf50, #81c784)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                }}
            >
                <div style={{ fontSize: "28px", fontWeight: "bold" }}>
                    Employee List
                </div>
                <button
                    onClick={() => navigate("/employees-add")}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#064e3b", // same as top strip
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Add
                </button>
            </div>

            {/* Employee table */}
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
                    <th style={{ padding: "12px" }}>Delete</th>
                    <th style={{ padding: "12px" }}>Edit</th>
                </tr>
                </thead>
                <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
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
                                <button
                                    onClick={() => handleDelete(emp.id)}
                                    style={{
                                        padding: "6px 12px",
                                        background: "#f44336",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
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
