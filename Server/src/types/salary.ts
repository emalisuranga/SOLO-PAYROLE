export interface Salary {
    employeeId: number;
    month: string;
    year: number;
    workDetails: WorkDetails;
    earnings: Earnings;
    deductions: Deductions;
  }
  
  export interface WorkDetails {
    scheduledWorkingDays: number;
    numberOfWorkingDays: number;
    numberOfPaidHolidays: number;
    remainingPaidVacationDays: number;
    overtime: number;
    timeLate: number;
    timeLeavingEarly: number;
  }
  
  export interface Earnings {
    basicSalary: number;
    overtimePay: number;
    transportationCosts: number;
    attendanceAllowance: number;
    familyAllowance: number;
    leaveAllowance: number;
    specialAllowance: number;
  }
  
  export interface Deductions {
    healthInsurance: number;
    employeePensionInsurance: number;
    employmentInsurance: number;
    longTermCareInsurance: number;
    socialInsurance: number;
    incomeTax: number;
    residentTax: number;
    advancePayment: number;
    yearEndAdjustment: number;
  }