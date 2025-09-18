import { Routes, Route } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";

function App() {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#e0e0e0" }}>

            <div
                style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: "bold",
                    padding: "20px 0",
                }}
            >
                Tea Factory
            </div>

            <Routes>
                <Route path="/" element={<h1 style={{ textAlign: "center", marginTop: "20px" }}>Welcome to Tea Factory</h1>} />
                <Route path="/employees" element={<EmployeeList />} />
            </Routes>
        </div>
    );
}

export default App;
