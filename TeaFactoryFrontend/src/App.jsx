import EmployeeList from "./components/employee/EmployeeList";

function App() {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#e0e0e0" }}>

            <div
                style={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    textAlign: "center",
                    fontSize: "28px",
                    fontWeight: "bold",
                    padding: "20px 0",
                }}
            >
                Tea Factory
            </div>

            <EmployeeList />
        </div>
    );
}

export default App;
