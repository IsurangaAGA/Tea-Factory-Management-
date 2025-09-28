import { Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import TopBar from "./components/TopBar.jsx";
import Inventory from "./components/Inventory/Inventory";

function App() {
    return (
        <div>

            <TopBar onEmployeesClick={() => navigate("/employees")} />

            <Routes>

                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees-add" element={<AddEmployee />} />
                <Route path="/inventory" element={<Inventory />} />

            </Routes>
        </div>
    );
}

export default App;
