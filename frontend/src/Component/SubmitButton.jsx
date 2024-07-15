import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const SubmitButton = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SubmitButton;