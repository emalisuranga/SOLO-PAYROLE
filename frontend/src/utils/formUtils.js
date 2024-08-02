import getValidationSchema from "./validationSchemaForEmployee";
import { getSalaryValidationSchema } from "./validationSchemaForSalary";
import getSections from './employeeSections';
import { calculateNonEmploymentDeduction } from './salaryCalculations';

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const getFieldValue = (initialData, field) => {
  const nestedValue = initialData[field.name];

  if (field.type === "date") {
    return nestedValue ? formatDate(nestedValue) : "";
  } else {
    if (nestedValue !== undefined) {
      return nestedValue;
    } else if (
      initialData.bankDetails &&
      initialData.bankDetails[field.name] !== undefined
    ) {
      return initialData.bankDetails[field.name];
    } else if (
      initialData.salaryDetails &&
      initialData.salaryDetails[field.name] !== undefined
    ) {
      return initialData.salaryDetails[field.name];
    } else {
      return [
        // "overtimePay",
        "transportationCosts",
        "familyAllowance",
        "attendanceAllowance",
        "leaveAllowance",
        "specialAllowance",
      ].includes(field.name)
        ? "0"
        : "";
    }
  }
};

export const initializeFormData = (sections, initialData = {}) => {
  const formData = {};

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      formData[field.name] = getFieldValue(initialData, field);
    });
  });

  return formData;
};

export const cleanInitializeFormData = () => {
  const sections = getSections({});
  const formData = {};

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      formData[field.name] = field.type === "date" ? "" : "";
    });
  });

  return formData;
};

export const initializeAddSalaryFormData = (sections, employeeData = {}) => {
  const formData = {};

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      const nestedValue = employeeData[field.name];

      if (nestedValue !== undefined) {
        formData[field.name] = nestedValue;
      } else if (
        employeeData.salaryDetails &&
        employeeData.salaryDetails[field.name] !== undefined
      ) {
        formData[field.name] = employeeData.salaryDetails[field.name];
      } else {
        formData[field.name] = field.defaultValue || 0;
      }
    });
  });
  if (employeeData.salaryDetails && employeeData.salaryDetails.basicSalary !== undefined) {
    formData.basicSalary = employeeData.salaryDetails.basicSalary;
  } else {
    formData.basicSalary = 0;
  }

  return formData;
};

export const initializeUpdateSalaryFormData = (sections, salaryData = {}) => {
  // console.log("sections", JSON.stringify(sections))
  // console.log("salaryData", JSON.stringify(salaryData))

  const formData = {};

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      const nestedValue = salaryData[field.name];

      if (nestedValue !== undefined) {
        formData[field.name] = nestedValue;
      } else if (
        salaryData.workDetails &&
        salaryData.workDetails[field.name] !== undefined
      ) {
        formData[field.name] = salaryData.workDetails[field.name];
      } else if (
        salaryData.earnings &&
        salaryData.earnings[field.name] !== undefined
      ) {
        formData[field.name] = salaryData.earnings[field.name];
      } else if (
        salaryData.deductions &&
        salaryData.deductions[field.name] !== undefined
      ) {
        formData[field.name] = salaryData.deductions[field.name];
      } else {
        formData[field.name] = field.defaultValue || 0;
      }
    });
  });

  if (salaryData.earnings && salaryData.earnings.basicSalary !== undefined) {
    formData.basicSalary = salaryData.earnings.basicSalary;
  } else {
    formData.basicSalary = 0; 
  }

  return formData;
};

export const handleFormChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

export const validateForm = async (formData, t) => {
  const validationSchema = getValidationSchema(t);

  try {
    await validationSchema.validate(formData, { abortEarly: false });
    return {};
  } catch (validationError) {
    const validationErrors = {};
    if (validationError.inner) {
      validationError.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
    }
    return validationErrors;
  }
};

export const salaryValidation = async (formData, t) => {
  const validationSchema = getSalaryValidationSchema(t);

  try {
    await validationSchema.validate(formData, { abortEarly: false });
    return {};
  } catch (validationError) {
    const validationErrors = {};
    if (validationError.inner) {
      validationError.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
    }
    return validationErrors;
  }
};

export const transformFormDataForSalary = (formData,initialData ) => {
  const now = new Date();
  let month = now.getMonth(); 
  let year = now.getFullYear();

  if (month === 0) {
    month = 12; 
    year -= 1;
  }
  return {
    employeeId: initialData.employeeId? initialData.employeeId : initialData.id,
    month: month,
    year: year,
    workDetails: {
      scheduledWorkingDays: parseInt(formData.scheduledWorkingDays, 10),
      numberOfWorkingDays: parseInt(formData.numberOfWorkingDays, 10),
      numberOfPaidHolidays: parseInt(formData.numberOfPaidHolidays, 10),
      remainingPaidVacationDays: parseInt(formData.remainingPaidVacationDays, 10),
      overtime: parseFloat(formData.overtime),
      timeLate: parseFloat(formData.timeLate),
      timeLeavingEarly: parseFloat(formData.timeLeavingEarly),
    },
    earnings: {
      basicSalary: parseFloat(initialData.salaryDetails? initialData.salaryDetails.basicSalary : initialData.earnings.basicSalary),
      overtimePay: parseFloat(formData.overtimePay),
      transportationCosts: parseFloat(formData.transportationCosts),
      attendanceAllowance: parseFloat(formData.attendanceAllowance),
      familyAllowance: parseFloat(formData.familyAllowance),
      leaveAllowance: parseFloat(formData.leaveAllowance),
      specialAllowance: parseFloat(formData.specialAllowance),
      holidayAllowance: parseFloat(formData.holidayAllowance),
    },
    deductions: {
      healthInsurance: parseFloat(formData.healthInsurance),
      employeePensionInsurance: parseFloat(formData.employeePensionInsurance),
      employmentInsurance: parseFloat(formData.employmentInsurance),
      longTermCareInsurance: parseFloat(formData.longTermCareInsurance),
      socialInsurance: parseFloat(formData.socialInsurance),
      incomeTax: parseFloat(formData.incomeTax),
      residentTax: parseFloat(formData.residentTax),
      advancePayment: parseFloat(formData.advancePayment),
      yearEndAdjustment: parseFloat(formData.yearEndAdjustment),
      nonEmploymentDeduction: parseFloat(formData.nonEmploymentDeduction),
      refundAmount: parseFloat(formData.refundAmount),
    }
  };
};

export const getInitialFormData = (employeeData = {}) => {
  return cleanInitializeFormData(employeeData);
};


export const handleFormChangeUtil = (formData, setFormData) => (event) => {
  console.log(formData)
  const { name, value } = event.target;
  const updatedFormData = { ...formData, [name]: value };

    if (name === 'numberOfWorkingDays' || name === 'numberOfPaidHolidays') {
      const { scheduledWorkingDays, numberOfWorkingDays, numberOfPaidHolidays, basicSalary } = updatedFormData;
      console.log(scheduledWorkingDays, numberOfWorkingDays, numberOfPaidHolidays, basicSalary)
          const nonEmploymentDeduction = calculateNonEmploymentDeduction({
              scheduledWorkingDays,
              numberOfWorkingDays,
              numberOfPaidHolidays
          }, basicSalary);

          updatedFormData.nonEmploymentDeduction = nonEmploymentDeduction;
  }

  setFormData(updatedFormData);
};