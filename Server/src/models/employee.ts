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
  const bankDetailsExists = await prisma.bankDetails.findUnique({
    where: { employeeId: id },
  });

  const salaryDetailsExists = await prisma.salaryDetails.findUnique({
    where: { employeeId: id },
  });

  if (!bankDetailsExists || !salaryDetailsExists) {
    throw new Error("Related records not found");
  }

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
        update: {
          bankAccountNumber: employee.bankAccountNumber,
          bankName: employee.bankName,
          branchCode: employee.branchCode,
        },
      },
      salaryDetails: {
        update: {
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
    include: { salaryDetails: true, bankDetails: true },
  });
  return result;
};

export const deleteEmployee = async (id: number) => {
  const result = await prisma.$transaction(async (prisma) => {
    await prisma.bankDetails.deleteMany({
      where: { employeeId: id },
    });
    await prisma.salaryDetails.deleteMany({
      where: { employeeId: id },
    });
    const deletedEmployee = await prisma.personalInfo.delete({
      where: { id },
    });

    return deletedEmployee;
  });

  return result;
};

export const getEmployeeNamesAndIds = async () => {
  const employees = await prisma.personalInfo.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });
  return employees;
};