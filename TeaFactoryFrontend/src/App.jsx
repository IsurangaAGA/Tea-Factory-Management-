import { Routes, Route, useNavigate } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import TopBar from "./components/TopBar.jsx";
import Inventory from "./components/Inventory/Inventory";
import Home from "./components/home/Home.jsx";
import Suppliers from "./components/supplier/Suppliers";
import PurchaseOrders from "./components/PurchaseOrders/PurchaseOrders";
import "./App.css";

function App() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <TopBar 
                onEmployeesClick={() => navigate("/employees")} 
                onInventoryClick={() => navigate("/inventory")}
                onSuppliersClick={() => navigate("/suppliers")}
                onPurchaseOrdersClick={() => navigate("/purchase-orders")}
            />
            
            {/* Add main-content wrapper with proper spacing */}
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/employees-add" element={<AddEmployee />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/purchase-orders" element={<PurchaseOrders />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;