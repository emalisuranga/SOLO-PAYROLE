import React from "react";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import BackButton from "../../Component/BackButton";
import CustomTabs from "../../Component/CustomTabs";

const AddEmployee = () => {
  const handleSubmit = (formData) => {
    console.log(formData);
  };

  const sections = [
    {
      label: "Personal Info",
      fields: [
        {
          name: "firstName",
          type: "text",
          label: "First Name",
          required: true,
        },
        {
          name: "lastName",
          type: "text",
          label: "Last Name",
          required: true,
        },
        { name: "phone", type: "text", label: "Phone", required: true },
        { name: "address", type: "text", label: "Address", required: true },
        {
          name: "dateOfBirth",
          type: "date",
          label: "Date of Birth",
          required: true,
        },
        {
          name: "joinDate",
          type: "date",
          label: "Join Date",
          required: true,
        },
        {
          name: "department",
          type: "text",
          label: "Department",
          required: true,
        },
      ],
    },
    {
      label: "Bank Details",
      fields: [
        {
          name: "bankAccountNumber",
          type: "text",
          label: "Bank Account Number",
          required: true,
        },
        {
          name: "bankName",
          type: "text",
          label: "Bank Name",
          required: true,
        },
        {
          name: "branchCode",
          type: "text",
          label: "Branch Code",
          required: true,
        },
      ],
    },
    {
      label: "Salary Details",
      fields: [
        {
          name: "basicSalary",
          type: "text",
          label: "Basic Salary",
          required: true,
        },
        {
          name: "overtimePay",
          type: "text",
          label: "Overtime Pay",
          required: true,
        },
        {
          name: "transportationCosts",
          type: "text",
          label: "Transportation Costs",
          required: true,
        },
        {
          name: "familyAllowance",
          type: "text",
          label: "Family Allowance",
          required: true,
        },
        {
          name: "attendanceAllowance",
          type: "text",
          label: "Attendance Allowance",
          required: true,
        },
        {
          name: "leaveAllowance",
          type: "text",
          label: "Leave Allowance",
          required: true,
        },
        {
          name: "specialAllowance",
          type: "text",
          label: "Special Allowance",
          required: true,
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2, mt: 2 }}
      >
        <BackButton />
        <Typography variant="h5">Register Form</Typography>
      </Stack>
      <CustomTabs sections={sections} onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default AddEmployee;
