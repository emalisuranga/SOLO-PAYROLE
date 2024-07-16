const getSections = (employee) => [
  {
    label: "Personal Info",
    fields: [
      {
        name: "firstName",
        type: "text",
        label: "First Name",
        required: true,
        defaultValue: employee ? employee.firstName : '',
      },
      {
        name: "lastName",
        type: "text",
        label: "Last Name",
        required: true,
        defaultValue: employee ? employee.lastName : '',
      },
      {
        name: "phone",
        type: "text",
        label: "Phone",
        required: true,
        defaultValue: employee ? employee.phone : '',
      },
      {
        name: "address",
        type: "text",
        label: "Address",
        required: true,
        defaultValue: employee ? employee.address : '',
      },
      {
        name: "dateOfBirth",
        type: "date",
        label: "Date of Birth",
        required: true,
        defaultValue: employee ? employee.dateOfBirth.split('T')[0] : '',
      },
      {
        name: "joinDate",
        type: "date",
        label: "Join Date",
        required: true,
        defaultValue: employee ? employee.joinDate.split('T')[0] : '',
      },
      {
        name: "department",
        type: "text",
        label: "Department",
        required: true,
        defaultValue: employee ? employee.department : '',
      },
    ],
  },
  {
    label: "Bank Details",
    fields: [
      {
        name: "bankAccountNumber",
        type: "text",
        label: "Bank Account Number",
        required: true,
        defaultValue: employee ? employee.bankDetails[0]?.bankAccountNumber : '',
      },
      {
        name: "bankName",
        type: "text",
        label: "Bank Name",
        required: true,
        defaultValue: employee ? employee.bankDetails[0]?.bankName : '',
      },
      {
        name: "branchCode",
        type: "text",
        label: "Branch Code",
        required: true,
        defaultValue: employee ? employee.bankDetails[0]?.branchCode : '',
      },
    ],
  },
  {
    label: "Salary Details",
    fields: [
      {
        name: "basicSalary",
        type: "text",
        label: "Basic Salary",
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.basicSalary : '',
      },
      {
        name: "overtimePay",
        type: "text",
        label: "Overtime Pay",
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.overtimePay : '',
      },
      {
        name: "transportationCosts",
        type: "text",
        label: "Transportation Costs",
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.transportationCosts : '',
      },
      {
        name: "familyAllowance",
        type: "text",
        label: "Family Allowance",
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.familyAllowance : '',
      },
      {
        name: "attendanceAllowance",
        type: "text",
        label: "Attendance Allowance",
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.attendanceAllowance : '',
      },
      {
        name: "leaveAllowance",
        type: "text",
        label: "Leave Allowance",
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.leaveAllowance : '',
      },
      {
        name: "specialAllowance",
        type: "text",
        label: "Special Allowance",
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.specialAllowance : '',
      },
    ],
  },
];

export default getSections;