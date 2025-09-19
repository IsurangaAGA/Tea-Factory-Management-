import { Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";

function App() {
    return (
        <div>

            <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 20px", gap: "10px" }}>
                <Link to="/employees">
                    <button style={{ padding: "8px 16px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        Employee List
                    </button>
                </Link>
                <Link to="/employees-add">
                    <button style={{ padding: "8px 16px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        Add Employee
                    </button>
                </Link>
            </div>

            <Routes>
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees-add" element={<AddEmployee />} />
            </Routes>
        </div>
    );
}

export default App;
