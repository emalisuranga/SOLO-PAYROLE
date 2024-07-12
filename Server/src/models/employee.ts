// src/models/employee.ts

import pool from '../config/db';

interface Employee {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  joinDate: string;
  department: string;
  bankAccountNumber: string;
  bankName: string;
  branchCode: string;
  basicSalary: number;
  overtimePay: number;
  transportationCosts: number;
  familyAllowance: number;
  attendanceAllowance: number;
  leaveAllowance: number;
  specialAllowance: number;
}

export const createEmployee = async (employee: Employee) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.execute(
      `INSERT INTO PersonalInfo 
      (first_name, last_name, phone, address, date_of_birth, join_date, department) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [employee.firstName, employee.lastName, employee.phone, employee.address, employee.dateOfBirth, employee.joinDate, employee.department]
    );

    const employeeId = (result as any).insertId;

    await connection.execute(
      `INSERT INTO BankDetails 
      (employee_id, bank_account_number, bank_name, branch_code) 
      VALUES (?, ?, ?, ?)`,
      [employeeId, employee.bankAccountNumber, employee.bankName, employee.branchCode]
    );

    await connection.execute(
      `INSERT INTO SalaryDetails 
      (employee_id, basic_salary, overtime_pay, transportation_costs, family_allowance, attendance_allowance, leave_allowance, special_allowance) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        employeeId, employee.basicSalary, employee.overtimePay, employee.transportationCosts, employee.familyAllowance,
        employee.attendanceAllowance, employee.leaveAllowance, employee.specialAllowance
      ]
    );

    await connection.commit();
    return employeeId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};