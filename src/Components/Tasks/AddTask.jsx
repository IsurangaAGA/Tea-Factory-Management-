import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TASK_API = "http://localhost:8080/tasks";
const EMPLOYEE_API = "http://localhost:8080/employees";

function AddTask() {
    const navigate = useNavigate();
    const [task, setTask] = useState({ title: "", description: "", assignedTo: "", status: "Pending" });
    const [employees, setEmployees] = useState([]);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");

    useEffect(() => {
        axios.get(EMPLOYEE_API)
            .then(res => setEmployees(res.data))
            .catch(err => console.error("Error fetching employees:", err));
    }, []);

    const handleChange = (e) => setTask({ ...task, [e.target.name]: e.target.value });
    const isValid = () => task.title && task.description && task.assignedTo;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg(""); setErr("");
        if (!isValid()) { setErr("Please fill all fields"); return; }
        setSaving(true);
        try {
            await axios.post(TASK_API, task);
            setMsg("Task saved successfully!");
            setTask({ title: "", description: "", assignedTo: "", status: "Pending" });
        } catch (e) {
            setErr("Failed to save task");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f5f5f5", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>

            {/* Header */}
            <div style={{
                background: "linear-gradient(90deg, #1b5e20, #388e3c)",
                color: "white",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "20px",
                textAlign: "center",
                fontSize: "26px",
                fontWeight: "bold",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.3)"
            }}>
                Add Task
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{
                maxWidth: "500px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                backgroundColor: "#fff",
                padding: "25px",
                borderRadius: "10px",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.15)"
            }}>
                {msg && <div style={{ background: "#d1fae5", color: "#065f46", padding: "10px", borderRadius: "8px" }}>{msg}</div>}
                {err && <div style={{ background: "#fee2e2", color: "#7f1d1d", padding: "10px", borderRadius: "8px" }}>{err}</div>}

                <div>
                    <label>Title</label>
                    <input name="title" value={task.title} onChange={handleChange} placeholder="Task title" style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>

                <div>
                    <label>Description</label>
                    <input name="description" value={task.description} onChange={handleChange} placeholder="Short description" style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>

                <div>
                    <label>Assign To</label>
                    <select name="assignedTo" value={task.assignedTo} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}>
                        <option value="">Select Employee</option>
                        {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
                    </select>
                </div>

                <div>
                    <label>Status</label>
                    <select name="status" value={task.status} onChange={handleChange} style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Done</option>
                    </select>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" disabled={!isValid() || saving} style={{
                        padding: "12px 20px",
                        background: "#2e7d32",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "10px",
                        cursor: saving ? "not-allowed" : "pointer"
                    }}>
                        {saving ? "Saving..." : "Save Task"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTask;
