export interface PaidHolidays {
    id: number;
    employeeId: number;
    totalLeave: number;
    usedLeave: number;
    remainingLeave: number;
    leaveStart: Date;
    leaveEnd: Date;
    lastUpdated: Date;
    isValid: boolean;
  }