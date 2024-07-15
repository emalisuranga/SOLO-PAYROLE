export interface Employee {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    dateOfBirth: string | Date;
    joinDate: string | Date;
    department: string;
    bankAccountNumber: string;
    bankName: string;
    branchCode: string;
    basicSalary: number;
    overtimePay: number;
    transportationCosts: number;
    familyAllowance: number;
    attendanceAllowance: number;
    leaveAllowance: number;
    specialAllowance: number;
  }