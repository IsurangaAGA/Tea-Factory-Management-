// App.jsx 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Inventory from "./components/Inventory/Inventory";

function App() {
  return (
    <Router>
      <Routes>
        {/* Show Inventory page on root path */}
        <Route path="/" element={<Inventory />} />

        {/* Example: Hello React page */}
        <Route
          path="/hello"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <h1 className="text-3xl font-bold text-blue-600">Hello, React!</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
