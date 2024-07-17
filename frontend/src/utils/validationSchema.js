import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phone: Yup.string().matches(/^\d{11}$/, 'Phone must be an 11 digit number').required('Phone is required'),
  address: Yup.string().required('Address is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  joinDate: Yup.date().required('Join Date is required'),
  department: Yup.string().required('Department is required'),
  bankAccountNumber: Yup.number().typeError('Bank Account Number must be a number').required('Bank Account Number is required'),
  bankName: Yup.string().required('Bank Name is required'),
  branchCode: Yup.number().typeError('Branch Code must be a number').required('Branch Code is required'),
  basicSalary: Yup.number().typeError('Basic Salary must be a number').required('Basic Salary is required'),
  overtimePay: Yup.number().typeError('Overtime Pay must be a number').required('Overtime Pay is required'),
  transportationCosts: Yup.number().typeError('Transportation Costs must be a number').required('Transportation Costs is required'),
  familyAllowance: Yup.number().typeError('Family Allowance must be a number').required('Family Allowance is required'),
  attendanceAllowance: Yup.number().typeError('Attendance Allowance must be a number').required('Attendance Allowance is required'),
  leaveAllowance: Yup.number().typeError('Leave Allowance must be a number').required('Leave Allowance is required'),
  specialAllowance: Yup.number().typeError('Special Allowance must be a number').required('Special Allowance is required'),
});