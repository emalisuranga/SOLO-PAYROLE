import { PrismaClient } from '@prisma/client';
import { Employee } from '../types/employee';

const prisma = new PrismaClient();

export const createEmployee = async (employee: Employee) => {
  console.log("test")
  const result = await prisma.personalInfo.create({
    data: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      phone: employee.phone,
      address: employee.address,
      dateOfBirth: new Date(employee.dateOfBirth),
      joinDate: new Date(employee.joinDate),
      department: employee.department,
      bankDetails: {
        create: {
          bankAccountNumber: employee.bankAccountNumber,
          bankName: employee.bankName,
          branchCode: employee.branchCode,
        },
      },
      salaryDetails: {
        create: {
          basicSalary: employee.basicSalary,
          overtimePay: employee.overtimePay,
          transportationCosts: employee.transportationCosts,
          familyAllowance: employee.familyAllowance,
          attendanceAllowance: employee.attendanceAllowance,
          leaveAllowance: employee.leaveAllowance,
          specialAllowance: employee.specialAllowance,
        },
      },
    },
  });
  return result;
};