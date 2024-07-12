import React from 'react';
import { Button } from '@mui/material';

const SubmitButton = ({ variant, color, children, type }) => {
  return (
    <Button variant={variant} color={color} type={type}>
      {children}
    </Button>
  );
};

export default SubmitButton;
