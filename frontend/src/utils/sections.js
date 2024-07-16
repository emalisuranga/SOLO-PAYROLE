import { t } from 'i18next';


const getSections = (employee) => [
  {
    label: t("Personal Info"),
    fields: [
      {
        name: "firstName",
        type: "text",
        label: t("First Name"),
        required: true,
        defaultValue: employee ? employee.firstName : '',
      },
      {
        name: "lastName",
        type: "text",
        label: t("Last Name"),
        required: true,
        defaultValue: employee ? employee.lastName : '',
      },
      {
        name: "phone",
        type: "text",
        label: t("Phone"),
        required: true,
        defaultValue: employee ? employee.phone : '',
      },
      {
        name: "address",
        type: "text",
        label: t("Address"),
        required: true,
        defaultValue: employee ? employee.address : '',
      },
      {
        name: "dateOfBirth",
        type: "date",
        label: t("Date of Birth"),
        required: true,
        defaultValue: employee ? employee.dateOfBirth.split('T')[0] : '',
      },
      {
        name: "joinDate",
        type: "date",
        label: t("Join Date"),
        required: true,
        defaultValue: employee ? employee.joinDate.split('T')[0] : '',
      },
      {
        name: "department",
        type: "text",
        label: t("Department"),
        required: true,
        defaultValue: employee ? employee.department : '',
      },
    ],
  },
  {
    label: t("Bank Details"),
    fields: [
      {
        name: "bankAccountNumber",
        type: "text",
        label: t("Bank Account Number"),
        required: true,
        defaultValue: employee ? employee.bankDetails[0]?.bankAccountNumber : '',
      },
      {
        name: "bankName",
        type: "text",
        label: t("Bank Name"),
        required: true,
        defaultValue: employee ? employee.bankDetails[0]?.bankName : '',
      },
      {
        name: "branchCode",
        type: "text",
        label: t("Branch Code"),
        required: true,
        defaultValue: employee ? employee.bankDetails[0]?.branchCode : '',
      },
    ],
  },
  {
    label: t("Salary Details"),
    fields: [
      {
        name: "basicSalary",
        type: "text",
        label: t("Basic Salary"),
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.basicSalary : '',
      },
      {
        name: "overtimePay",
        type: "text",
        label: t("Overtime Pay"),
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.overtimePay : '',
      },
      {
        name: "transportationCosts",
        type: "text",
        label: t("Transportation Costs"),
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.transportationCosts : '',
      },
      {
        name: "familyAllowance",
        type: "text",
        label: t("Family Allowance"),
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.familyAllowance : '',
      },
      {
        name: "attendanceAllowance",
        type: "text",
        label: t("Attendance Allowance"),
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.attendanceAllowance : '',
      },
      {
        name: "leaveAllowance",
        type: "text",
        label: t("Leave Allowance"),
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.leaveAllowance : '',
      },
      {
        name: "specialAllowance",
        type: "text",
        label: t("Special Allowance"),
        required: true,
        defaultValue: employee ? employee.salaryDetails[0]?.specialAllowance : '',
      },
    ],
  },
];

export default getSections;