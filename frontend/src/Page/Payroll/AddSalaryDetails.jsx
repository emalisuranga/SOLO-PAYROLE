import React, { useState } from "react";
import {
  Button,
} from "@mui/material";
import CustomTabs from "../../Component/CustomTabs";
import EmployeeHeader from "../../Page/Employee/EmployeeHeader";
import EmployeeSearch from "./EmployeeSearch";
import { useNavigate } from "react-router-dom";


const AddSalary = () => {
  const handleSubmit = (formData) => {
    console.log(formData);
  };

  const sections = [
    {
      label: "Employee Information",
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
      label: "Attendance and Work Details",
      fields: [
        {
          name: "scheduledWorkingDays",
          type: "text",
          label: "Scheduled Working days",
          required: true,
        },
        {
          name: "numberOfWorkingDays",
          type: "text",
          label: "Number of working days",
          required: true,
        },
        {
          name: "numberOfPaidHolidays",
          type: "text",
          label: "Number of paid holidays",
          required: true,
        },
        {
          name: "remainingPaidVacationDays",
          type: "text",
          label: "Remaining Paid vacation days",
          required: true,
        },
        {
          name: "overtime",
          type: "text",
          label: "Overtime",
          required: true,
        },
        {
          name: "timeLate",
          type: "text",
          label: "Time Late",
          required: true,
        },
        {
          name: "timeLeavingEarly",
          type: "text",
          label: "Time Leaving Early",
          required: true,
        },
      ],
    },
    {
      label: "Earnings",
      fields: [
        {
          name: "attendanceAllowance",
          type: "text",
          label: "Attendance Allowance",
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
    {
      label: "Deductions",
      fields: [
        {
          name: "healthInsurance",
          type: "text",
          label: "Health insurance",
          required: true,
        },
        {
          name: "employeePensionInsurance",
          type: "text",
          label: "Employee pension insurance",
          required: true,
        },
        {
          name: "employmentInsurance",
          type: "text",
          label: "Employment insurance",
          required: true,
        },
        {
          name: "longTermCareInsurance",
          type: "text",
          label: "Long-term care insurance",
          required: true,
        },
        {
          name: "socialInsurance",
          type: "text",
          label: "Social insurance",
          required: true,
        },
        {
          name: "incomeTax",
          type: "text",
          label: "Income tax",
          required: true,
        },
        {
          name: "residentTax",
          type: "text",
          label: "Resident tax",
          required: true,
        },
        {
          name: "advancePayment",
          type: "text",
          label: "Advance payment",
          required: true,
        },
        {
          name: "yearEndAdjustment",
          type: "text",
          label: "Year-end adjustment",
          required: true,
        },
      ],
    },
  ];

  const navigate = useNavigate();

  // const handleSearch = () => {
  //   const filteredData = initialData.filter(
  //     (item) =>
  //       (searchName === "" ||
  //         item.name.toLowerCase().includes(searchName.toLowerCase())) &&
  //       (searchId === "" || item.id.toString() === searchId.toString())
  //   );
  //   setTableData(filteredData);
  // };


  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearch = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <React.Fragment>
      {/* <Grid item xs={12}>
        <Box sx={{ display: "flex", gap: 2, mb: 2,justifyContent: "flex-end" }}>
          <TextField
            label="Name"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            size="small" 
          />
          <TextField
            label="ID"
            variant="outlined"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            select
            size="small" 
            sx={{ width: 100 }} // Adjust the width here
          >
            {initialData.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleSearch} sx={{ height: 40 }} >
            Search
          </Button>
        </Box>
      </Grid> */}
      <EmployeeHeader titleKey="addSalaryForm" />
      <EmployeeSearch onSearch={handleSearch} />
      <CustomTabs sections={sections} onSubmit={handleSubmit} />
      <Button
        variant="contained"
        onClick={() => {
          navigate("/payslip");
        }}
      >
        Payslip1
      </Button>
    </React.Fragment>
  );
};

export default AddSalary;
