import React from 'react';
import Button from '@mui/material/Button';

const SubmitButton = ({ children, ...props }) => {
  return (
    <Button {...props}>{children}</Button>
  );
};

export default SubmitButton;
