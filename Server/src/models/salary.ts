import prisma from '../config/prismaClient';
import { Salary } from '../types/salary';
import { createInitialLeaveRequest, adjustLeaveRequest } from '../models/leaveManagement';
import {
    calculateTotalEarnings,
    calculateTotalDeductions,
    calculateOvertimePayment,
    calculateSocialInsurance,
    convertToNegative
} from '../utils/salaryCalculations';
import { NotFoundError, BadRequestError } from '../errors/customError';

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
        throw new NotFoundError(`Employee with ID ${salary.employeeId} does not exist.`);
    }

    const existingSalary = await prisma.paymentDetails.findFirst({
        where: {
            employeeId: salary.employeeId,
            month: salary.month,
            year: salary.year,
        },
    });

    if (existingSalary) {
        throw new BadRequestError(`Salary details for employee ${salary.employeeId} for month ${salary.month} and year ${salary.year} already exist.`);
    }

    const overtimePayment = calculateOvertimePayment(salary.workDetails, salary.earnings.basicSalary); 
    const totalEarnings = calculateTotalEarnings(salary.earnings, overtimePayment, salary.deductions.nonEmploymentDeduction );
    // const nonEmploymentDeduction = calculateNonEmploymentDeduction(salary.workDetails, salary.earnings.basicSalary);
    const totalDeductions = calculateTotalDeductions({ ...salary.deductions, refundAmount:  convertToNegative(salary.deductions.refundAmount)  });
    const netSalary = totalEarnings - totalDeductions;

    const salaryDetails = await prisma.paymentDetails.create({
        data: {
            employeeId: salary.employeeId,
            month: salary.month,
            year: salary.year,
            slipName: salary.slipName,
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
                    overtimePay: overtimePayment,
                    transportationCosts: salary.earnings.transportationCosts,
                    attendanceAllowance: salary.earnings.attendanceAllowance,
                    familyAllowance: salary.earnings.familyAllowance,
                    leaveAllowance: salary.earnings.leaveAllowance,
                    specialAllowance: salary.earnings.specialAllowance,
                    holidayAllowance: salary.earnings.holidayAllowance,
                },
            },
            deductions: {
                create: {
                    healthInsurance: salary.deductions.healthInsurance,
                    employeePensionInsurance: salary.deductions.employeePensionInsurance,
                    employmentInsurance: salary.deductions.employmentInsurance,
                    longTermCareInsurance: salary.deductions.longTermCareInsurance,
                    socialInsurance: calculateSocialInsurance(salary.deductions),
                    incomeTax: salary.deductions.incomeTax,
                    residentTax: salary.deductions.residentTax,
                    advancePayment: salary.deductions.advancePayment,
                    yearEndAdjustment: salary.deductions.yearEndAdjustment,
                    nonEmploymentDeduction: salary.deductions.nonEmploymentDeduction,
                    refundAmount: convertToNegative(salary.deductions.refundAmount),
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
    const salaryDetails = await prisma.paymentDetails.findUnique({
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

    if (!salaryDetails) {
        throw new NotFoundError(`Salary details with ID ${paymentId} do not exist.`);
    }

    return salaryDetails;
};

/**
 * Update salary details.
 * @param id - The payment details ID.
 * @param salary - The salary details.
 * @returns The updated payment details.
 */
export const updateSalaryDetails = async (id: number, salary: Salary) => {

    const existingSalary = await prisma.paymentDetails.findUnique({
        where: { id },
    });

    if (!existingSalary) {
        throw new NotFoundError(`Salary details with ID ${id} do not exist.`);
    }

    const overtimePayment = calculateOvertimePayment(salary.workDetails, salary.earnings.basicSalary); 
    const totalEarnings = calculateTotalEarnings(salary.earnings, overtimePayment, salary.deductions.nonEmploymentDeduction );
    // const nonEmploymentDeduction = calculateNonEmploymentDeduction(salary.workDetails, salary.earnings.basicSalary);
    const totalDeductions = calculateTotalDeductions({ ...salary.deductions, refundAmount:  convertToNegative(salary.deductions.refundAmount)  });
    const netSalary = totalEarnings - totalDeductions;

    const updatedSalaryDetails = await prisma.paymentDetails.update({
        where: { id },
        data: {
            slipName: salary.slipName,
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
                    overtimePay: overtimePayment,
                    transportationCosts: salary.earnings.transportationCosts,
                    attendanceAllowance: salary.earnings.attendanceAllowance,
                    familyAllowance: salary.earnings.familyAllowance,
                    leaveAllowance: salary.earnings.leaveAllowance,
                    specialAllowance: salary.earnings.specialAllowance,
                    holidayAllowance: salary.earnings.holidayAllowance,
                },
            },
            deductions: {
                update: {
                    healthInsurance: salary.deductions.healthInsurance,
                    employeePensionInsurance: salary.deductions.employeePensionInsurance,
                    employmentInsurance: salary.deductions.employmentInsurance,
                    longTermCareInsurance: salary.deductions.longTermCareInsurance,
                    socialInsurance: calculateSocialInsurance(salary.deductions),
                    incomeTax: salary.deductions.incomeTax,
                    residentTax: salary.deductions.residentTax,
                    advancePayment: salary.deductions.advancePayment,
                    yearEndAdjustment: salary.deductions.yearEndAdjustment,
                    nonEmploymentDeduction: salary.deductions.nonEmploymentDeduction,
                    refundAmount: convertToNegative(salary.deductions.refundAmount),
                },
            },
            totalEarnings: totalEarnings,
            totalDeductions: totalDeductions,
            netSalary: netSalary,
        },
    });

    await adjustLeaveRequest({
        employeeId: salary.employeeId,
        newTotalDays: salary.workDetails.numberOfPaidHolidays,
        salaryMonth: salary.month,
        salaryYear: salary.year,
    });

    return updatedSalaryDetails;
};