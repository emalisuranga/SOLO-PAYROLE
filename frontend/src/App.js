import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import Employee from "./Page/Employee/Employee";
import Payroll from "./Page/Payroll";
import Settings from "./Page/Settings";
import AddEmployee from "./Page/Employee/AddEmployee";
import AddSalaryDetails from "./Page/Payroll/AddSalaryDetails";
import Payslip from "./Page/Payroll/Payslip2";
import SideBar from "./Component/SideBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <SideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "40px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/addemployee" element={<AddEmployee />} />
              <Route path="/add-salary-details" element={<AddSalaryDetails />} />
              <Route path="/payslip" element={<Payslip />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </>
  );
}
