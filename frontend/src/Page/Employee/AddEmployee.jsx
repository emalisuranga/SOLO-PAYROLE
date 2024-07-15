import React from "react";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import BackButton from "../../Component/BackButton";
import CustomTabs from "../../Component/CustomTabs";
import { useTranslation } from 'react-i18next';

const AddEmployee = () => {
  const { t } = useTranslation();
  const handleSubmit = (formData) => {
    console.log(formData);
  };

  const sections = [
    {
      label: t("Personal Info"),
      fields: [
        {
          name: "firstName",
          type: "text",
          label: t("First Name"),
          required: true,
        },
        {
          name: "lastName",
          type: "text",
          label: t("Last Name"),
          required: true,
        },
        { name: "phone", type: "text", label: t("Phone"), required: true },
        { name: "address", type: "text", label: t("Address"), required: true },
        {
          name: "dateOfBirth",
          type: "date",
          label: t("Date of Birth"),
          required: true,
        },
        {
          name: "joinDate",
          type: "date",
          label: t("Join Date"),
          required: true,
        },
        {
          name: "department",
          type: "text",
          label: t("Department"),
          required: true,
        },
      ],
    },
    {
      label: t("Bank Details"),
      fields: [
        {
          name: "bankAccountNumber",
          type: "text",
          label: t("Bank Account Number"),
          required: true,
        },
        {
          name: "bankName",
          type: "text",
          label: t("Bank Name"),
          required: true,
        },
        {
          name: "branchCode",
          type: "text",
          label: t("Branch Code"),
          required: true,
        },
      ],
    },
    {
      label: t("Salary Details"),
      fields: [
        {
          name: "basicSalary",
          type: "text",
          label: t("Basic Salary"),
          required: true,
        },
        {
          name: "overtimePay",
          type: "text",
          label: t("Overtime Pay"),
          required: true,
        },
        {
          name: "transportationCosts",
          type: "text",
          label: t("Transportation Costs"),
          required: true,
        },
        {
          name: "familyAllowance",
          type: "text",
          label: t("Family Allowance"),
          required: true,
        },
        {
          name: "attendanceAllowance",
          type: "text",
          label: t("Attendance Allowance"),
          required: true,
        },
        {
          name: "leaveAllowance",
          type: "text",
          label: t("Leave Allowance"),
          required: true,
        },
        {
          name: "specialAllowance",
          type: "text",
          label: t("Special Allowance"),
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
        <Typography variant="h5">登録フォーム</Typography>
      </Stack>
      <CustomTabs sections={sections} onSubmit={handleSubmit} />
    </React.Fragment>
  );
};

export default AddEmployee;
