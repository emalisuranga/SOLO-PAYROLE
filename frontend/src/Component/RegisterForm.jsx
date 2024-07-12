import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function RegisterForm({ fields, formData, onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid item xs={12} sm={6} key={field.name}>
          <TextField
            fullWidth
            variant="outlined"
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
          />
        </Grid>
      ))}
    </Grid>
  );
}

RegisterForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })
  ).isRequired,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RegisterForm;
