import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Stack, Snackbar, Alert } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import RegisterForm from "./RegisterForm";
import SubmitButton from "./SubmitButton";
import Button from "./Button";
import useFormStore from "../store/formStore";
import { saveData } from "../api/api";
import { validateForm } from "../utils/validation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CustomTabs({ sections }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formData, setFormData, clearFormData, setErrors, errors } =
    useFormStore((state) => ({
      formData: state.formData,
      setFormData: state.setFormData,
      clearFormData: state.clearFormData,
      setErrors: state.setErrors,
      errors: state.errors,
    }));

  const [value, setValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Initialize formData with empty strings and default values for optional fields
  useEffect(() => {
    const initialFormData = sections.reduce((acc, section) => {
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
    setFormData(initialFormData);
  }, [sections, setFormData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormChange = (e) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form submitted:", formData);

    try {
      await saveData(formData);
      setSnackbarSeverity("success");
      setSnackbarMessage("Data saved successfully!");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/employee"), 2000);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to save data");
      setSnackbarOpen(true);
      console.error("Failed to save data", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClear = () => {
    clearFormData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {sections.map((section, index) => (
            <Tab key={index} label={section.label} {...a11yProps(index)} />
          ))}
        </Tabs>
        {sections.map((section, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            <RegisterForm
              fields={section.fields}
              formData={formData}
              onChange={handleFormChange}
              errors={errors}
            />
          </CustomTabPanel>
        ))}
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginTop: 2, justifyContent: "flex-end" }}
        >
          <SubmitButton variant="contained" color="primary" type="submit">
            {t("Submit")}
          </SubmitButton>
          <Button variant="outlined" color="primary" onClick={handleClear}>
            {t("Clear")}
          </Button>
        </Stack>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}

CustomTabs.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          required: PropTypes.bool,
          defaultValue: PropTypes.any, // Add defaultValue to PropTypes
        })
      ).isRequired,
    })
  ).isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default CustomTabs;
