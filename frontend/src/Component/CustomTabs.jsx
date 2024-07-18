import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import RegisterForm from "./RegisterForm";
import SubmitButton from "./SubmitButton";
import Button from "./Button";
import useFormStore from "../store/formStore";
import useEmployeeStore from '../store/employeeStore';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomSnackbar from "./CustomSnackbar";
import { validateForm,initializeFormData, handleFormChange as handleChangeUtil } from "../utils/formUtils";

function CustomTabs({ sections, mode = 'add', initialData = {} }) {
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
  const { saveData, updateData } = useEmployeeStore();

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
    const validationErrors = await validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (mode === 'edit') {
        console.log({ ...formData, id: initialData.id,bankDetails: [{ id: initialData.bankDetails.id }], salaryDetails: [{ id: initialData.salaryDetails.id }] })
        // await updateData({ ...formData, id: initialData.id });
        await updateData({ ...formData, id: initialData.id,bankDetails: [{ id: initialData.bankDetails.id }], salaryDetails: [{ id: initialData.salaryDetails.id }] });
        setSnackbarMessage(t("update_success"));
      } else {
        await saveData(formData);
        setSnackbarMessage(t("update_error"));
      }
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/employee"), 2000);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(t("add_error"));
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
          <SubmitButton variant="contained" color="primary" type="submit">
            {t(mode === 'edit' ? "Update" : "Submit")}
          </SubmitButton>
          <Button variant="outlined" color="primary" onClick={handleClear}>
            {t("Clear")}
          </Button>
        </Stack>
      </Box>
      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
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
          defaultValue: PropTypes.any,
        })
      ).isRequired,
    })
  ).isRequired,
  mode: PropTypes.oneOf(['add', 'edit']),
  initialData: PropTypes.object,
};

CustomTabs.defaultProps = {
  mode: 'add',
  initialData: {},
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default CustomTabs;