import { validationSchema } from './validationSchema';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Extract only the date part
};

export const initializeFormData = (sections, initialData = {}) => {
  const formData = {};

  sections.forEach(section => {
    section.fields.forEach(field => {
      const nestedValue = initialData[field.name];

      if (field.type === 'date') {
        formData[field.name] = nestedValue ? formatDate(nestedValue) : '';
      } else {
        if (nestedValue !== undefined) {
          formData[field.name] = nestedValue;
        } else if (initialData.bankDetails && initialData.bankDetails[0][field.name] !== undefined) {
          formData[field.name] = initialData.bankDetails[0][field.name];
        } else if (initialData.salaryDetails && initialData.salaryDetails[0][field.name] !== undefined) {
          formData[field.name] = initialData.salaryDetails[0][field.name];
        } else {
          formData[field.name] = ([
            "overtimePay",
            "transportationCosts",
            "familyAllowance",
            "attendanceAllowance",
            "leaveAllowance",
            "specialAllowance"
          ].includes(field.name) ? "0" : "");
        }
      }
    });
  });
  // console.log("initializeFormData:formData",formData)
  return formData;
};

export const handleFormChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

export const validateForm = async (formData) => {
  try {
    await validationSchema.validate(formData, { abortEarly: false });
    return {};
  } catch (errors) {
    const validationErrors = {};
    errors.inner.forEach(error => {
      validationErrors[error.path] = error.message;
    });
    return validationErrors;
  }
};