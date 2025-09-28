import { Routes, Route, useNavigate } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import TopBar from "./components/TopBar.jsx";
import Inventory from "./components/Inventory/Inventory";
import Home from "./components/home/Home.jsx";
import "./App.css";

function App() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <TopBar 
                onEmployeesClick={() => navigate("/employees")} 
                onInventoryClick={() => navigate("/inventory")} 
            />
            
            {/* Add main-content wrapper with proper spacing */}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/employees-add" element={<AddEmployee />} />
                    <Route path="/inventory" element={<Inventory />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;