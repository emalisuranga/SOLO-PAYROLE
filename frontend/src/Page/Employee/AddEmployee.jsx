import React from "react";
import EmployeeHeader from '../../Page/Employee/EmployeeHeader';
import CustomTabs from "../../Component/CustomTabs";
import getSections from '../../utils/sections';

const AddEmployee = () => {
  const handleSubmit = (formData) => {
  };
  const sections = getSections();

  return (
    <React.Fragment>
      <EmployeeHeader titleKey="registrationForm" />
      <CustomTabs sections={sections} onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default AddEmployee;
