import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/employees";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        position: "",
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, employee);
            alert("Employee added successfully!");
            setEmployee({ name: "", email: "", position: "" }); // reset form
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to add employee");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Employee</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "15px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                    style={{ padding: "15px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                    style={{ padding: "15px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={employee.position}
                    onChange={handleChange}
                    required
                    style={{ padding: "15px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <button type="submit" style={{ padding: "15px", backgroundColor: "#4caf50",fontSize: "18px", color: "#fff", fontWeight: "bold", border: "none", borderRadius: "10px", cursor: "pointer" }}>
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
