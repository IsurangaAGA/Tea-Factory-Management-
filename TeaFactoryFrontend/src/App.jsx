import { Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";

function App() {
    return (
        <div>

            <Routes>
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees-add" element={<AddEmployee />} />
            </Routes>
        </div>
    );
}

export default App;
