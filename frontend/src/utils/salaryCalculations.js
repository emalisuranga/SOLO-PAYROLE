export const calculateNonEmploymentDeduction = (workDetails, basicSalary) => {
    const { scheduledWorkingDays, numberOfWorkingDays, numberOfPaidHolidays } = workDetails;
    const perDayDeductionRaw = basicSalary / scheduledWorkingDays;
    const perDayDeduction = Math.ceil(perDayDeductionRaw);
    const totalDaysOff = scheduledWorkingDays - numberOfWorkingDays - numberOfPaidHolidays;
    const deduction = perDayDeduction * totalDaysOff;

    return deduction;
};