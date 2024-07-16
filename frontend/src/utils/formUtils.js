export const initializeFormData = (sections, initialData = {}) => {
  return sections.reduce((acc, section) => {
    section.fields.forEach(field => {
      acc[field.name] = initialData[field.name] || ([
        "overtimePay",
        "transportationCosts",
        "familyAllowance",
        "attendanceAllowance",
        "leaveAllowance",
        "specialAllowance"
      ].includes(field.name) ? "0" : "");
    });
    return acc;
  }, {});
};

export const handleFormChange = (formData, setFormData) => (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: [
      "basicSalary",
      "overtimePay",
      "transportationCosts",
      "familyAllowance",
      "attendanceAllowance",
      "leaveAllowance",
      "specialAllowance"
    ].includes(name) ? parseFloat(value) : value,
  });
};