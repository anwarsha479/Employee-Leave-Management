import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import EmployeesPage from "./pages/EmployeesPage";
import LeavesPage from "./pages/LeavePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/departments" element={<DepartmentsPage />} />
        <Route
  path="/employees"
  element={<EmployeesPage />}
  
/>
<Route
  path="/leaves"
  element={<LeavesPage />}
/>

      </Routes>
    </BrowserRouter>
  );
}



export default App;
