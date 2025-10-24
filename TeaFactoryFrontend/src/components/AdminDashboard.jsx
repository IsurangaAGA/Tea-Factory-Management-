import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EMPLOYEES_API = "http://localhost:8080/employees";
const TASKS_API = "http://localhost:8080/tasks";
const INVENTORY_API = "http://localhost:8080/inventory";
const PURCHASE_API = "http://localhost:8080/purchase-orders";

function AdminDashboard() {
    const navigate = useNavigate();

    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);
    const [totalInventory, setTotalInventory] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    const [recentEmployees, setRecentEmployees] = useState([]);
    const [recentTasks, setRecentTasks] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        axios.get(EMPLOYEES_API)
            .then(res => {
                setTotalEmployees(res.data.length);
                setRecentEmployees(res.data.slice(-5).reverse());
            })
            .catch(console.error);

        axios.get(TASKS_API)
            .then(res => {
                setTotalTasks(res.data.length);
                setRecentTasks(res.data.slice(-5).reverse());
            })
            .catch(console.error);

        axios.get(INVENTORY_API)
            .then(res => setTotalInventory(res.data.length))
            .catch(console.error);

        axios.get(PURCHASE_API)
            .then(res => {
                setTotalOrders(res.data.length);
                setRecentOrders(res.data.slice(-5).reverse());
            })
            .catch(console.error);
    }, []);

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div style={{
            padding: "24px",
            minHeight: "100vh",
            fontFamily: "'Inter', sans-serif",
            backgroundColor: "#f3f4f6",
            display: "flex",
            justifyContent: "center"
        }}>
            <div style={{ width: "100%", maxWidth: "1200px" }}>

                {/* Header */}
                <div style={{
                    marginBottom: "24px",
                    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                    padding: "20px 24px",
                    borderRadius: "12px",
                    color: "white",
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}>
                    <h1 style={{ margin: 0, fontSize: "28px" }}>Admin Dashboard</h1>
                    <p style={{ margin: 0, fontSize: "16px", opacity: 0.85 }}>Tea Factory Management System</p>
                </div>

                {/* KPI Cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "16px",
                    marginBottom: "24px"
                }}>
                    {[
                        { title: "Total Employees", value: totalEmployees, color: "#2563eb" },
                        { title: "Total Tasks", value: totalTasks, color: "#10b981" },
                        { title: "Inventory Items", value: totalInventory, color: "#f59e0b" },
                        { title: "Purchase Orders", value: totalOrders, color: "#6366f1" }
                    ].map((card, i) => (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "16px",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease"
                        }}>
                            <div style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "10px",
                                backgroundColor: card.color + "33",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "20px",
                                color: card.color
                            }}>
                                📊
                            </div>
                            <div>
                                <div style={{ fontSize: "14px", fontWeight: 600, color: "#6b7280", marginBottom: "4px" }}>{card.title}</div>
                                <div style={{ fontSize: "24px", fontWeight: 700, color: "#111827" }}>{card.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Access */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "16px",
                    marginBottom: "24px"
                }}>
                    {[
                        { label: "Add Employee", icon: "➕", path: "/employees-add" },
                        { label: "Add Task", icon: "📝", path: "/tasks-add" },
                        { label: "Manage Inventory", icon: "📦", path: "/inventory" },
                        { label: "View Orders", icon: "🧾", path: "/purchase-orders" }
                    ].map((btn, i) => (
                        <button key={i} onClick={() => navigateTo(btn.path)} style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "16px",
                            borderRadius: "12px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "14px",
                            transition: "all 0.2s ease",
                        }}>
                            <span style={{ fontSize: "24px", marginBottom: "6px" }}>{btn.icon}</span>
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Recent Activities */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "24px"
                }}>
                    <div style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}>
                        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#111827" }}>Recent Employees</h2>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {recentEmployees.length > 0 ? recentEmployees.map((emp, i) => (
                                <li key={i} style={{ padding: "10px", borderBottom: "1px solid #e5e7eb", fontSize: "14px" }}>{emp.name} - {emp.position}</li>
                            )) : <li style={{ padding: "10px", fontSize: "14px", color: "#9ca3af" }}>No recent employees</li>}
                        </ul>
                    </div>

                    <div style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}>
                        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#111827" }}>Recent Tasks</h2>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {recentTasks.length > 0 ? recentTasks.map((task, i) => (
                                <li key={i} style={{ padding: "10px", borderBottom: "1px solid #e5e7eb", fontSize: "14px" }}>{task.title} - {task.assignedTo} ({task.status})</li>
                            )) : <li style={{ padding: "10px", fontSize: "14px", color: "#9ca3af" }}>No recent tasks</li>}
                        </ul>
                    </div>
                </div>

                {/* Recent Orders */}
                <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                }}>
                    <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#111827" }}>Recent Orders</h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                            <li key={i} style={{ padding: "10px", borderBottom: "1px solid #e5e7eb", fontSize: "14px" }}>
                                Order #{order.id} - {order.customerName || "Customer"} ({order.status || "Pending"})
                            </li>
                        )) : <li style={{ padding: "10px", fontSize: "14px", color: "#9ca3af" }}>No recent orders</li>}
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
