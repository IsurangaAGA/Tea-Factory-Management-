// import React from "react";
// import AuthContainer from "./components/Auth/AuthContainer";
// import 'boxicons/css/boxicons.min.css';
// import "./components/Auth/Auth.css";
//
// function App() {
//   return (
//     <div>
//       <AuthContainer />
//     </div>
//   );
// }
//
// export default App;


import { Routes, Route, useNavigate } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import TaskList from "./components/Tasks/TaskList.jsx";
import AddTask from "./components/Tasks/AddTask.jsx";
import TopBar from "./components/TopBar.jsx";
import Inventory from "./components/Inventory/Inventory";
import Home from "./components/home/Home.jsx";
import Suppliers from "./components/supplier/Suppliers";
import PurchaseOrders from "./components/PurchaseOrders/PurchaseOrders";
import "./App.css";
import TeaProductionCourses from "./components/TeaProductionCourses";
import MultiStepForm from "./components/TeaIntake/MultiStepForm";
import TeaLeavesIntake from "./components/TeaIntake/TeaLeavesIntake";
import TeaBatch from "./components/TeaBatch/TeaBatch";
import Track from "./components/Progress/Track";

function App() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <TopBar
                onEmployeesClick={() => navigate("/employees")}
                onInventoryClick={() => navigate("/inventory")}
                onSuppliersClick={() => navigate("/suppliers")}
                onPurchaseOrdersClick={() => navigate("/purchase-orders")}
                onTasksClick={() => navigate("/tasks")}
                onTeaProductionClick={() => navigate("/tea-production")}
            />

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/employees-add" element={<AddEmployee />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/purchase-orders" element={<PurchaseOrders />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/tasks-add" element={<AddTask />} />
                    <Route path="/tea-production" element={<TeaProductionCourses />} />
                    <Route path="/tea-intake-form" element={<MultiStepForm />} />
                    <Route path="/tea-intake-dashboard" element={<TeaLeavesIntake />} />
                    <Route path="/record-tea-batches" element={<TeaBatch />} />
                    <Route path="/tea-batches-dashboard" element={<Track />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
