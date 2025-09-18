import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/employees";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => setEmployees(res.data))
            .catch((err) => console.error("Error fetching employees:", err));
    }, []);

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
            >Employee List
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
                </tr>
                </thead>
                <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
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
                            <td style={{ padding: "12px" }}>{emp.name}</td>
                            <td style={{ padding: "12px" }}>{emp.email}</td>
                            <td style={{ padding: "12px" }}>{emp.position}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
