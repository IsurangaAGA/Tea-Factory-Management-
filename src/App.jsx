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

// import React from 'react';
// import MultiStepForm from './components/TeaIntake/MultiStepForm';
//
// function App() {
//   return (
//     <div className="App">
//       <MultiStepForm />
//     </div>
//   );
// }
//
// import TeaLeavesIntake from './components/TeaIntake/TeaLeavesIntake';
//
// function App() {
//   return (
//     <div className="App">
//       <TeaLeavesIntake />
//     </div>
//   );
// }
//
//
// export default App;

// import Track from './components/Progress/Track';
//
// function App() {
//   return (
//     <div className="App">
//       <Track />
//     </div>
//   );
// }
//
//
// export default App;


// import TeaBatch from './components/TeaBatch/TeaBatch';
//
// function App() {
//   return (
//     <div className="App">
//       <TeaBatch />
//     </div>
//   );
// }
//
//
// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

// Existing components
import TopBar from "./components/TopBar.jsx";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import TaskList from "./components/Tasks/TaskList.jsx";
import AddTask from "./components/Tasks/AddTask.jsx";
import Inventory from "./components/Inventory/Inventory";
import Home from "./components/home/Home.jsx";
import Suppliers from "./components/supplier/Suppliers";
import PurchaseOrders from "./components/PurchaseOrders/PurchaseOrders";

// New shop components
import Navigation from "./Components/shop/Navigation";
import ShopPage from "./Components/pages/ShopPage";
import OrderManagement from "./Components/pages/OrderManagement";
import AuthContainer from "./components/Auth/AuthContainer";

import "./App.css";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Cart state
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("teaFactoryCart");
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemCount(totalItems);
      } else {
        setCartItemCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      {/* TopBar for admin side - hidden on home page */}
      {!isHomePage && (
        <TopBar
          onEmployeesClick={() => navigate("/employees")}
          onInventoryClick={() => navigate("/inventory")}
          onSuppliersClick={() => navigate("/suppliers")}
          onPurchaseOrdersClick={() => navigate("/purchase-orders")}
          onTasksClick={() => navigate("/tasks")}
        />
      )}

      {/* Navigation for shop side - hidden on home page */}
      {!isHomePage && <Navigation cartItemCount={cartItemCount} />}

      <main className="main-content">
        <Routes>
          {/* Admin routes */}
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees-add" element={<AddEmployee />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks-add" element={<AddTask />} />

          {/* Shop routes */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/orders" element={<OrderManagement />} />

          {/* Auth routes */}
          <Route path="/auth" element={<AuthContainer />} />

          {/* Redirect example */}
          <Route path="/shop-home" element={<Navigate to="/shop" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// Wrap AppContent in Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

