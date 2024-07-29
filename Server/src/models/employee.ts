import { PrismaClient } from '@prisma/client';
import { Employee } from '../types/employee';
import { createOrUpdatePaidHolidays } from '../models/leaveManagement';

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
      isDeleted: false,
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

  await createOrUpdatePaidHolidays(result.id, new Date(employee.joinDate));
  return result;
};

export const getAllEmployees = async () => {
  const result = await prisma.personalInfo.findMany({
    where: { isDeleted: false },
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
  const employee = await prisma.personalInfo.findFirst({
    where: { id, isDeleted: false },
    include: {
      bankDetails: true,
      salaryDetails: true,
      paidHolidays: {
        select: {
          remainingLeave: true,
        },
        where: {
          isValid: true,
        },
      },
    },
  });

  if (employee) {
    const remainingPaidVacationDays = employee.paidHolidays.reduce((acc, holiday) => acc + holiday.remainingLeave, 0);
    return { ...employee, remainingPaidVacationDays };
  }

  return null;
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
  const existingEmployee = await prisma.personalInfo.findUnique({
    where: { id: id, isDeleted: false },
  });

  if (!existingEmployee) {
    throw new Error(`Employee with ID ${id} does not exist.`);
  }

  const { joinDate, ...otherDetails } = employee;

  if (joinDate && new Date(joinDate).getTime() !== existingEmployee.joinDate.getTime()) {
    const currentPaidHoliday = await prisma.paidHolidays.findFirst({
      where: { employeeId: id, isValid: true },
    });

    const currentUsedLeave = currentPaidHoliday ? currentPaidHoliday.usedLeave : 0;

    await createOrUpdatePaidHolidays(id, new Date(joinDate), currentUsedLeave);
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

export const softDeleteEmployee = async (id: number) => {
  const employee = await prisma.personalInfo.update({
    where: { id },
    data: { isDeleted: true },
  });
  return employee;
};

export const getEmployeeNamesAndIds = async () => {
  const employees = await prisma.personalInfo.findMany({
    where: { isDeleted: false },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
    orderBy: {
      id: 'asc',
    },
  });
  return employees;
};