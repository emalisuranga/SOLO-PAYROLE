import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Page/Dashboard';
import Employee from '../Page/Employee/Employee';
import Payroll from '../Page/Payroll';
import Settings from '../Page/Settings';
import AddEmployee from '../Page/Employee/AddEmployee';
import AddSalaryDetails from '../Page/Payroll/AddSalaryDetails';
import Payslip from '../Page/Payroll/Payslip2';
import EmployeeDetails from '../Page/Employee/EmployeeDetails';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/employee" element={<Employee />} />
    <Route path="/payroll" element={<Payroll />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/addemployee" element={<AddEmployee />} />
    <Route path="/add-salary-details" element={<AddSalaryDetails />} />
    <Route path="/payslip" element={<Payslip />} />
    <Route path="/employee/:id" element={<EmployeeDetails />} />
  </Routes>
);

export default AppRoutes;