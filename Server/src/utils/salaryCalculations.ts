import { Salary } from '../types/salary';

/**
 * Calculate the total earnings.
 * @param earnings - The earnings details.
 * @param overtimePayment - The overtime payment.
 * @returns The total earnings.
 */
export const calculateTotalEarnings = (earnings: Salary['earnings'], overtimePayment: number): number => {
    return (
        earnings.overtimePay +
        earnings.transportationCosts +
        earnings.attendanceAllowance +
        earnings.familyAllowance +
        earnings.leaveAllowance +
        earnings.specialAllowance +
        overtimePayment
    );
};

/**
 * Calculate the total deductions.
 * @param deductions - The deductions details.
 * @returns The total deductions.
 */
export const calculateTotalDeductions = (deductions: Salary['deductions']): number => {
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
        deductions.nonEmploymentDeduction
    );
};

/**
 * Calculate non-employment deduction.
 * @param workDetails - The work details.
 * @param basicSalary - The basic salary.
 * @returns The non-employment deduction.
 */
export const calculateNonEmploymentDeduction = (workDetails: Salary['workDetails'], basicSalary: number): number => {
    const { scheduledWorkingDays, numberOfWorkingDays, numberOfPaidHolidays } = workDetails;
    const deduction = ((scheduledWorkingDays - numberOfWorkingDays - numberOfPaidHolidays) * basicSalary) / scheduledWorkingDays;
    return Math.round(deduction);
};

/**
 * Calculate overtime payment.
 * @param workDetails - The work details.
 * @param basicSalary - The basic salary.
 * @returns The overtime payment.
 */
export const calculateOvertimePayment = (workDetails: Salary['workDetails'], basicSalary: number): number => {
    const { scheduledWorkingDays, overtime } = workDetails;
    return Math.round((((basicSalary / scheduledWorkingDays) / 8) * 1.25) * overtime);
};

/**
 * Calculate social insurance.
 * @param deductions - The deductions details.
 * @returns The social insurance.
 */
export const calculateSocialInsurance = (deductions: { healthInsurance: number, employeePensionInsurance: number }): number => {
    return deductions.healthInsurance + deductions.employeePensionInsurance;
};