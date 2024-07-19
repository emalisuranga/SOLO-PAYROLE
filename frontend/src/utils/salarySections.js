import { t } from "i18next";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Extract only the date part
};

const createField = (name, type, required, defaultValue) => ({
  name,
  type,
  label: t(`fields.${name}`),
  required,
  defaultValue,
});

const createFields = (data, fieldsConfig) =>
  fieldsConfig.map((field) =>
    createField(
      field.name,
      field.type,
      field.required,
      field.type === "date"
        ? formatDate(data?.[field.name])
        : data?.[field.name] || ""
    )
  );

const getSalarySections = (data) => [
  {
    label: t("sections.attendanceWorkDetails"),
    fields: createFields(data, [
      { name: "scheduledWorkingDays", type: "text", required: true },
      { name: "numberOfWorkingDays", type: "text", required: true },
      { name: "numberOfPaidHolidays", type: "text", required: true },
      { name: "remainingPaidVacationDays", type: "text", required: true },
      { name: "overtime", type: "text", required: true },
      { name: "timeLate", type: "text", required: true },
      { name: "timeLeavingEarly", type: "text", required: true },
    ]),
  },
  {
    label: t("sections.earnings"),
    fields: createFields(data, [
      { name: "overtimePay", type: "text", required: true },
      { name: "transportationCosts", type: "text", required: true },
      { name: "attendanceAllowance", type: "text", required: true },
      { name: "familyAllowance", type: "text", required: true },
      { name: "leaveAllowance", type: "text", required: true },
      { name: "specialAllowance", type: "text", required: true },
    ]),
  },
  {
    label: t("sections.deductions"),
    fields: createFields(data, [
      { name: "healthInsurance", type: "text", required: true },
      { name: "employeePensionInsurance", type: "text", required: true },
      { name: "employmentInsurance", type: "text", required: true },
      { name: "longTermCareInsurance", type: "text", required: true },
      { name: "socialInsurance", type: "text", required: true },
      { name: "incomeTax", type: "text", required: true },
      { name: "residentTax", type: "text", required: true },
      { name: "advancePayment", type: "text", required: true },
      { name: "yearEndAdjustment", type: "text", required: true },
    ]),
  },
];

export default getSalarySections;
