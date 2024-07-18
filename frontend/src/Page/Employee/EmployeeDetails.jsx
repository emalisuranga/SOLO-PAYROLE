import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Card, CardContent, Grid } from "@mui/material";
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
          height: "100vh",
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
          height: "100vh",
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

  const renderEmployeeDetail = (label, value) => (
    <Grid item xs={12} sm={6} md={4}>
      <Typography variant="subtitle1" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body1">
        {value}
      </Typography>
    </Grid>
  );

  return (
    <React.Fragment>
      <EmployeeHeader titleKey="employeeDetails" />
      <Box sx={{ p: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>{`${employee.firstName} ${employee.lastName}`}</Typography>
            <Grid container spacing={2}>
              {renderEmployeeDetail(t("Phone"), employee.phone)}
              {renderEmployeeDetail(t("Address"), employee.address)}
              {renderEmployeeDetail(t("Date of Birth"), new Date(employee.dateOfBirth).toLocaleDateString())}
              {renderEmployeeDetail(t("Join Date"), new Date(employee.joinDate).toLocaleDateString())}
              {renderEmployeeDetail(t("Department"), employee.department)}
              {renderEmployeeDetail(t("Bank Account Number"), employee.bankDetails?.bankAccountNumber)}
              {renderEmployeeDetail(t("Bank Name"), employee.bankDetails?.bankName)}
              {renderEmployeeDetail(t("Branch Code"), employee.bankDetails?.branchCode)}
              {renderEmployeeDetail(t("Basic Salary"), employee.salaryDetails?.basicSalary)}
              {renderEmployeeDetail(
                t("Total Allowance"),
                [
                  employee.salaryDetails?.overtimePay,
                  employee.salaryDetails?.transportationCosts,
                  employee.salaryDetails?.familyAllowance,
                  employee.salaryDetails?.attendanceAllowance,
                  employee.salaryDetails?.leaveAllowance,
                  employee.salaryDetails?.specialAllowance,
                ].reduce((acc, allowance) => acc + (allowance || 0), 0)
              )}
              {renderEmployeeDetail(t("Overtime Pay"), employee.salaryDetails?.overtimePay)}
              {renderEmployeeDetail(t("Transportation Costs"), employee.salaryDetails?.transportationCosts)}
              {renderEmployeeDetail(t("Family Allowance"), employee.salaryDetails?.familyAllowance)}
              {renderEmployeeDetail(t("Attendance Allowance"), employee.salaryDetails?.attendanceAllowance)}
              {renderEmployeeDetail(t("Leave Allowance"), employee.salaryDetails?.leaveAllowance)}
              {renderEmployeeDetail(t("Special Allowance"), employee.salaryDetails?.specialAllowance)}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default EmployeeDetails;