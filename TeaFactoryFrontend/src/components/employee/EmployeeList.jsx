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
        <div style={{ padding: "20px" }}>
            <h2>Employee List</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                </tr>
                </thead>
                <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>No employees found</td>
                    </tr>
                ) : (
                    employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
