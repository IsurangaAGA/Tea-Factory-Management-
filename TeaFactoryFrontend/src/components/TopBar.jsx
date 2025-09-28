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


            <button
                onClick={() => navigate("/employees")}
                style={{
                    backgroundColor: "white",
                    color: "#075694",
                    padding: "8px 16px",
                    border: "none",
                    marginLeft: "auto",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
            >
                Employees
            </button>
        </div>
    );
}

export default TopBar;
