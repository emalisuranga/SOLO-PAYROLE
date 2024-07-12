import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CustomTabPanel from './CustomTabPanel';
import RegisterForm from './RegisterForm';
import SubmitButton from './SubmitButton';
import Button from './Button';
import useFormStore from '../store/formStore';
import { saveData } from '../api/api';
import { validateForm } from '../utils/validation';

function CustomTabs({ sections }) {
  const [value, setValue] = useState(0);
  const formData = useFormStore((state) => state.formData);
  const setFormData = useFormStore((state) => state.setFormData);
  const clearFormData = useFormStore((state) => state.clearFormData);
  const setErrors = useFormStore((state) => state.setErrors);
  const errors = useFormStore((state) => state.errors);

  // Initialize formData with empty strings and default values for optional fields
  useEffect(() => {
    const initialFormData = sections.reduce((acc, section) => {
      section.fields.forEach(field => {
        if (['overtimePay', 'transportationCosts', 'familyAllowance', 'attendanceAllowance', 'leaveAllowance', 'specialAllowance'].includes(field.name)) {
          acc[field.name] = '0';
        } else {
          acc[field.name] = '';
        }
      });
      return acc;
    }, {});
    setFormData(initialFormData);
  }, [sections, setFormData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFormChange = (newFormData) => {
    setFormData({ ...formData, ...newFormData });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Form submitted:', formData);

    try {
      await saveData(formData);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Failed to save data');
    }
  };

  const handleClear = () => {
    clearFormData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ width: '100%' }}>
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
        <Stack direction="row" spacing={2} sx={{ marginTop: 2, justifyContent: 'flex-end' }}>
          <SubmitButton variant="contained" color="primary" type="submit">
            Submit
          </SubmitButton>
          <Button variant="outlined" color="primary" onClick={handleClear}>
            Clear
          </Button>
        </Stack>
      </Box>
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
        })
      ).isRequired,
    })
  ).isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default CustomTabs;