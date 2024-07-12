export const validateForm = (formData) => {
    const errors = {};
    
    // Phone validation: number only and length is 10
    if (!/^\d{11}$/.test(formData.phone)) {
      errors.phone = 'Phone must be a 11 digit number';
    }
  
    // Date validation
    if (isNaN(Date.parse(formData.dateOfBirth))) {
      errors.dateOfBirth = 'Invalid date format';
    }
    if (isNaN(Date.parse(formData.joinDate))) {
      errors.joinDate = 'Invalid date format';
    }
  
    // Bank details validation
    if (!/^\d+$/.test(formData.bankAccountNumber)) {
      errors.bankAccountNumber = 'Bank Account Number must be a number';
    }
    if (!/^\d+$/.test(formData.branchCode)) {
      errors.branchCode = 'Branch Code must be a number';
    }
  
    // Salary details validation
    ['overtimePay', 'transportationCosts', 'familyAllowance', 'attendanceAllowance', 'leaveAllowance', 'specialAllowance'].forEach(field => {
      if (formData[field] === '') {
        formData[field] = '0'; // Set default value to 0 if empty
      }
      if (!/^\d+$/.test(formData[field])) {
        errors[field] = `${field.replace(/([A-Z])/g, ' $1')} must be a number`;
      }
    });
  
    return errors;
  };