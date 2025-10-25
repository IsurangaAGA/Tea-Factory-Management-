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




//App 1
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//
// // 1. Layout Component
// import SidebarLayout from "./components/Sidebar/SidebarLayout";
//
// // 2. Page Components
// import MultiStepForm from "./components/TeaIntake/MultiStepForm";
// import TeaLeavesIntake from "./components/TeaIntake/TeaLeavesIntake";
// import TeaBatch from "./components/TeaBatch/TeaBatch";
// import Track from "./components/Progress/Track";
//
// // Test component to verify routing
// const TestComponent = () => (
//   <div style={{ padding: '20px', background: '#f0f0f0', border: '2px solid #007bff', borderRadius: '8px' }}>
//     <h1>🎉 Routing is Working!</h1>
//     <p>This is a test component to verify that React Router is functioning correctly.</p>
//     <p>If you can see this, the routing setup is working and the issue is with the specific components.</p>
//   </div>
// );
//
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Wrap all pages with SidebarLayout */}
//         <Route path="/" element={<SidebarLayout />}>
//           {/* Default Route: Redirects / to /tea-intake-dashboard */}
//           <Route
//             index
//             element={<Navigate to="/tea-intake-dashboard" replace />}
//           />
//
//           {/* Test route */}
//           <Route path="test" element={<TestComponent />} />
//
//           {/* Nested Content Routes (These render inside the SidebarLayout's <Outlet />) */}
//           <Route path="tea-intake-form" element={<MultiStepForm />} />
//           <Route path="tea-intake-dashboard" element={<TeaLeavesIntake />} />
//           <Route path="record-tea-batches" element={<TeaBatch />} />
//           <Route path="tea-batches-dashboard" element={<Track />} />
//         </Route>
//       </Routes>
//     </Router>
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
                </Routes>
            </main>
        </div>
    );
}

export default App;
