/**
 * Calculate leave validity based on join date.
 * @param joinDate - The employee's join date.
 * @returns The leave validity details.
 */
export const calculateLeaveValidity = (joinDate: Date) => {
    const now = new Date();
    const sixMonthsLater = new Date(joinDate);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    const oneYearLater = new Date(joinDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    if (now < sixMonthsLater) {
        return { startDate: joinDate, endDate: sixMonthsLater, totalLeave: 10, isValid: true };
    } else if (now < oneYearLater) {
        return { startDate: sixMonthsLater, endDate: oneYearLater, totalLeave: 10, isValid: true };
    } else {
        return { startDate: oneYearLater, endDate: new Date(oneYearLater.getFullYear() + 1, oneYearLater.getMonth(), oneYearLater.getDate()), totalLeave: 20, isValid: true };
    }
};

/**
 * Calculate the difference between new total days and previous total days.
 * @param newTotalDays - The new total days.
 * @param previousTotalDays - The previous total days.
 * @returns The difference in days.
 */
export const calculateDifference = (newTotalDays: number, previousTotalDays: number): number => {
    return newTotalDays - previousTotalDays;
};

export const calculateRemainingPaidVacationDays = (paidHolidays: Array<{ remainingLeave: number }>): number => {
    return paidHolidays.reduce((acc, holiday) => acc + holiday.remainingLeave, 0);
  };