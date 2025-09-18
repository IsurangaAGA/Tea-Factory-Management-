import { Routes, Route } from "react-router-dom";
import EmployeeList from "./components/employee/EmployeeList";

function App() {
    return (
        <Routes>
            <Route path="/employees" element={<EmployeeList />} />
        </Routes>
    );
}

export default App;
