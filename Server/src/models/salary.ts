import { PrismaClient } from '@prisma/client';
import { Salary } from '../types/salary';

const prisma = new PrismaClient();

export const addSalaryDetails = async (salary: Salary) => {
    // Check if the employee exists
    const employeeExists = await prisma.personalInfo.findUnique({
        where: { id: salary.employeeId },
    });

    if (!employeeExists) {
        throw new Error(`Employee with ID ${salary.employeeId} does not exist.`);
    }

    const now = new Date();
    const lastMonth = now.getMonth() === 0 ? 12 : now.getMonth();
    const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    // Proceed with adding salary details
    return await prisma.paymentDetails.create({
        data: {
            employeeId: salary.employeeId,
            month: lastMonth,
            year: lastMonthYear,
            workDetails: {
                create: {
                    scheduledWorkingDays: salary.workDetails.scheduledWorkingDays,
                    numberOfWorkingDays: salary.workDetails.numberOfWorkingDays,
                    numberOfPaidHolidays: salary.workDetails.numberOfPaidHolidays,
                    remainingPaidVacationDays: salary.workDetails.remainingPaidVacationDays,
                    overtime: salary.workDetails.overtime,
                    timeLate: salary.workDetails.timeLate,
                    timeLeavingEarly: salary.workDetails.timeLeavingEarly,
                },
            },
            earnings: {
                create: {
                    basicSalary: salary.earnings.basicSalary,
                    overtimePay: salary.earnings.overtimePay,
                    transportationCosts: salary.earnings.transportationCosts,
                    attendanceAllowance: salary.earnings.attendanceAllowance,
                    familyAllowance: salary.earnings.familyAllowance,
                    leaveAllowance: salary.earnings.leaveAllowance,
                    specialAllowance: salary.earnings.specialAllowance,
                },
            },
            deductions: {
                create: {
                    healthInsurance: salary.deductions.healthInsurance,
                    employeePensionInsurance: salary.deductions.employeePensionInsurance,
                    employmentInsurance: salary.deductions.employmentInsurance,
                    longTermCareInsurance: salary.deductions.longTermCareInsurance,
                    socialInsurance: salary.deductions.socialInsurance,
                    incomeTax: salary.deductions.incomeTax,
                    residentTax: salary.deductions.residentTax,
                    advancePayment: salary.deductions.advancePayment,
                    yearEndAdjustment: salary.deductions.yearEndAdjustment,
                },
            },
        },
    });
};