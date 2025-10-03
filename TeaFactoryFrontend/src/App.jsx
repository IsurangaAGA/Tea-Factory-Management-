import { Routes, Route, Link, useNavigate } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import TaskList from "./components/Tasks/TaskList.jsx";
import AddTask from "./components/Tasks/AddTask.jsx";
import TopBar from "./components/TopBar.jsx";

function App() {
    const navigate = useNavigate();
    return (
        <div>
            <TopBar />
            <Routes>
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees-add" element={<AddEmployee />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/tasks-add" element={<AddTask />} />
            </Routes>
        </div>
    );
}

export default App;
