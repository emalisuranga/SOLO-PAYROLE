import React from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const getYears = (currentYear) => {
  const years = [];
  for (let year = currentYear - 5; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

const SalaryFilter = ({ month, year, onMonthChange, onYearChange, onSearch }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Month"
        variant="outlined"
        value={month}
        onChange={onMonthChange}
        select
        size="small"
        sx={{ width: 150 }}
      >
        {months.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Year"
        variant="outlined"
        value={year}
        onChange={onYearChange}
        select
        size="small"
        sx={{ width: 100 }}
      >
        {getYears(currentYear).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={onSearch}>
        Search
      </Button>
    </Box>
  );
};

SalaryFilter.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SalaryFilter;