export const initializeFormData = (sections) => {
    return sections.reduce((acc, section) => {
      section.fields.forEach((field) => {
        if (
          [
            "overtimePay",
            "transportationCosts",
            "familyAllowance",
            "attendanceAllowance",
            "leaveAllowance",
            "specialAllowance",
          ].includes(field.name)
        ) {
          acc[field.name] = "0";
        } else {
          acc[field.name] = "";
        }
      });
      return acc;
    }, {});
  };
  
  export const handleFormChange = (formData, setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: [
        "basicSalary",
        "overtimePay",
        "transportationCosts",
        "familyAllowance",
        "attendanceAllowance",
        "leaveAllowance",
        "specialAllowance",
      ].includes(name)
        ? parseFloat(value)
        : value,
    });
  };