import { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import TopBar from "./components/TopBar.jsx";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import Inventory from "./components/inventory/Inventory"; // Import the Inventory component

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <TopBar 
        onEmployeesClick={() => navigate("/employees")}
        onInventoryClick={() => navigate("/inventory")}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Routes>
          {/* Default route - you can change this to your preferred landing page */}
          <Route path="/" element={
            <>
              <div className="welcome-section">
                <div>
                  <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                  </a>
                  <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img src="/react.svg" className="logo react" alt="React logo" />
                  </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                  <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                  </button>
                  <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                  </p>
                </div>
                <p className="read-the-docs">
                  Click on the Vite and React logos to learn more
                </p>
              </div>
            </>
          } />
          
          {/* Employee Routes */}
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees-add" element={<AddEmployee />} />
          
          {/* Inventory Route */}
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;