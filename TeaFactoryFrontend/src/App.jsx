import { Routes, Route, useNavigate } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import TaskList from "./components/Tasks/TaskList.jsx";
import AddTask from "./components/Tasks/AddTask.jsx";
import TopBar from "./components/TopBar.jsx";
import Inventory from "./components/Inventory/Inventory";
import Home from "./components/home/Home.jsx";
import Footer from './components/Footer';
import "./App.css";

function App() {
    const navigate = useNavigate();

    <div className="App">
      <Inventory />
    </div>

    return (
        <div className="App">
            <TopBar
                onEmployeesClick={() => navigate("/employees")}
                onInventoryClick={() => navigate("/inventory")}
                onTasksClick={()=>navigate("/tasks")}
            />

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/employees-add" element={<AddEmployee />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/tasks-add" element={<AddTask />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
