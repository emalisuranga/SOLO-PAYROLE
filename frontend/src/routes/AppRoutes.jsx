import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Page/Dashboard';
import Employee from '../Page/Employee/Employee';
// import Payroll from '../Page/Payroll';
import Settings from '../Page/Settings';
import AddEmployee from '../Page/Employee/AddEmployee';
import AddSalaryDetails from '../Page/Payroll/AddSalaryDetails';
import SalaryDetails from '../Page/Payroll/SalaryDetails';
import Payslip from '../Page/Payroll/Payslip2';
import EmployeeDetails from '../Page/Employee/EmployeeDetails';
import EditEmployee from "../Page/Employee/EditEmployee";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/employee" element={<Employee />} />
    {/* <Route path="/salary-details" element={<Payroll />} /> */}
    <Route path="/salary-details" element={<SalaryDetails />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/add-employee" element={<AddEmployee />} />
    <Route path="/add-salary-details" element={<AddSalaryDetails />} />
    <Route path="/payslip" element={<Payslip />} />
    <Route path="/employee/:id" element={<EmployeeDetails />} />
    <Route path="/employee/edit/:id" element={<EditEmployee />} />
    
  </Routes>
);

export default AppRoutes;