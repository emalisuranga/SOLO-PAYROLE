import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Page/Dashboard';
import Employee from '../Page/Employee/Employee';
// import Payroll from '../Page/Payroll';
import Settings from '../Page/Settings';
import AddEmployee from '../Page/Employee/AddEmployee';
import AddSalaryDetails from '../Page/Payroll/AddSalaryDetails';
import SalaryDetails from '../Page/Payroll/SalaryDetails';
// import Payslip from '../Page/Reports/MainComponent';
import EmployeeDetails from '../Page/Employee/EmployeeDetails';
import EditEmployee from "../Page/Employee/EditEmployee";
import ViewSalaryDetails from '../Page/Payroll/ViewSalaryDetails';
import EditSalary from '../Page/Payroll/EditSalary';
import SalarySlipDetails from '../Page/Reports/SalarySlipDetails/SalarySlipDetails';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/employee" element={<Employee />} />
    <Route path="/add-employee" element={<AddEmployee />} />
    <Route path="/add-salary-details" element={<AddSalaryDetails />} />
    <Route path="/employee/:id" element={<EmployeeDetails />} />
    <Route path="/employee/edit/:id" element={<EditEmployee />} />
    <Route path="/salary-details/view/:paymentId" element={<ViewSalaryDetails />} />
    <Route path="/salary-details" element={<SalaryDetails />} />
    <Route path="/salary-details/edit/:paymentId" element={<EditSalary />} />
    <Route path="/salary-slip/:employeeId/:paymentDetailsId" element={<SalarySlipDetails />} />
    {/* <Route path="/salary-slip" element={<SalarySlipDetails />} /> */}
    
  </Routes>
);

export default AppRoutes;