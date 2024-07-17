import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import useEmployeeStore from "../../store/employeeStore";
import EmployeeHeader from '../../Page/Employee/EmployeeHeader';

const EmployeeDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { employee, loading, fetchEmployeeDetails, error } = useEmployeeStore();

  useEffect(() => {
    fetchEmployeeDetails(id);
  }, [id, fetchEmployeeDetails]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <React.Fragment>
      <EmployeeHeader titleKey="employeeDetails" />
      <Box sx={{ p: 3 }}>
      <Typography variant="h4">{`${employee.firstName} ${employee.lastName}`}</Typography>
      <Typography variant="body1">{`${t("Phone")}: ${employee.phone}`}</Typography>
      <Typography variant="body1">{`${t("Address")}: ${employee.address}`}</Typography>
      <Typography variant="body1">{`${t("Date of Birth")}: ${new Date(employee.dateOfBirth).toLocaleDateString()}`}</Typography>
      <Typography variant="body1">{`${t("Join Date")}: ${new Date(employee.joinDate).toLocaleDateString()}`}</Typography>
      <Typography variant="body1">{`${t("Department")}: ${employee.department}`}</Typography>
      <Typography variant="body1">{`${t("Bank Account Number")}: ${employee.bankDetails[0]?.bankAccountNumber}`}</Typography>
      <Typography variant="body1">{`${t("Bank Name")}: ${employee.bankDetails[0]?.bankName}`}</Typography>
      <Typography variant="body1">{`${t("Basic Salary")}: ${employee.salaryDetails[0]?.basicSalary}`}</Typography>
      <Typography variant="body1">{`${t("Total Allowance")}: ${[
        employee.salaryDetails[0]?.overtimePay,
        employee.salaryDetails[0]?.transportationCosts,
        employee.salaryDetails[0]?.familyAllowance,
        employee.salaryDetails[0]?.attendanceAllowance,
        employee.salaryDetails[0]?.leaveAllowance,
        employee.salaryDetails[0]?.specialAllowance,
      ].reduce((acc, allowance) => acc + (allowance || 0), 0)}`}</Typography>
    </Box>
    </React.Fragment>
    
  );
};

export default EmployeeDetails;