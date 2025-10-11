import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/employees";

function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ name: "", email: "", position: "" });
    const [search, setSearch] = useState("");
    const [hoveredId, setHoveredId] = useState(null);

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

    const isValidEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value || "");
    const editErrors = {
        name: (editingId && !String(editData.name || "").trim()) ? "Name is required" : "",
        email: (editingId && !String(editData.email || "").trim()) ? "Email is required" : (editingId && !isValidEmail(editData.email) ? "Enter a valid email" : ""),
        position: (editingId && !String(editData.position || "").trim()) ? "Position is required" : "",
    };
    const isEditValid = !editErrors.name && !editErrors.email && !editErrors.position;

    const normalizedQuery = search.trim().toLowerCase();
    const filteredEmployees = normalizedQuery
        ? employees.filter((e) =>
            (e.name || "").toLowerCase().includes(normalizedQuery) ||
            (e.email || "").toLowerCase().includes(normalizedQuery) ||
            (e.position || "").toLowerCase().includes(normalizedQuery)
        )
        : employees;

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                minHeight: "100vh",
                backgroundColor: "#e0e0e0",
            }}
        >
            {/* Gradient bar with title */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(90deg, #065f46, #064e3b)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    width: "90%",
                    maxWidth: "900px",
                    margin: "0 auto 16px",
                    boxShadow: "0 8px 20px rgba(6, 78, 59, 0.35)",
                }}
            >
                <div style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "0.3px", textAlign: "center" }}>
                    Employee List
                </div>
            </div>

            {/* Toolbar with search and actions */}
            <div style={{
                width: "90%",
                maxWidth: "900px",
                margin: "0 auto 12px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, or position"
                        style={{
                            width: "280px",
                            padding: "10px 12px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            outline: "none",
                            background: "#ffffff",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                        }}
                    />
                    <div style={{ color: "#334155", fontSize: "14px", padding: "6px 10px", background: "#f1f5f9", borderRadius: "999px", whiteSpace: "nowrap" }}>
                        {filteredEmployees.length} result{filteredEmployees.length === 1 ? "" : "s"}
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "12px" }}>
                    <button
                        onClick={() => navigate("/employees-add")}
                        style={{
                            padding: "10px 16px",
                            background: "linear-gradient(90deg, #22c55e, #16a34a)",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "10px",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 8px 16px rgba(34,197,94,0.25)",
                            transition: "transform 120ms ease, box-shadow 120ms ease",
                        }}
                        onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(1px)')}
                        onMouseUp={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        + Add Employee
                    </button>
                </div>
            </div>

            {/* Employee table */}
            <table
                style={{
                    width: "90%",
                    maxWidth: "900px",
                    margin: "0 auto",
                    borderCollapse: "collapse",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
            >
                <thead>
                <tr style={{ backgroundColor: "#f8fafc", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "14px 12px", position: "sticky", top: 0, background: "#f8fafc", zIndex: 1 }}>Name</th>
                    <th style={{ padding: "14px 12px", position: "sticky", top: 0, background: "#f8fafc", zIndex: 1 }}>Email</th>
                    <th style={{ padding: "14px 12px", position: "sticky", top: 0, background: "#f8fafc", zIndex: 1 }}>Position</th>
                    <th style={{ padding: "14px 12px", position: "sticky", top: 0, background: "#f8fafc", zIndex: 1, textAlign: "center" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployees.length === 0 ? (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                            <div style={{ padding: "10px 0", color: "#475569" }}>No employees found</div>
                            <button
                                onClick={() => navigate("/employees-add")}
                                style={{
                                    padding: "8px 14px",
                                    background: "#4caf50",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                }}
                            >
                                Add your first employee
                            </button>
                        </td>
                    </tr>
                ) : (
                    filteredEmployees.map((emp, index) => (
                        <tr
                            key={emp.id}
                            style={{
                                backgroundColor: hoveredId === emp.id ? "#eef2ff" : (index % 2 === 0 ? "#f9f9f9" : "#fff"),
                                transition: "background-color 120ms ease-in-out",
                            }}
                            onMouseEnter={() => setHoveredId(emp.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <td style={{ padding: "12px" }}>
                                {editingId === emp.id ? (
                                    <div style={{ display: "grid", rowGap: "6px" }}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleChange}
                                            style={{ padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                                        />
                                        {editErrors.name && (
                                            <span style={{ color: "#dc2626", fontSize: "12px" }}>{editErrors.name}</span>
                                        )}
                                    </div>
                                ) : (
                                    emp.name
                                )}
                            </td>
                            <td style={{ padding: "12px" }}>
                                {editingId === emp.id ? (
                                    <div style={{ display: "grid", rowGap: "6px" }}>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editData.email}
                                            onChange={handleChange}
                                            style={{ padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                                        />
                                        {editErrors.email && (
                                            <span style={{ color: "#dc2626", fontSize: "12px" }}>{editErrors.email}</span>
                                        )}
                                    </div>
                                ) : (
                                    emp.email
                                )}
                            </td>
                            <td style={{ padding: "12px" }}>
                                {editingId === emp.id ? (
                                    <div style={{ display: "grid", rowGap: "6px" }}>
                                        <input
                                            type="text"
                                            name="position"
                                            value={editData.position}
                                            onChange={handleChange}
                                            style={{ padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: "6px" }}
                                        />
                                        {editErrors.position && (
                                            <span style={{ color: "#dc2626", fontSize: "12px" }}>{editErrors.position}</span>
                                        )}
                                    </div>
                                ) : (
                                    emp.position
                                )}
                            </td>
                            <td style={{ padding: "12px", textAlign: "center", whiteSpace: "nowrap" }}>
                                {editingId === emp.id ? (
                                    <>
                                        <button
                                            onClick={() => { if (isEditValid) { handleSave(emp.id); } }}
                                            style={{
                                                padding: "6px 12px",
                                                background: isEditValid ? "#dcfce7" : "#e5e7eb",
                                                color: isEditValid ? "#166534" : "#6b7280",
                                                border: isEditValid ? "1px solid #bbf7d0" : "1px solid #e5e7eb",
                                                borderRadius: "999px",
                                                cursor: "pointer",
                                                marginRight: "6px",
                                                fontWeight: 700,
                                                opacity: isEditValid ? 1 : 0.8,
                                            }}
                                            disabled={!isEditValid}
                                        >
                                            Save
                                        </button>
                                        <button onClick={handleCancel} style={{ padding: "6px 12px", background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca", borderRadius: "999px", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(emp)} style={{ padding: "6px 12px", background: "#dbeafe", color: "#1e3a8a", border: "1px solid #bfdbfe", borderRadius: "999px", cursor: "pointer", fontWeight: 600, marginRight: "6px" }}>Edit</button>
                                        <button onClick={() => handleDelete(emp.id)} style={{ padding: "6px 12px", background: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca", borderRadius: "999px", cursor: "pointer", fontWeight: 600 }}>Delete</button>
                                    </>
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
