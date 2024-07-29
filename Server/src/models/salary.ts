import { PrismaClient } from '@prisma/client';
import { Salary } from '../types/salary';
import { createInitialLeaveRequest, adjustLeaveRequest } from '../models/leaveManagement';

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
        deductions.yearEndAdjustment +
        deductions.nonEmploymentDeduction // Add this line
    );
};

/**
 * Calculate non-employment deduction.
 * @param workDetails - The work details.
 * @param basicSalary - The basic salary.
 * @returns The non-employment deduction.
 */
const calculateNonEmploymentDeduction = (workDetails: Salary['workDetails'], basicSalary: number): number => {
    const { scheduledWorkingDays, numberOfWorkingDays, numberOfPaidHolidays } = workDetails;
    const deduction = ((scheduledWorkingDays - numberOfWorkingDays - numberOfPaidHolidays) * basicSalary) / scheduledWorkingDays;
    return Math.round(deduction);
};

/**
 * Add salary details for an employee.
 * @param salary - The salary details.
 * @throws Will throw an error if the employee does not exist.
 * @returns The created payment details.
 */
export const addSalaryDetails = async (salary: Salary) => {
    const employeeExists = await prisma.personalInfo.findUnique({
        where: { id: salary.employeeId, isDeleted: false },
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
    const nonEmploymentDeduction = calculateNonEmploymentDeduction(salary.workDetails, salary.earnings.basicSalary); // Calculate non-employment deduction
    const totalDeductions = calculateTotalDeductions({ ...salary.deductions, nonEmploymentDeduction });
    const basicSalary = salary.earnings.basicSalary;
    const netSalary = (basicSalary + totalEarnings) - totalDeductions;

    const salaryDetails = await prisma.paymentDetails.create({
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
                    nonEmploymentDeduction: nonEmploymentDeduction
                },
            },
            totalEarnings: totalEarnings,
            totalDeductions: totalDeductions,
            netSalary: netSalary,
        },
    });

    if (salary.workDetails.numberOfPaidHolidays > 0) {
        await createInitialLeaveRequest({
            employeeId: salary.employeeId,
            totalDays: salary.workDetails.numberOfPaidHolidays,
            salaryMonth: salary.month,
            salaryYear: salary.year
        });
    }

    return salaryDetails;
};

/**
 * Get salary details by month and year.
 * @param month - The month.
 * @param year - The year.
 * @returns The salary details.
 */
export const getSalaryDetailsByMonth = async (month: number, year: number) => {
    return await prisma.paymentDetails.findMany({
        where: {
            month,
            year,
            employee: { isDeleted: false },
        },
        include: {
            workDetails: true,
            earnings: true,
            deductions: true,
            employee: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });
};

/**
 * Get salary details by payment ID.
 * @param paymentId - The payment ID.
 * @returns The salary details.
 */
export const getSalaryDetailsByPaymentId = async (paymentId: number) => {
    return await prisma.paymentDetails.findUnique({
        where: { id: paymentId },
        include: {
            workDetails: true,
            earnings: true,
            deductions: true,
            employee: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });
};

/**
 * Update salary details.
 * @param id - The payment details ID.
 * @param salary - The salary details.
 * @returns The updated payment details.
 */
export const updateSalaryDetails = async (id: number, salary: Salary) => {
    const totalEarnings = calculateTotalEarnings(salary.earnings);
    const nonEmploymentDeduction = calculateNonEmploymentDeduction(salary.workDetails, salary.earnings.basicSalary); 
    const totalDeductions = calculateTotalDeductions({ ...salary.deductions, nonEmploymentDeduction });
    const basicSalary = salary.earnings.basicSalary;
    const netSalary = (basicSalary + totalEarnings) - totalDeductions;

    const updatedSalaryDetails = await prisma.paymentDetails.update({
        where: { id },
        data: {
            workDetails: {
                update: {
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
                update: {
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
                update: {
                    healthInsurance: salary.deductions.healthInsurance,
                    employeePensionInsurance: salary.deductions.employeePensionInsurance,
                    employmentInsurance: salary.deductions.employmentInsurance,
                    longTermCareInsurance: salary.deductions.longTermCareInsurance,
                    socialInsurance: salary.deductions.socialInsurance,
                    incomeTax: salary.deductions.incomeTax,
                    residentTax: salary.deductions.residentTax,
                    advancePayment: salary.deductions.advancePayment,
                    yearEndAdjustment: salary.deductions.yearEndAdjustment,
                    nonEmploymentDeduction: nonEmploymentDeduction
                },
            },
            totalEarnings,
            totalDeductions,
            netSalary,
        },
    });

    // Adjust the leave request for the updated salary
    await adjustLeaveRequest({
        employeeId: salary.employeeId,
        newTotalDays: salary.workDetails.numberOfPaidHolidays,
        salaryMonth: salary.month,
        salaryYear: salary.year,
    });

    return updatedSalaryDetails;
};