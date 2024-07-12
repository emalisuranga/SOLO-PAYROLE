import React from 'react';
import { Grid, Paper, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
const sampleEarnings = [
  { description: 'Basic Salary', amount: 5000 },
  { description: 'Overtime', amount: 1000 },
  { description: 'Bonus', amount: 1500 },
];

const sampleDeductions = [
  { description: 'Tax', amount: 800 },
  { description: 'Insurance', amount: 300 },
];
const sampleNetPay = sampleEarnings.reduce((total, earning) => total + earning.amount, 0) -
sampleDeductions.reduce((total, deduction) => total + deduction.amount, 0);

const Payslip = ({ employeeName, month, year, earnings, deductions, netPay }) => {
  // Sample data for earnings and deductions


  // Sample net pay calculation


  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={10}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Payslip for {month} {year}
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Employee: {employeeName}
          </Typography>

          {/* Earnings */}
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            Earnings
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {earnings.map((earning, index) => (
                  <TableRow key={index}>
                    <TableCell>{earning.description}</TableCell>
                    <TableCell align="right">{earning.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Deductions */}
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            Deductions
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deductions.map((deduction, index) => (
                  <TableRow key={index}>
                    <TableCell>{deduction.description}</TableCell>
                    <TableCell align="right">{deduction.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Net Pay */}
          <Typography variant="h6" align="right" sx={{ marginTop: 2 }}>
            Net Pay: {netPay}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

// Sample data for Payslip component
const sampleData = {
  employeeName: 'John Doe',
  month: 'July',
  year: 2024,
  earnings: sampleEarnings,
  deductions: sampleDeductions,
  netPay: sampleNetPay,
};

export default () => <Payslip {...sampleData} />;
