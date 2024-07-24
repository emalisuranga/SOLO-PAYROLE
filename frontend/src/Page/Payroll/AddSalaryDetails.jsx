import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import EmployeeHeader from "../../Page/Employee/EmployeeHeader";
import EmployeeSearch from "./EmployeeSearch";
import { useNavigate } from "react-router-dom";
import CustomTabsForSalary from "./CustomTabsForSalary";
import getSalarySections from "../../utils/salarySections";
import LoadingAnimation from "../../Component/LoadingAnimation";
import styled from "styled-components";

const EmployeeInfoContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const EmployeeInfo = styled(Typography)`
  font-size: 1.2em;
  font-weight: bold;
`;

const AddSalary = () => {
  const handleSubmit = (formData) => {
  };

  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearch = (employee) => {
    setSelectedEmployee(employee);
  };
  const sections = getSalarySections(selectedEmployee);

  return (
    <React.Fragment>
      <EmployeeHeader titleKey="addSalaryForm" />
      <EmployeeSearch onSearch={handleSearch} />
      {/* <CustomTabs sections={sections} onSubmit={handleSubmit} /> */}
      {/* {selectedEmployee && (
        <CustomTabsForSalary sections={sections} onSubmit={handleSubmit} initialData={selectedEmployee} />
      )} */}

      {selectedEmployee ? (
        <Box sx={{ p: 3 }}>
          <EmployeeInfoContainer>
            <EmployeeInfo variant="h3" gutterBottom>
              {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
            </EmployeeInfo>
            <EmployeeInfo variant="h4" gutterBottom>
              {selectedEmployee.id}
            </EmployeeInfo>
          </EmployeeInfoContainer>
          <CustomTabsForSalary
            sections={sections}
            onSubmit={handleSubmit}
            initialData={selectedEmployee}
          />
        </Box>
      ) : (
        <LoadingAnimation />
      )}

      <Button
        variant="contained"
        onClick={() => {
          const employeeId = 4;
          const paymentDetailsId = 4
          navigate(`/salary-slip/${employeeId}/${paymentDetailsId}`);
        }}
      >
        Payslip1
      </Button>
    </React.Fragment>
  );
};

export default AddSalary;
