import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const RegisterForm = ({ fields, formData, onChange, errors }) => {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid item xs={12} sm={6} key={field.name}>
          <TextField
            key={field.name}
            type={field.type}
            label={field.label}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            required={field.required}
            fullWidth
          />
        </Grid>
      ))}
    </Grid>
  );
};

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
