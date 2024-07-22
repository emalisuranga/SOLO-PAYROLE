import { PrismaClient } from '@prisma/client';
import { Salary } from '../types/salary';

const prisma = new PrismaClient();

/**
 * Calculate the total earnings.
 * @param earnings - The earnings details.
 * @returns The total earnings.
 */
const calculateTotalEarnings = (earnings: Salary['earnings']): number => {
    return (
        earnings.overtimePay +
        earnings.transportationCosts +
        earnings.attendanceAllowance +
        earnings.familyAllowance +
        earnings.leaveAllowance +
        earnings.specialAllowance
    );
};

/**
 * Calculate the total deductions.
 * @param deductions - The deductions details.
 * @returns The total deductions.
 */
const calculateTotalDeductions = (deductions: Salary['deductions']): number => {
    return (
        deductions.healthInsurance +
        deductions.employeePensionInsurance +
        deductions.employmentInsurance +
        deductions.longTermCareInsurance +
        deductions.socialInsurance +
        deductions.incomeTax +
        deductions.residentTax +
        deductions.advancePayment +
        deductions.yearEndAdjustment
    );
};

/**
 * Add salary details for an employee.
 * @param salary - The salary details.
 * @throws Will throw an error if the employee does not exist.
 * @returns The created payment details.
 */
export const addSalaryDetails = async (salary: Salary) => {
    const employeeExists = await prisma.personalInfo.findUnique({
        where: { id: salary.employeeId },
    });

    if (!employeeExists) {
        throw new Error(`Employee with ID ${salary.employeeId} does not exist.`);
    }

    const existingSalary = await prisma.paymentDetails.findFirst({
        where: {
            employeeId: salary.employeeId,
            month: salary.month,
            year: salary.year,
        },
    });

    if (existingSalary) {
        throw new Error(`Salary details for employee ${salary.employeeId} for month ${salary.month} and year ${salary.year} already exist.`);
    }

    const totalEarnings = calculateTotalEarnings(salary.earnings);
    const totalDeductions = calculateTotalDeductions(salary.deductions);
    const netSalary = totalEarnings - totalDeductions;

    return await prisma.paymentDetails.create({
        data: {
            employeeId: salary.employeeId,
            month: salary.month,
            year: salary.year,
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
            totalEarnings: totalEarnings,
            totalDeductions: totalDeductions,
            netSalary: netSalary,
        },
    });
};