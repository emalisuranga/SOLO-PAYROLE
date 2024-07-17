const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Extract only the date part
};

export const initializeFormData = (sections, initialData = {}) => {
  const formData = {};

  sections.forEach(section => {
    section.fields.forEach(field => {
      if (field.type === 'date') {
        formData[field.name] = initialData[field.name] ? formatDate(initialData[field.name]) : '';
      } else {
        formData[field.name] = initialData[field.name] || ([
          "overtimePay",
          "transportationCosts",
          "familyAllowance",
          "attendanceAllowance",
          "leaveAllowance",
          "specialAllowance"
        ].includes(field.name) ? "0" : "");
      }
    });
  });

  return formData;
};

export const handleFormChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value
  });
};