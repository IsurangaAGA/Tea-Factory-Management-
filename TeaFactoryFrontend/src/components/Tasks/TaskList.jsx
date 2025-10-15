import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/tasks";

function TaskList() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ title: "", description: "", assignedTo: "", status: "Pending" });

    useEffect(() => {
        axios.get(API_URL).then((res) => setTasks(res.data)).catch((err) => console.error("Error fetching tasks:", err));
    }, []);

    const handleEditClick = (t) => {
        setEditingId(t.id);
        setEditData({ title: t.title, description: t.description, assignedTo: t.assignedTo, status: t.status });
    };

    const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

    const handleSave = (id) => {
        if (!editData.title.trim() || !editData.description.trim() || !editData.assignedTo.trim()) return;
        axios.put(`${API_URL}/${id}`, editData)
            .then((res) => {
                setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
                setEditingId(null);
            });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this task?")) return;
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter((t) => t.id !== id));
    };

    return (
        <div style={{ padding: "20px", minHeight: "100vh", background: "#f3f4f6", fontFamily: "Segoe UI, sans-serif" }}>
            <div style={{
                width: "90%", maxWidth: "900px", margin: "0 auto 16px", padding: "16px 20px",
                background: "linear-gradient(90deg, #1b5e20, #388e3c)", borderRadius: "12px",
                textAlign: "center", color: "#fff", boxShadow: "0 6px 16px rgba(0,0,0,0.25)"
            }}>
                <div style={{ fontSize: "24px", fontWeight: 700 }}>Tasks</div>
            </div>

            <div style={{ width: "90%", maxWidth: "900px", margin: "0 auto 12px", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => navigate("/tasks-add")}
                        style={{ padding: "10px 16px", background: "linear-gradient(90deg, #2e7d32, #43a047)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer" }}>
                    + Add Task
                </button>
            </div>

            <table style={{
                width: "90%", maxWidth: "900px", margin: "0 auto", borderCollapse: "collapse",
                background: "#fff", borderRadius: "10px", overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
            }}>
                <thead>
                <tr style={{ background: "#1b5e20", color: "#fff", textAlign: "left" }}>
                    <th style={{ padding: "12px" }}>Title</th>
                    <th style={{ padding: "12px" }}>Description</th>
                    <th style={{ padding: "12px" }}>Assigned To</th>
                    <th style={{ padding: "12px" }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "16px", color: "#666" }}>No tasks found</td>
                    </tr>
                ) : (
                    tasks.map((t, i) => (
                        <tr key={t.id} style={{ background: i % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
                            <td style={{ padding: "12px" }}>
                                {editingId === t.id ? (
                                    <input name="title" value={editData.title} onChange={handleChange}
                                           style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }} />
                                ) : t.title}
                            </td>
                            <td style={{ padding: "12px" }}>
                                {editingId === t.id ? (
                                    <input name="description" value={editData.description} onChange={handleChange}
                                           style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }} />
                                ) : t.description}
                            </td>
                            <td style={{ padding: "12px" }}>
                                {editingId === t.id ? (
                                    <input name="assignedTo" value={editData.assignedTo} onChange={handleChange}
                                           style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }} />
                                ) : t.assignedTo}
                            </td>
                            <td style={{ padding: "12px" }}>
                                {editingId === t.id ? (
                                    <select name="status" value={editData.status} onChange={handleChange}
                                            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "6px" }}>
                                        <option>Pending</option>
                                        <option>In Progress</option>
                                        <option>Done</option>
                                    </select>
                                ) : t.status}
                            </td>
                            <td style={{ padding: "12px", textAlign: "center", whiteSpace: "nowrap" }}>
                                {editingId === t.id ? (
                                    <>
                                        <button onClick={() => handleSave(t.id)} style={{ padding: "6px 12px", background: "#43a047", color: "#fff", border: "none", borderRadius: "999px", cursor: "pointer", fontWeight: 600, marginRight: "6px" }}>Save</button>
                                        <button onClick={() => setEditingId(null)} style={{ padding: "6px 12px", background: "#e53935", color: "#fff", border: "none", borderRadius: "999px", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(t)} style={{ padding: "6px 12px", background: "#1e88e5", color: "#fff", border: "none", borderRadius: "999px", cursor: "pointer", fontWeight: 600, marginRight: "6px" }}>Edit</button>
                                        <button onClick={() => handleDelete(t.id)} style={{ padding: "6px 12px", background: "#e53935", color: "#fff", border: "none", borderRadius: "999px", cursor: "pointer", fontWeight: 600 }}>Delete</button>
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

export default TaskList;
