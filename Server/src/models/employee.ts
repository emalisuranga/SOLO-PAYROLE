import { PrismaClient } from '@prisma/client';
import { Employee } from '../types/employee';

const prisma = new PrismaClient();

export const createEmployee = async (employee: Employee) => {
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
          basicSalary: parseFloat(employee.basicSalary as unknown as string),
          overtimePay: parseFloat(employee.overtimePay as unknown as string),
          transportationCosts: parseFloat(employee.transportationCosts as unknown as string),
          familyAllowance: parseFloat(employee.familyAllowance as unknown as string),
          attendanceAllowance: parseFloat(employee.attendanceAllowance as unknown as string),
          leaveAllowance: parseFloat(employee.leaveAllowance as unknown as string),
          specialAllowance: parseFloat(employee.specialAllowance as unknown as string),
        },
      },
    },
  });
  return result;
};

export const getAllEmployees = async () => {
  const result = await prisma.personalInfo.findMany({
    include: {
      bankDetails: true,
      salaryDetails: true,
    },
    orderBy: {
      id: 'asc', 
    },
  });
  return result;
};

export const getEmployeeById = async (id: number) => {
  const employee = await prisma.personalInfo.findUnique({
    where: { id },
    include: {
      bankDetails: true,
      salaryDetails: true,
    },
  });
  return employee;
};

export const updateEmployee = async (id: number, employee: Employee) => {
  const result = await prisma.personalInfo.update({
    where: { id },
    data: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      phone: employee.phone,
      address: employee.address,
      dateOfBirth: new Date(employee.dateOfBirth),
      joinDate: new Date(employee.joinDate),
      department: employee.department,
      bankDetails: {
        upsert: {
          create: {
            bankAccountNumber: employee.bankAccountNumber,
            bankName: employee.bankName,
            branchCode: employee.branchCode,
          },
          update: {
            bankAccountNumber: employee.bankAccountNumber,
            bankName: employee.bankName,
            branchCode: employee.branchCode,
          },
          where: {
            id: employee.bankDetails ? employee.bankDetails[0]?.id : 0,
          },
        },
      },
      salaryDetails: {
        upsert: {
          create: {
            basicSalary: parseFloat(employee.basicSalary as unknown as string),
            overtimePay: parseFloat(employee.overtimePay as unknown as string),
            transportationCosts: parseFloat(employee.transportationCosts as unknown as string),
            familyAllowance: parseFloat(employee.familyAllowance as unknown as string),
            attendanceAllowance: parseFloat(employee.attendanceAllowance as unknown as string),
            leaveAllowance: parseFloat(employee.leaveAllowance as unknown as string),
            specialAllowance: parseFloat(employee.specialAllowance as unknown as string),
          },
          update: {
            basicSalary: parseFloat(employee.basicSalary as unknown as string),
            overtimePay: parseFloat(employee.overtimePay as unknown as string),
            transportationCosts: parseFloat(employee.transportationCosts as unknown as string),
            familyAllowance: parseFloat(employee.familyAllowance as unknown as string),
            attendanceAllowance: parseFloat(employee.attendanceAllowance as unknown as string),
            leaveAllowance: parseFloat(employee.leaveAllowance as unknown as string),
            specialAllowance: parseFloat(employee.specialAllowance as unknown as string),
          },
          where: {
            id: employee.salaryDetails ? employee.salaryDetails[0]?.id : 0,
          },
        },
      },
    },
  });
  return result;
};