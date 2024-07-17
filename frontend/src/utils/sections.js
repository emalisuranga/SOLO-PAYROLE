import { t } from 'i18next';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Extract only the date part
};

const createField = (name, type, label, required, defaultValue) => ({
  name,
  type,
  label: t(label), // Translate the label
  required,
  defaultValue,
});

const createFields = (employee, fieldsConfig) => 
  fieldsConfig.map(field => 
    createField(
      field.name,
      field.type,
      field.label,
      field.required,
      field.type === 'date' ? formatDate(employee?.[field.name]) : employee?.[field.name] || ''
    )
  );

const getSections = (employee) => [
  {
    label: t("Personal Info"),
    fields: createFields(employee, [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "phone", type: "text", label: "Phone", required: true },
      { name: "address", type: "text", label: "Address", required: true },
      { name: "dateOfBirth", type: "date", label: "Date of Birth", required: true },
      { name: "joinDate", type: "date", label: "Join Date", required: true },
      { name: "department", type: "text", label: "Department", required: true },
    ]),
  },
  {
    label: t("Bank Details"),
    fields: createFields(employee?.bankDetails?.[0] || {}, [
      { name: "bankAccountNumber", type: "text", label: "Bank Account Number", required: true },
      { name: "bankName", type: "text", label: "Bank Name", required: true },
      { name: "branchCode", type: "text", label: "Branch Code", required: true },
    ]),
  },
  {
    label: t("Salary Details"),
    fields: createFields(employee?.salaryDetails?.[0] || {}, [
      { name: "basicSalary", type: "text", label: "Basic Salary", required: true },
      { name: "overtimePay", type: "text", label: "Overtime Pay", required: true },
      { name: "transportationCosts", type: "text", label: "Transportation Costs", required: true },
      { name: "familyAllowance", type: "text", label: "Family Allowance", required: true },
      { name: "attendanceAllowance", type: "text", label: "Attendance Allowance", required: true },
      { name: "leaveAllowance", type: "text", label: "Leave Allowance", required: true },
      { name: "specialAllowance", type: "text", label: "Special Allowance", required: true },
    ]),
  },
];

export default getSections;