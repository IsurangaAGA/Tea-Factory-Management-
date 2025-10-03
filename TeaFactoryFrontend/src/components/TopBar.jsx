import React from "react";
import { useNavigate } from "react-router-dom";

function TopBar({ onEmployeesClick }) {
    const navigate = useNavigate();
    return (
        <div
            style={{
                width: "100%",
                maxWidth: "100%",
                backgroundColor: "#064e3b",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 20px",
                boxSizing: "border-box",
                color: "white",
            }}
        >


            <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
                <button
                    onClick={() => navigate("/employees")}
                    style={{
                        backgroundColor: "white",
                        color: "#075694",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Employees
                </button>
                <button
                    onClick={() => navigate("/tasks")}
                    style={{
                        backgroundColor: "white",
                        color: "#065f46",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Tasks
                </button>
            </div>
        </div>
    );
}

export default TopBar;
