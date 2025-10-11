import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/employees";

const AddEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        position: "",
    });
    const [touched, setTouched] = useState({ name: false, email: false, position: false });
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const isValidEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
    const errors = {
        name: employee.name.trim() ? "" : "Name is required",
        email: employee.email.trim() ? (isValidEmail(employee.email) ? "" : "Enter a valid email") : "Email is required",
        position: employee.position.trim() ? "" : "Position is required",
    };
    const isFormValid = !errors.name && !errors.email && !errors.position;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, position: true });
        setSuccessMsg("");
        setErrorMsg("");
        if (!isFormValid) return;
        setSubmitting(true);
        try {
            await axios.post(API_URL, employee);
            setSuccessMsg("Employee added successfully");
            setEmployee({ name: "", email: "", position: "" });
            setTouched({ name: false, email: false, position: false });
        } catch (error) {
            console.error("Error adding employee:", error);
            setErrorMsg("Failed to add employee. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            <div style={{
                maxWidth: "600px",
                margin: "0 auto 20px",
                background: "linear-gradient(90deg, #22c55e, #16a34a)",
                color: "white",
                padding: "18px 22px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 24px rgba(34,197,94,0.25)"
            }}>

                <h2 style={{ margin: 0, letterSpacing: "0.3px", textAlign: "center" }}>Add Employee</h2>
            </div>
            {successMsg && (
                <div style={{ maxWidth: "600px", margin: "0 auto 12px", background: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0", padding: "12px 16px", borderRadius: "8px" }}>{successMsg}</div>
            )}
            {errorMsg && (
                <div style={{ maxWidth: "600px", margin: "0 auto 12px", background: "#fef2f2", color: "#7f1d1d", border: "1px solid #fecaca", padding: "12px 16px", borderRadius: "8px" }}>{errorMsg}</div>
            )}
            <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#fff", padding: "24px", borderRadius: "14px", boxShadow: "0px 10px 24px rgba(0,0,0,0.08)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "14px" }}>
                    <label style={{ textAlign: "left", fontWeight: 600 }}>Name <span style={{ color: "#dc2626" }}>*</span></label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        value={employee.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        style={{ padding: "14px", fontSize: "16px", borderRadius: "10px", border: "1px solid #d1d5db", outline: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                    />
                    {touched.name && errors.name && (
                        <span style={{ color: "#dc2626", fontSize: "12px", textAlign: "left" }}>{errors.name}</span>
                    )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "14px" }}>
                    <label style={{ textAlign: "left", fontWeight: 600 }}>Email <span style={{ color: "#dc2626" }}>*</span></label>
                    <input
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        value={employee.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        style={{ padding: "14px", fontSize: "16px", borderRadius: "10px", border: "1px solid #d1d5db", outline: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                    />
                    {touched.email && errors.email && (
                        <span style={{ color: "#dc2626", fontSize: "12px", textAlign: "left" }}>{errors.email}</span>
                    )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "14px" }}>
                    <label style={{ textAlign: "left", fontWeight: 600 }}>Position <span style={{ color: "#dc2626" }}>*</span></label>
                    <input
                        type="text"
                        name="position"
                        placeholder="Job title"
                        value={employee.position}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        style={{ padding: "14px", fontSize: "16px", borderRadius: "10px", border: "1px solid #d1d5db", outline: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                    />
                    {touched.position && errors.position && (
                        <span style={{ color: "#dc2626", fontSize: "12px", textAlign: "left" }}>{errors.position}</span>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginTop: "8px" }}>
                    <div style={{ color: "#64748b", fontSize: "12px" }}>* All fields are required</div>
                    <button type="submit" disabled={!isFormValid || submitting} style={{ padding: "12px 18px", background: (!isFormValid || submitting) ? "#9ca3af" : "linear-gradient(90deg, #22c55e, #16a34a)",fontSize: "16px", color: "#fff", fontWeight: "bold", border: "none", borderRadius: "10px", cursor: (!isFormValid || submitting) ? "not-allowed" : "pointer", boxShadow: (!isFormValid || submitting) ? "none" : "0 8px 16px rgba(34,197,94,0.25)" }}>
                        {submitting ? "Saving..." : "Add Employee"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
