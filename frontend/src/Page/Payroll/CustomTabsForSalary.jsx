import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Stack, Button,Tab,Tabs, Box } from "@mui/material";
import CustomTabPanel from "../../Component/CustomTabPanel";
import RegisterForm from "../../Component/RegisterForm";
import CustomSnackbar from "../../Component/CustomSnackbar";
import useFormStore from "../../store/formStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { validateForm,initializeFormData, handleFormChange as handleChangeUtil } from "../../utils/formUtils";

function CustomTabsForSalary({ sections, onSubmit, initialData }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formData, setFormData, clearFormData, setErrors, errors } = useFormStore((state) => ({
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

  useEffect(() => {
    const initialFormData = initializeFormData(sections, initialData);
    setFormData(initialFormData);
  }, [sections, initialData, setFormData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormChange = handleChangeUtil(formData, setFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
      setSnackbarSeverity("success");
      setSnackbarMessage(t("Data saved successfully!"));
      setSnackbarOpen(true);
      setTimeout(() => navigate("/salary-details"), 2000);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(t("Failed to save data"));
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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {sections.map((section, index) => (
            <Tab key={index} label={section.label} {...a11yProps(index)} />
          ))}
        </Tabs>
        {sections.map((section, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            <RegisterForm fields={section.fields} formData={formData} onChange={handleFormChange} errors={errors} />
          </CustomTabPanel>
        ))}
        <Stack direction="row" spacing={2} sx={{ marginTop: 2, justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" type="submit">
            {t("Submit")}
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClear}>
            {t("Clear")}
          </Button>
        </Stack>
      </Box>
      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
    </form>
  );
}

CustomTabsForSalary.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          required: PropTypes.bool,
          defaultValue: PropTypes.any,
        })
      ).isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

CustomTabsForSalary.defaultProps = {
  initialData: {},
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default CustomTabsForSalary;