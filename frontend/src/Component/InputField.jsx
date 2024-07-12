import React from 'react';
import TextField from '@mui/material/TextField';

const InputField = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default InputField;
